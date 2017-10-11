'use strict';


import {
            string,
            method,
            createRegistry
        } from "libcore";

import Symbol from "./base.js";

var INVALID_TYPE = "Invalid [type] parameter.",
    INVALID_CLASS = "Invalid Symbol [Class] parameter.",
    INVALID_NON_EXISTENT_TYPE = "Symbol do not exist from [type] parameter",
    REGISTRY = createRegistry();

function instantiate(type, compiler) {
    var registry = REGISTRY;
    var Class;

    if (!string(type)) {
        throw new Error(INVALID_TYPE);
    }

    Class = registry.get(type);

    if (!Class) {
        throw new Error(INVALID_NON_EXISTENT_TYPE);
    }

    return new Class(compiler);
    
}

function register(type, Class) {
    var Base = Symbol;

    if (!string(type)) {
        throw new Error(INVALID_TYPE);
    }

    if (!method(Class) ||
        !(Class === Base || (Class.prototype instanceof Base))) {
        throw new Error(INVALID_CLASS);
    }
    
    REGISTRY.set(Class.prototype.type = type,
                Class);
}

export {
    Symbol as Base,
    instantiate,
    register
};