'use strict';

export 
    function rule_Namespace(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Namespace": // relay
            context.updateIterator(value[0]);
            break;
        }
    }