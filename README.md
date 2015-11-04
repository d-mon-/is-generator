#IS-GENERATOR-ES6
##Test if your value is a ES6:Generator or ES6:GeneratorFunction
 - It doesn't use fn.name
 - It handles values from another frame
 - It only checks **[ES6]** generators & **[ES6]** generator functions
 
### `{value}` is GeneratorFunction 
The function tests if your `{value}` is an instance of the constructor from **function* (){}**.

If the code is executed inside a navigator and **instanceof** failed, the function will check if the argument begins with `function*` (verification of value from another frame). 

Furthermore, the module doesn't throw a SyntaxError when loaded in older browsers thanks to `new Function()`

```js
var isGeneratorFunction = require('is-generator-es6').isGeneratorFunction;
isGeneratorFunction(function* (){}) //returns true
```
### `{value}` is Generator
Use **Object.prototype.toString** to ensure that `{value}` is a ES6:Generator after checking the presence of `next`and `throw`.
```js
var isGenerator = require('is-generator-es6'); 
isGenerator((function* (){})()) //returns true
```

### `{value}` is Generator n°2
Checks if the `value.__proto__.__proto__` is equal to `(function*(){}).prototype.__proto__` after checking the presence of `next` and `throw`.

If the code is executed inside a browser, it will call **Object.prototype.toString** if the first condition failed.

```js
var isGenerator = require('is-generator-es6')._isGenerator; 
isGenerator((function* (){})()) //returns true
```


