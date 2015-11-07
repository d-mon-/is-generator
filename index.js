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
    //initialize generatorFunctionConstructor
    //Never use eval -> decrease perf.
    var generatorFunction = new Function("return (function* (){})")();
    generatorFunctionConstructor = generatorFunction.constructor;

    if (typeof generatorFunctionConstructor === "function") {

        //initialize generatorFunctionPrototype
        if (typeof generatorFunction.prototype === "object" && typeof generatorFunction.prototype.__proto__ === "object") {
            generatorFunctionPrototype = generatorFunction.prototype.__proto__;
            if (generatorFunctionPrototype.hasOwnProperty("next") === false || generatorFunctionPrototype.hasOwnProperty("throw") === false) {
                generatorFunctionPrototype = null;
            }
        }
    } else {
        generatorFunctionConstructor = noop;
        generatorFunctionPrototype = null;
    }


} catch (err) {
    generatorFunctionConstructor = noop;
    generatorFunctionPrototype = null;
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

        //handle values from another frame: checks the presence of next & throw, then checks if the function start with "function*"
        if (typeof value === "function" && typeof value.prototype === "object" && "next" in value.prototype && "throw" in value.prototype) {
            return /^function\*/.test(functionToString.call(value));
        }
    }
    return false;
}

/**
 * Test if the value is a ES6:Generator after checking the presence of next and throw by callinsg object.prototype.toString
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

    //Shortcut if the prototype of function* couldn't be found
    if (generatorFunctionPrototype === null) {
        return isGenerator(value);
    }

    //Checks the presence of "throw" and "next" in the object
    if (typeof value === "object" && "throw" in value && "next" in value) {

        //retrieve the second prototype in the chain and compare it
        if (typeof value.__proto__ === "object" && value.__proto__.__proto__ === generatorFunctionPrototype) {
            return true
        }

        if (isBrowser === true) {
            return objectToString.call(value) === "[object Generator]";
        }
    }
    return false;
}

module.exports = isGenerator;
module.exports._isGenerator = _isGenerator;
module.exports.isGeneratorFunction = isGeneratorFunction;