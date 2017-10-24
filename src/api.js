'use strict';

// test
import { register as regIntent } from "./intent/registry.js";

import { register as regTransformer } from "./transformer/registry.js";

import compile from "./compile.js";


const API = {
            registerIntent: registerIntent,
            registerTransformer: registerTransformer,
            compile: compile
        };

export default API;

export {
            compile
        };

export
    function registerIntent(name, intent) {
        regIntent(name, intent);
        return regIntent;
    }

export
    function registerTransformer(name, transformer) {
        regTransformer(name, transformer);
        return regTransformer;
    }


