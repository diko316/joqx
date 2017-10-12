'use strict';

// import {
//             createReference,
//             assign
//         } from "./helper/accessor.js";

// import {
//             createArgumentSymbol,
//         } from "./helper/argument.js";

var TYPE_ARGUMENTS = "arguments";

export
    function compileRule(compiler, lexeme) {
        var cache = lexeme.value,
            value = cache;
        
        switch (lexeme.name) {
        // relay all
        case "Number":
        case "Literal":
        case "Javascript":
        case "Primary":
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
                
            // direct access is a property of context symbol
            case "1:Updatable":
                value = compiler.contextSymbol.access(value[0], true);
                break;

            case "2:Updatable":
                value = value[0].access(value[2], true);
                break;

            case "3:Updatable":
                value = value[0].access(value[2], false);
                break;
            
            // arguments
            case "1:Arguments": // relay
                value = compiler.createSymbol(null, TYPE_ARGUMENTS);
                break;

            case "2:Arguments": // relay
                value = value[1];
                break;

            case "1:ArgumentList":
                value = compiler.createSymbol(null, TYPE_ARGUMENTS).
                            append(value[0]);
                break;

            case "2:ArgumentList":
                value = value[0].append(value[2]);
                break;

            // function call
            case "1:Call":
                value = compiler.createSymbol(null, "call").
                            useReference(value[0]).
                            useArguments(value[1]);
                break;

            // ++
            case "2:PostFix":
                value = value[0].increment(true);
                break;

            // -- 
            case "3:PostFix":
                value = value[0].decrement(true);
                break;

            // ++ infix
            case "2:Unary":
                value = value[1].increment(false);
                break;

            // -- infix
            case "3:Unary":
                value = value[1].decrement(false);
                break;
            
            // positive sign
            case "4:Unary":
                value = value[1].positive(false);
                break;

            // negative sign
            case "5:Unary":
                value = value[1].negative(false);
                break;

            // typeof
            case "6:Unary":
                value = value[1].typeofSymbol();
                break;


            // assignment
            case "2:Assignment":
            case "3:Assignment":
            case "4:Assignment":
            case "5:Assignment":
            case "6:Assignment":
            case "7:Assignment":
            case "8:Assignment":
                value = value[0].assign(value[2], value[1]);
                //value = assign(context, value[1], value[0], value[2]);

                break;

            // transformer
            case "2:Transformer": // relay
                lexeme.callArguments = value[1];
            
            /* falls through */
            case "1:Transformer": // relay
                // value = [context.
                //             createSymbol([helperVar,
                //                         '.getTransformer("', value[0], '")']),
                //             lexeme.callArguments || []];
                break;

            // transform
            case "2:Transform":
                // callback = value[2];
                // callArguments = [helperVar, value[0]].
                //                     concat(callback[1]).
                //                     join(',');
                // callback = callback[0];

                // value = context.createSymbol([callback, ' ? ',
                //                 callback, '(', callArguments, ') : undefined']);
                break;

            // last
            case "1:Joqx":
                // value = value[0];
                // context.appendCode([
                //     'return ', value
                // ]);
            }
        }

        // update lexeme value
        if (cache !== value) {
            compiler.updateIterator(value);
        }
    }



export default compileRule;