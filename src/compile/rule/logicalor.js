'use strict';

export 
    function rule_LogicalOr(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:LogicalOr": // relay
            context.updateIterator(value[0]);
            break;
        }
    }