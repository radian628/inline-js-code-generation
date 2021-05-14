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