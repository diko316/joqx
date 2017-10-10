'use strict';

import { iterator } from "./parser/index.js";

import { Compile } from "./compile/class.js";

import * as compileHelper from "./compile/index.js";

console.log('helper ', compileHelper);

const
    TERMINAL_HANDLER = 'terminal',
    PREFIX_RULE = 'rule_';

function compile(subject) {
    var context = new Compile(iterator),
        terminalHandler = TERMINAL_HANDLER,
        prefixRule = PREFIX_RULE,
        helper = compileHelper;

    var lexeme, handler;

    iterator.set(subject);
    lexeme = iterator.next();

    for (; lexeme; lexeme = iterator.next()) {

        handler = lexeme.terminal ?
                        terminalHandler :
                        prefixRule + lexeme.name;
        // for test
        var value = lexeme.value;
        
        if (handler in helper) {
            helper[handler](context, lexeme, lexeme.rule);

        }
        
        console.log(lexeme.name, lexeme.rule, lexeme.value, " from ", value);

        

        
    }

    console.log(context.generate());



}

export default compile;
