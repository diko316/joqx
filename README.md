# JOQx

Extensible Javascript Object Query (joqx) Language

## Introduction

This library was built in order to do complex query on Javascript Objects.
The following are the features JOQx language:

1. One liner simple Javascript expression to query a Javascript Object. Multi-line and semi-colon is not supported for simplicity.
1. Supports custom data transforms by registering transformers and using `then`, `->`, or `|>` operators.
1. Supports intent in order to post process and finalize the result data.
1. The code is compiled to ES5 and optimized for speed. This was made possible using [libcore-parser-lalr](https://www.npmjs.com/package/libcore-parser-lalr).

## Installation

This library is published in NPM with the package name "joqx"

```sh
npm install joqx --save
```

## Usage

The library is compatible with ES module, and CommonJS that can be built into RollupJS, Webpack, and Browserify.

The code below demonstrates how arithmetic addition is compiled
and executed.

```javascript
import { compile } from "joqx";

var context = {
        operand1: 1,
        operand2: 2
    },
    sum = compile('sum = operand1 + operand2');

// compiled JOQx always returns a promise
sum(context).
    then((result) => {

        // result should be 3
        console.log("sum is: ", result);

        // "sum" property also contains 3
        console.log("assigned to sum: ", context.sum);
    });


```

## License

This Project is fully Open Source [MIT](https://opensource.org/licenses/MIT) licensed.
