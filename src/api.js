'use strict';

import { Intent } from "./intent/registry.js";

import { Transformer } from "./transformer/registry.js";

import { Compiler } from "./compiler.js";

const   DEFAULT_COMPILER = new Compiler(),

        API = {
            Intent: Intent,
            Transformer: Transformer,
            
            createCompiler: createCompiler,
            createTransformer: createTransformer,
            createIntent: createIntent,

            intent: intent,
            transformer: transformer,
            compile: compile
        };

export default API;

export {
            Intent,
            Transformer
    };

export
    function createIntent() {
        return new Transformer();
    }

export
    function createTransformer() {
        return new Transformer();
    }

export
    function createCompiler(intent, transformer) {
        return new Compiler(intent, transformer);
    }

export
    function compile(subject) {
        return DEFAULT_COMPILER.compile(subject);
    }

export
    function intent(name, intentMethod) {
        DEFAULT_COMPILER.intent(name, intentMethod);
        return API;
    }

export
    function transformer(name, transformerMethod) {
        DEFAULT_COMPILER.transformer(name, transformerMethod);
        return API;
    }


