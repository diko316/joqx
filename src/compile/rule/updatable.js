'use strict';

export 
    function rule_Updatable(context, lexeme, rule) {
        var value = lexeme.value,
            contextSymbol = context.contextSymbol;
        var symbol;

        switch (rule) {
        case "1:Updatable": // relay
            symbol = value[0];
            context.updateIterator(contextSymbol + '.' + symbol);

            break;

        case "2:Updatable":
            symbol = context.createSymbol(value[0]);
            context.updateIterator(
                symbol + '.' + value[2]
            );
        }
    }