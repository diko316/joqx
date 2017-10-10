'use strict';

export 
    function rule_Multiplicative(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Multiplicative": // relay
            context.updateIterator(value[0]);
            break;
        }
    }