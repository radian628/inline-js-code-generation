# macro-js
 Use JavaScript to generate code from comments that would be annoying to type by hand (e.g. lookup tables).


## Usage
 Macrojs finds comments in your code which are identified as being composed of JavaScript. It then treats each comment as a function body, runs it, and pastes the result immediately after the comment.

 Here is an example in C++:

 Before:
 ```cpp
#include <iostream>

int main() {
    /*js
        return new Array(10).fill(0).map((e, i) => {
            return `std::cout << "loop iter: ${i}" << std::endl;`;
        }).join("\n");
    */

    std::cout << "Hello, world!" << std::endl;
}
 ```

 After:
 ```cpp
 #include <iostream>

int main() {
    /*js
        return new Array(10).fill(0).map((e, i) => {
            return `std::cout << "loop iter: ${i}" << std::endl;`;
        }).join("\n");
    */
    //JS_OUT
    std::cout << "loop iter: 0" << std::endl;
    std::cout << "loop iter: 1" << std::endl;
    std::cout << "loop iter: 2" << std::endl;
    std::cout << "loop iter: 3" << std::endl;
    std::cout << "loop iter: 4" << std::endl;
    std::cout << "loop iter: 5" << std::endl;
    std::cout << "loop iter: 6" << std::endl;
    std::cout << "loop iter: 7" << std::endl;
    std::cout << "loop iter: 8" << std::endl;
    std::cout << "loop iter: 9" << std::endl;
    //END_JS_OUT

    std::cout << "Hello, world!" << std::endl;
}
 ```

 In C++, JavaScript comments are identified with `js` immediately following the opening tag of the block comment (this can be configured in config.json)

 To run macrojs, use the following command:
 `macrojs FILENAME`
 

## Installation

### Dependencies (all platforms)
 - [Node.js](https://nodejs.org/en/)

### Windows
 Put the `src` folder in your PATH.
 
### Linux
 Not *technically* supported (yet), though setting up Linux support should be trivial- all one would need to do is create a bash file that runs generate.js with the first argument being a file name, and then put that in your PATH.