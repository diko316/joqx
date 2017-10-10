'use strict';

import { method } from "libcore";

function Context() {

}

Context.prototype = {

    constructor: Context,

    methodOf(name) {
        return name in this && method(this[name]);
    },

    transform_default(value) {
        return value;
    }
    
};

export { Context };

export default Context;