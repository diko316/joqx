'use strict';



import {
            //jsonRecodeArrayPath,
            escapeString
        } from "../helper/string.js";

var TYPE_ARGUMENTS = "arguments",
    TYPE_IDENTIFIER = "identifier";

export
    function compileRule(compiler, lexeme) {
        var cache = lexeme.value,
            value = cache;
        var condition, item1, item2;
        
        switch (lexeme.name) {
        // relay all
        case "Number":
        case "Javascript":
            value = value[0];
            break;

        default:
            switch (lexeme.rule) {
            // relay rules
            case "2:Literal":
            case "3:Literal":
            case "4:Literal":
            case "5:Literal":
            case "6:Literal":
            case "7:Literal":
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

            // void
            case "1:Void":
                value = compiler.createSymbol("void(" + value[1].id + ')',
                                                TYPE_IDENTIFIER).
                                setSymbolAccess().
                                addDependency(value[1]);
                break;
            
            // this
            case "1:Literal":
                value = compiler.createSymbol(compiler.contextSymbol.id,
                                                TYPE_IDENTIFIER).
                                setSymbolAccess();
                break;


            // relay group
            case "1:Group":
                value = value[1];
                break;
            
            // array
            case "1:Array":
                value = compiler.createSymbol("[]",
                                                TYPE_IDENTIFIER).
                            setSymbolAccess();
                break;

            case "2:Array": // relay Elements
                value = value[1];
                break;

            case "1:Elements":
                value = compiler.createSymbol(null, "array").
                            append(value[0]);
                break;

            case "2:Elements":
                value = value[0].
                            append(value[2]);
                break;

            // object
            case "1:Object":
                value = compiler.createSymbol("{}", TYPE_IDENTIFIER).
                            setSymbolAccess();
                break;

            case "2:Object":
                value = value[1];
                break;

            case "1:Properties":
                value = value[0];
                value = compiler.createSymbol(null, "object").
                            append(value[1], value[0]);
                break;
            
            case "2:Properties":
                item1 = value[2];
                value = value[0].append(item1[1], item1[0]);
                break;

            case "1:Property": // relay
            case "2:Property": // relay
            case "3:Property": // relay
                value = [value[0].value, value[2]];
                
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
                break;

            // /
            case "3:Multiplicative":
                value = value[0].division(value[2]);
                break;

            // %
            case "4:Multiplicative":
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

            case "10:Relational":
                value = value[0].instanceOf(value[2]);
                break;

            case "11:Relational":
                value = value[0].inOp(value[2]);
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

            case "2:LogicalOr":
            case "3:LogicalOr":
                value = value[0].or(value[2]);
                break;

            case "2:Conditional":
                item1 = value[2];
                item2 = value[4];
                condition = value[0];

                value = compiler.createSymbol(null, TYPE_IDENTIFIER).
                            setSymbolAccess().
                            addDependency(condition);

                item1 = compiler.createSymbol(null, "block").
                                setStatement([
                                    'if (', condition.id, ')'
                                ]).
                                setResultIdentifier(value.id).
                                addDependency(item1);
                
                item2 = compiler.createSymbol(null, "block").
                                setStatement('else').
                                setResultIdentifier(value.id).
                                addDependency(item2);

                value.addDependency(item1).
                    addDependency(item2);

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
                value = value[0].setSymbolAccess();
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
                value = value[0];
                break;

            case "2:Joqx":
                item1 = value[0];
                item2 = value[1];
                value = compiler.createSymbol(compiler.helperSymbol.id +
                                '.intent("' +
                                    escapeString(item1.
                                        substring(1, item1.length)) + '",' +
                                        item2.id + ')',
                                TYPE_IDENTIFIER).
                            setSymbolAccess().
                            addDependency(item2);
                // console.log("intent ", value[0]);
                // value = value[1];
                break;

            case "1:Joqx'":
                value = value[0];
                value.declare();
                compiler.appendCode([
                    value.id, ' = ', compiler.helperSymbol.id,
                                '.formatReturn(', value.id, ', rawResult)'
                ]);
                compiler.nullFill(value.id);
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