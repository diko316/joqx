'use strict';

import { string } from "libcore";

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import { Helper } from "./context/helper.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

function compile(subject) {
    var F = compile.constructor,
        compileTerminal = handleTerminal,
        compileRule = handleRule;

    var lexeme, compiled, generated, compiler;

    function exec(contextObject) {
        try {
            return compiled(new Helper(), contextObject);
        }
        catch (e) {
            console.warn(e);
        }
        return undefined;
    }

    if (!string(subject)) {
        throw new Error("Invalid String [subject] parameter.");
    }

    compiler = new Compile(iterator);

    iterator.set(subject);
    lexeme = iterator.next();

    for (; lexeme; lexeme = iterator.next()) {
        
        // for terminal
        (lexeme.terminal ?
            compileTerminal :
            compileRule)(compiler, lexeme);
    }

    if (!iterator.error && iterator.completed) {

        generated = compiler.generate();

        console.log(generated);

        compiled = new F('helper, context', generated);

        return exec;
    
    }

    return null;

    

}

export default compile;
