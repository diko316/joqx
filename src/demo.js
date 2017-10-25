'use strict';

import { compile, intent, transformer } from "./index.js";

var context = {
        "buang": {
            "yes": 2
        },
        "test": "yes"
    };

var compiled;







intent('plus1', function (helper, value) {
        return value + 1;
    }).
    transformer('minus2', function (helper, value) {
        return value - 2;
    });

//compiled = compile('res = buang.no ? 2 : test ? 1 : 2');

compiled = compile('?plus1 buang.yes |> minus2');



console.log("result: ", compiled(context), " context ", JSON.stringify(context));


//compile('1 * 3 -> test.name(filterValue)');

//compile('[1, 2, 3] |> sort -> update({a: 1}) -> buang(k)');

//compile('?buang void(true) |> test');




