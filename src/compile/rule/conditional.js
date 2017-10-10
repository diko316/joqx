'use strict';

export 
    function rule_Conditional(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Conditional": // relay
            context.updateIterator(value[0]);
            break;
        }
    }