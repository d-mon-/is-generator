/********************************************
 * Created by GUERIN Olivier, on 02/11/2015.*
 * Twitter: @MisterRaton                    *
 ********************************************/
var isGenerator, generatorConstructor;
try {
    //if GeneratorFunction is implemented globally
    if (typeof GeneratorFunction === 'function') {
        generatorConstructor = GeneratorFunction;
    } else {
        //Don't use eval.
        generatorConstructor = new Function("return (function* (){}).constructor")();
    }

    isGenerator = function isGenerator(value) {
        return value instanceof generatorConstructor;
    }
} catch (err) {
    isGenerator = function isGenerator() {
        return false;
    }
}

module.exports = isGenerator;