'use strict';

export 
    function rule_Transformer(context, lexeme, rule) {
        var value = lexeme.value,
            contextSymbol = context.contextSymbol,
            args = '';
        var symbol, access;

        switch (rule) {
        case "2:Transformer": // relay
            args = value[1].join(',');
        
        /* falls through */
        case "1:Transformer": // relay
            access = 'transform_' + value[0];
            symbol = context.createSymbol([
                contextSymbol, '.methodOf(', access, ') ? ',
                    'function (last) {',
                        'return ', contextSymbol,
                            '["', access, '"](', contextSymbol,
                                                ',last, ',
                                                 args, ');',
                    '} : ',
                    'undefined'
            ].join(''));
            context.updateIterator(symbol);
            break;
        }
    }