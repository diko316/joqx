'use strict';

import { jsonParsePath } from "libcore";

export
    function fillObject(context, variable) {
        var code = [],
            lines = 0,
            pieces = jsonParsePath(variable),
            c = -1;
        var item, l, first, last;

        first = pieces.splice(0, 1)[0];
        l = pieces.length;

        for (; l--;) {
            
        }
        
    }