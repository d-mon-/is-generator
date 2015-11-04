/********************************************
 * Created by GUERIN Olivier, on 02/11/2015.*
 * Twitter: @MisterRaton                    *
 ********************************************/

var isBrowser = typeof window === "object",
    functionToString = Function.prototype.toString,
    objectToString = Object.prototype.toString,
    generatorFunctionConstructor,
    generatorFunctionPrototype;

try {
    //If GeneratorFunction is already implemented globally
    if (typeof GeneratorFunction === "function") {
        generatorFunctionConstructor = GeneratorFunction;
    } else {

        //Never use eval impact perf.
        var generatorFunction = new Function("return (function* (){})")();
        generatorFunctionConstructor = generatorFunction.constructor;
        if(typeof generatorFunctionConstructor !== "function"){
            generatorFunctionConstructor = noop;
        }
        if(typeof generatorFunction.prototype === "object" && typeof generatorFunction.prototype.__proto__ === "object"){
            generatorFunctionPrototype = generatorFunction.prototype.__proto__;
            if("next" in generatorFunctionPrototype === false || "throw" in generatorFunctionPrototype === false){
                generatorFunctionPrototype = noop;
            }
        }else{
            generatorFunctionPrototype = noop;
        }
    }
} catch (err) {
    generatorFunctionConstructor = noop;
}


function noop() {
}

/**
 * Test if the value is an instanceof ES6:GeneratorFunction or start with function*
 * @param {*} value
 * @returns {boolean} Returns if value is a GeneratorFunction
 */
function isGeneratorFunction(value) {
    if (value instanceof generatorFunctionConstructor) {
        return true;
    } else if (isBrowser === true) {
        //handle values from another frame
        if (typeof value === "function" && typeof value.prototype === "object" && "next" in value.prototype && "throw" in value.prototype) {
            return /^function\*/.test(functionToString.call(value));
        }
    }
    return false;
}

/**
 * Test if the value is a ES6:Generator after checking the presence of next and throw by calling object.prototype.toString
 * @param {*} value
 * @returns {boolean} Returns if value is a Generator
 */
function isGenerator(value) {
    if (typeof value === "object" && "throw" in value && "next" in value) {
        return objectToString.call(value) === "[object Generator]";
    }
    return false;
}
/**
 * Tests if the value is a ES6:Generator by comparing the prototype of the argument with the prototype of GeneratorFunction
 * If the test failed inside a navigator, the code will execute `Object.prototype.toString`
 * @param {*} value
 * @returns {boolean} Returns if value is a Generator
 */
function _isGenerator(value) {
    if (typeof value === "object" && "throw" in value && "next" in value) {
        if(typeof value.__proto__ === "object" && value.__proto__.__proto__ === generatorFunctionPrototype){
            return true
        }
        if(isBrowser === true){
            return objectToString.call(value) === "[object Generator]";
        }
    }
    return false;
}

module.exports =  isGenerator;
module.exports._isGenerator = _isGenerator;
module.exports.isGeneratorFunction = isGeneratorFunction;