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
            value = value[0];
            break;

        default:
            switch (lexeme.rule) {
            // relay rules
            case "1:Primary":
            case "2:Primary":
            case "3:Primary":
            case "4:Primary":
            case "5:Primary":
            case "1:Updatable":
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
            
            case "1:Javascript":
            case "2:Javascript":
            case "1:Transform":
                value = value[0];
                break;

            // relay group
            case "1:Group":
                value = value[1];
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
            case "6:Primary":
                value = compiler.createSymbol(null, "call").
                            useReference(value[0]).
                            useArguments(value[1]);
                break;
            // new object
            case "7:Primary":
                value = value[1].instantiate();
                break;

            // direct access is a property of context symbol
            case "2:Updatable":
                value = compiler.contextSymbol.access(value[0], true);
                break;

            case "3:Updatable":
                value = value[0].access(value[2], true);
                break;

            case "4:Updatable":
                value = value[0].access(value[2], false);
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

            // !not
            case "7:Unary":
                value = value[1].notSymbol();
                break;

            // ***
            case "2:Exponential":
                value = value[0].exponential(value[2]);
                break;
            
            // *
            case "2:Multiplicative":
                value = value[0].multiplication(value[2]);
                console.log("applied multiplication! ", value);
                break;

            // /
            case "3:Multiplicative":
                value = value[0].division(value[2]);
                break;

            // %
            case "3:Multiplicative":
                value = value[0].modulo(value[2]);
                break;

            // -
            case "2:Additive":
                value = value[0].subtraction(value[2]);
                break;

            // +
            case "3:Additive":
                value = value[0].addition(value[2]);
                break;
            
            // <
            case "2:Relational":
            case "3:Relational":
                value = value[0].lt(value[2]);
                break;
            
            // >
            case "4:Relational":
            case "5:Relational":
                value = value[0].gt(value[2]);
                break;

            // <=
            case "6:Relational":
            case "7:Relational":
                value = value[0].lte(value[2]);
                break;

            // >=
            case "8:Relational":
            case "9:Relational":
                value = value[0].gte(value[2]);
                break;

            case "2:Equality":
                value = value[0].equal(value[2]);
                break;

            case "3:Equality":
                value = value[0].notEqual(value[2]);
                break;

            case "4:Equality":
                value = value[0].sequal(value[2]);
                break;

            case "5:Equality":
                value = value[0].notSequal(value[2]);
                break;

            case "2:LogicalAnd":
            case "3:LogicalAnd":
                value = value[0].and(value[2]);
                break;

            case "4:LogicalOr":
            case "5:LogicalOr":
                value = value[0].or(value[2]);
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
            
            // delete statement
            case "1:Delete":
                value = value[1].unset();
                break;

            // transformer namespace
            case "1:Namespace":
                // value = compiler.contextSymbol.access(value[0], true).
                //             setAccessOrigin(compiler.helperSymbol.id);

                // value = compiler.createSymbol('')
                value = value[0].setSymbolAccess();
                // value.value = '|' + value.value;
                // value = compiler.contextSymbol.access(value, true).
                //             setAccessOrigin(compiler.helperSymbol.id);
                // console.log("NS VALUE: ", value.value);
                                
                break;

            case "2:Namespace":
                value = value[0].setValue(value[0].value +
                                            '.' +
                                            value[2].value);
                break;

            // transformer
            case "1:Transformer": // relay
                value = compiler.createSymbol(null, "transformer").
                                useReference(value[0]);
                break;

            case "2:Transformer": // relay
                value = compiler.createSymbol(null, "transformer").
                                useReference(value[0]).
                                useArguments(value[1]);
                break;

            // transform
            case "2:Transform":
                value = value[2].setBaseArgument(value[0]);
                break;

            // last
            case "1:Joqx":
                value[0].finalize();
                value = value[0];
                compiler.appendCode([
                    'return ', value.id
                ]);
            }
        }

        // update lexeme value
        if (cache !== value) {
            compiler.updateIterator(value);
        }
    }



export default compileRule;