'use strict';

import { string } from "libcore";

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import { Helper } from "./context/helper.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

const   executor = handleTerminal.constructor;

function Compiler(intent, transformer) {
    this.helper = new Helper(intent, transformer);
}

Compiler.prototype = {

    intent: function (name, intent) {
        this.helper.intentRegistry.register(name, intent);

        return this;
    },

    transformer: function (name, transformer) {

        this.helper.transformerRegistry.register(name, transformer);

        return this;

    },

    build: function (subject) {
        var compileTerminal = handleTerminal,
            compileRule = handleRule,
            walk = iterator;

        var lexeme, generated, compiler;

        if (!string(subject)) {
            throw new Error("Invalid String [subject] parameter.");
        }

        compiler = new Compile(walk);
        
        walk.reset();
        walk.set(subject);

        walk.completed = false;

        lexeme = walk.next();

        for (; lexeme; lexeme = walk.next()) {
            
            // for terminal
            (lexeme.terminal ?
                compileTerminal :
                compileRule)(compiler, lexeme);
        }

        if (!walk.error && walk.completed) {

            generated = compiler.generate();

            return generated;
        
        }

        return null;
    },

    compile: function (subject) {
        var F = executor,
            me = this,
            generated = this.build(subject),
            compiled = null;
    
        function exec(contextObject, rawResult) {
            try {
                return compiled(me.helper, contextObject, rawResult);
            }
            catch (e) {
                console.warn(e);
            }
            
            return undefined;
        }
    
        if (!generated) {
            throw new Error("Unable to compile due to JIT errors.");
        }

        compiled = new F('helper, context, rawResult', generated);

        return exec;
    
    }

};

export { Compiler };

