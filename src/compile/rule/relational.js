'use strict';

export 
    function rule_Relational(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Relational": // relay
            context.updateIterator(value[0]);
            break;
        }
    }