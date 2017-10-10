'use strict';

export 
    function rule_LogicalAnd(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:LogicalAnd": // relay
            context.updateIterator(value[0]);
            break;
        }
    }