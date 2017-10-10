'use strict';

export 
    function rule_Transform(context, lexeme, rule) {
        var value = lexeme.value;
        var symbol, ident, transformer;

        switch (rule) {
        case "1:Transform": // relay
            context.updateIterator(value[0]);
            break;

        case "2:Transform":
            ident = value[0];
            transformer = value[2];

            symbol = context.createSymbol([
                transformer, ' && ',
                    transformer, '(', ident, ')'

            ].join(''));

            context.updateIterator(symbol);
            break;
        }
    }