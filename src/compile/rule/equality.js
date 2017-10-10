'use strict';

export 
    function rule_Equality(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Equality": // relay
            context.updateIterator(value[0]);
            break;
        }
    }