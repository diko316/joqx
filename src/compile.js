'use strict';

import { string } from "libcore";

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import { Helper } from "./context/helper.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

const helper = new Helper();

function compile(subject) {
    var F = compile.constructor,
        compileTerminal = handleTerminal,
        compileRule = handleRule,
        compiled = null,
        walk = iterator;

    var lexeme, generated, compiler;

    function exec(contextObject) {
        try {
            return compiled(helper, contextObject);
        }
        catch (e) {
            console.warn(e);
        }
        
        return undefined;
    }

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

        //console.log("source: ", subject, "\n compiled: \n", generated);

        compiled = new F('helper, context', generated);

        return exec;
    
    }

    return null;

    

}

export default compile;
