'use strict';

export 
    function rule_Assignment(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Assignment": // relay
            context.updateIterator(value[0]);
            break;
        }
    }