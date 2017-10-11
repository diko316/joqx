'use strict';


import { register } from "./symbol/registry.js";

import Base from "./symbol/base.js";


import Mixed from "./symbol/mixed.js";
import NullSymbol from "./symbol/null.js";
import UndefinedSymbol from "./symbol/undefined.js";

import StringSymbol from "./symbol/string.js";
import NumberSymbol from "./symbol/number.js";
import BooleanSymbol from "./symbol/boolean.js";
import ArraySymbol from "./symbol/boolean.js";

import ObjectSymbol from "./symbol/object.js";
import Reference from "./symbol/reference.js";
import Arguments from "./symbol/arguments.js";



register("default", Base);
register("mixed", Mixed);

register("null", NullSymbol);
register("undefined", UndefinedSymbol);

register("string", StringSymbol);
register("number", NumberSymbol);
register("boolean", BooleanSymbol);

register("array", ArraySymbol);
register("object", ObjectSymbol);

register("arguments", Arguments);
register("reference", Reference);




export {
    register
};

export * from "./symbol/registry.js";
