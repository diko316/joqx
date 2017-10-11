'use strict';

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import handleTerminal from "./compile/terminal.js";

import handleRule from "./compile/rule.js";

function compile(subject) {
    var context = new Compile(iterator),
        compileTerminal = handleTerminal,
        compileRule = handleRule;

    var lexeme;

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
        
        console.log(lexeme.name, lexeme.rule, lexeme.value, " <- ", value);
        
    }

    console.log(context.generate());



}

export default compile;
