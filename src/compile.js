'use strict';

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import { Context } from "./context/helper.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

function compile(subject) {
    var F = compile.constructor,
        context = new Compile(iterator),
        compileTerminal = handleTerminal,
        compileRule = handleRule;

     var lexeme, compiled, generated;

    function exec(contextObject) {
        return compiled(new Context(), contextObject);
    }

    var value;

    iterator.set(subject);
    lexeme = iterator.next();
    //console.log('first! ', lexeme);

    for (; lexeme; lexeme = iterator.next()) {

        // test
        value = lexeme.value;
        
        // for terminal
        (lexeme.terminal ?
            compileTerminal :
            compileRule)(context, lexeme);
        
        //console.log(lexeme.name, lexeme.rule, lexeme.value);//, " <- ", value);
        
    }

    if (!iterator.error && iterator.completed) {

        generated = context.generate();

        console.log(generated);

        //compiled = new F('helper, context', generated);

        return exec;

    
    
    }

    return null;

    

}

export default compile;
