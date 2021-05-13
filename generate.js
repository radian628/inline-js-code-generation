const fs = require("fs").promises;
const process = require("process");
const path = require("path");

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

function recursiveObjMap(obj, shouldModifyCallback, modifyCallback) {
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        if (typeof value == "object") {
            recursiveObjMap(value, shouldModifyCallback, modifyCallback);
        }
        if (shouldModifyCallback(key, value, obj)) {
            obj[key] = modifyCallback(key, value, obj);
        }
    });
}

function constructJSRegExp(options) {
    return new RegExp(`(${options.jsStart})[^]*?(${options.jsEnd})`, "g");
}

function constructOutRegExp(options) {
    return new RegExp(`(${options.outStart})[^]*?(${options.outEnd})`,"g");
}

function constructIndentRegExp(options) {
    return new RegExp(`[ \t]+(?=${options.jsEnd})`, "g");
}

function evalButNotCompletelyStupid(str) {
    return new Function(str)();
}

const extensions = {
    ".cpp": {
        jsStart: "/*js",
        jsEnd: "*/",
        outStart: "//JS_OUT",
        outEnd: "//END_JS_OUT"
    }
};

const regexpSafeExtensions = JSON.parse(JSON.stringify(extensions));

recursiveObjMap(regexpSafeExtensions, (k, v) => typeof v == "string", (k, v) => escapeRegExp(v));

async function parseFile(filePath) {
    let fileData = await fs.readFile(filePath);
    let fileExt = path.extname(filePath);
    let fileTypeConfigOptions = regexpSafeExtensions[fileExt];

    let originalConfigOptions = extensions[fileExt];

    let js = constructJSRegExp(fileTypeConfigOptions);
    let out = constructOutRegExp(fileTypeConfigOptions);

    let fileDataWithoutOutput = fileData.toString().replace(out, "");

    let outputFileData = fileDataWithoutOutput.replace(js, (match) => {
        let javascriptOnlyPortion = match.slice(originalConfigOptions.jsStart.length, -originalConfigOptions.jsEnd.length);
        let ws = "\n" + match.match(constructIndentRegExp(fileTypeConfigOptions))[0];
        return match + ws + originalConfigOptions.outStart + ws + evalButNotCompletelyStupid(javascriptOnlyPortion).replace(/\n/g, ws) + ws + originalConfigOptions.outEnd;
    });


    await fs.writeFile(filePath, outputFileData);    
}

parseFile(process.argv[2]);