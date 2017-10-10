'use strict';

export 
    function rule_Unary(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Unary": // relay
            context.updateIterator(value[0]);
            break;
        }
    }