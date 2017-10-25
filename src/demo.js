'use strict';

import { compile, intent } from "./index.js";

var context = {
        "buang": {
            "yes++": 2,
            "yes": 2
        },
        "test": "yes"
    },
    testContext = {
        buang: 3,
        inner: {
            deepInner: 'diko'
        }
    };

var compiled;



// intent('plus1', function (value) {
//         return value + 1;
//     }).
//     transformer('minus2', function (value) {
//         return value - 2;
//     });

//compiled = compile('res = buang.no ? 2 : test ? 1 : 2');

//compiled = compile('?plus1 buang.yes |> minus2');

//compiled = compile('++@buang[yes++]');

//compiled = compile('this.buang.yes');

// compiled = compile('this.buang');

// console.log(compiled(testContext));


compiled = compile('this = 2');

console.log(compiled(testContext));

//console.log("result: ", compiled(context), " context ", JSON.stringify(context));


//compile('1 * 3 -> test.name(filterValue)');

//compile('[1, 2, 3] |> sort -> update({a: 1}) -> buang(k)');

//compile('?buang void(true) |> test');




