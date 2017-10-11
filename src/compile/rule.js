'use strict';

export
    function compileRule(context, lexeme) {
        var cache = lexeme.value,
            value = cache,
            contextSymbol = context.contextSymbol;

        var symbol, callback, callArguments;
        
        switch (lexeme.name) {
        // relay all
        case "Number":
        case "Literal":
        case "Primary":
        case "Javascript":
            value = value[0];
            break;

        default:
            switch (lexeme.rule) {
            // relay rules
            case "1:PostFix":
            case "1:Unary":
            case "1:Exponential":
            case "1:Multiplicative":
            case "1:Additive":
            case "1:Relational":
            case "1:Equality":
            case "1:LogicalAnd":
            case "1:LogicalOr":
            case "1:Conditional":
            case "1:Assignment":

            case "1:Namespace":
            case "1:Transform":
                value = value[0];
                break;

            // updatable member
            case "1:Updatable":
                value = contextSymbol + '.' + value[0];
                break;
    
            case "2:Updatable":
                value = value[0] + '.' + value[2];
                break;

            case "3:Updatable":
                value = value[0] + '[' + value[2] + ']';
                break;
            
            // arguments
            case "1:Arguments": // relay
                value = [];
                break;

            case "2:Arguments": // relay
                value = value[1];
                break;

            case "1:ArgumentList":
                value = [value[0]];
                break;

            case "2:ArgumentList":
                value = value[0].concat([value[2]]);
                break;


            // assignment
            case "2:Assignment":
            case "3:Assignment":
            case "4:Assignment":
            case "5:Assignment":
            case "6:Assignment":
            case "7:Assignment":
            case "8:Assignment":
                // ensure that Updatetable path exists
                break;

            // transformer
            case "2:Transformer": // relay
                lexeme.callArguments = value[1];
            
            /* falls through */
            case "1:Transformer": // relay
                value = [context.
                            createSymbol([contextSymbol,
                                        '.getTransformer(', value[0], ')']),
                            lexeme.callArguments || []];
                break;

            // transform
            case "2:Transform":
                callback = value[2];
                callArguments = [contextSymbol, value[0]].
                                    concat(callback[1]).
                                    join(',');
                callback = callback[0];

                value = context.createSymbol([callback, ' ? ',
                                callback, '(', callArguments, ') : undefined']);
                break;
            }
        }

        // update lexeme value
        if (cache !== value) {
            context.updateIterator(value);
        }
    }



export default compileRule;