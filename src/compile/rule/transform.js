'use strict';

export 
    function rule_Transform(context, lexeme, rule) {
        var value = lexeme.value;

        switch (rule) {
        case "1:Transform": // relay
            context.updateIterator(value[0]);
            break;
        }
    }