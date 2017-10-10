'use strict';

export 
    function rule_PostFix(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:PostFix": // relay
            context.updateIterator(value[0]);
            break;
        }
    }