'use strict';

// test
import { register as regIntent } from "./intent/registry.js";

import { register as regTransformer } from "./transformer/registry.js";

import compile from "./compile.js";


const API = {
            registerIntent: intent,
            registerTransformer: transformer,
            compile: compile
        };

export default API;

export {
            compile
        };

export
    function intent(name, intentMethod) {
        regIntent(name, intentMethod);
        return API;
    }

export
    function transformer(name, transformerMethod) {
        regTransformer(name, transformerMethod);
        return API;
    }


