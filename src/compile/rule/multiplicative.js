'use strict';

export 
    function rule_Exponential(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Exponential": // relay
            context.updateIterator(value[0]);
            break;
        }
    }