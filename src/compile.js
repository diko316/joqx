'use strict';

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import { Helper } from "./context/helper.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

function compile(subject) {
    var F = compile.constructor,
        context = new Compile(iterator),
        compileTerminal = handleTerminal,
        compileRule = handleRule;

     var lexeme, compiled, generated;

    function exec(contextObject) {
        try {
            return compiled(new Helper(), contextObject);
        }
        catch (e) {
            console.warn(e);
        }
        return undefined;
    }

    var value;

    iterator.set(subject);
    lexeme = iterator.next();

    for (; lexeme; lexeme = iterator.next()) {

        // test
        value = lexeme.value;
        
        // for terminal
        (lexeme.terminal ?
            compileTerminal :
            compileRule)(context, lexeme);
    }

    if (!iterator.error && iterator.completed) {

        generated = context.generate();

        //console.log(generated);

        compiled = new F('helper, context', generated);

        return exec;
    
    }

    return null;

    

}

export default compile;
