'use strict';

export 
    function rule_Additive(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Additive": // relay
            context.updateIterator(value[0]);
            break;
        }
    }