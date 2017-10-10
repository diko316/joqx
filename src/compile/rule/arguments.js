'use strict';

export 
    function rule_Arguments(context, lexeme, rule) {
        var value = lexeme.value;
        

        switch (rule) {
        case "1:Arguments": // relay
            context.updateIterator(null);
            break;

        case "2:Arguments": // relay
            context.updateIterator(value[1]);
            break;
        }
    }