#IS-GENERATOR
##Test if your value is a ES6:Generator

It Will not throw a syntax error when the file is loaded in older browsers/servers. Instead, the function will **always** return false. 

```js
var isGenerator = require('is-generator');
isGenerator(function* (){}) //returns true
```