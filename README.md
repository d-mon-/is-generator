#IS-GENERATOR-ES6

##Test if your value is a ES6:Generator or ES6:GeneratorFunction

 - It doesn't use fn.name
 
 - It handles values from [another frame (browsers)](http://stackoverflow.com/questions/22289727/difference-between-using-array-isarray-and-instanceof-array)
 
 - It only checks **[ES6]** generators & **[ES6]** generator functions
 
### `{value}` is GeneratorFunction 

The function tests if your `{value}` is an instance of **function* (){}** constructor.

If the code is executed inside a navigator and **instanceof** failed, the function will check if the argument begins with `function*` to deal with value from another frame. 

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

Checks if `value.__proto__.__proto__` is equal to `(function*(){}).prototype.__proto__` after checking the presence of `next` and `throw`.

If the code is executed inside a browser, it will call **Object.prototype.toString** if the first condition failed.

This solution has better performances than the previous one, however it doesn't offer the same accuracy and it doesn't deal with prototype chaining.


```js
var isGenerator = require('is-generator-es6')._isGenerator; 
isGenerator((function* (){})()) //returns true
```

To deal with prototype chaining, one solution would be to implement a loop that goes deeper at each iteration until it hits a `__proto__` that match `(function*(){}).prototype.__proto__`.
