'use strict';

export 
    function rule_Updatable(context, lexeme, rule) {
        var value = lexeme.value;
        var symbol;

        switch (rule) {
        case "1:Updatable": // relay
            context.updateIterator(value[0]);
            break;

        case "2:Updatable":
            symbol = context.createSymbol(value[0]);
            context.updateIterator(
                symbol + '.' + value[2]
            );
        }
    }