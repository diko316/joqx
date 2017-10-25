'use strict';

import {
            string,
            array
        } from "libcore";

import { instantiate } from "./symbol.js";

export
    class Compile {
        constructor(iterator) {
            var identifierType = "identifier";
            var context, helper;

            this.constantLookup = {};
            this.symbolConfig = {};
            this.symbols = [];
            this.code = [];
            this.iterator = iterator;

            this.lineFeed = "\n";
            this.defaultSymbolType = "mixed";

            this.errorCount = 0;
            this.errorMessages = [];

            this.contextSymbol = context = this.createSymbol('context',
                                                            identifierType);

            this.helperSymbol = helper = this.createSymbol('helper',
                                                            identifierType);
            
            // these are final symbols
            context.symbolAccess =
                helper.symbolAccess = true;

            context.declare();
            helper.declare();
            
        }

        createSymbol(value, type, constantify) {
            var symbol = instantiate(type, this);

            symbol.initialize(value, constantify);

            return symbol;
        }
        
        getSymbol(id) {
            var symbols = this.symbols,
                index = symbols.indexOf(id);

            return index !== -1 ? this.symbolConfig[id] : null;
        }

        updateIterator(value) {
            this.iterator.update(value);
        }

        appendCode() {
            var list = this.code,
                len = list.length,
                args = arguments,
                c = -1,
                l = args.length,
                isString = string,
                isArray = array;

            var item;

            for (; l--;) {
                item = args[++c];
                if (isArray(item)) {
                    item = item.join('');
                }
                else if (!isString(item)) {
                    continue;
                }

                list[len++] = item;
            }

        }

        reportError(errorMessage, fatal) {
            var list = this.errorMessages;

            list[list.length] = errorMessage;
            if (fatal === true) {
                this.errorCount++;
                console.error(errorMessage);
            }
            else {
                console.warn(errorMessage);
            }

        }

        nullFill(ignoreSymbols) {
            var symbols = this.symbols;
            var l, index;
            if (string(ignoreSymbols)) {
                ignoreSymbols = [ignoreSymbols];
            }

            // filter
            if (array(ignoreSymbols)) {
                symbols = symbols.slice(0);
                for (l = ignoreSymbols.length; l--;) {
                    index = symbols.indexOf(ignoreSymbols[l]);
                    if (index !== -1) {
                        symbols.splice(index, 1);
                    }
                }
                
            }

            this.appendCode(symbols.join(' = ') + ' = null');

            return this;
        }

        generate() {
            var symbols = this.symbols.slice(0),
                configs = this.symbolConfig,
                c = -1,
                l = symbols.length,
                code = this.code.slice(0);
           var symbol, config;

            // declare variables
            for (; l--;) {
                symbol = symbols[++c];
                config = configs[symbol];
                if (config.constant) {
                    symbols[c] = symbol + ' = ' + config.value;
                }
            }

            // add try catch
            if (code.length) {
                code.splice(2, 0, 'try { // catch all errors');
                code.splice(code.length, 0,
                    '} catch (e) { // end try',
                        'return ' + this.helperSymbol.id + '.reject(e)', 
                    '} // end catch');
            }

            // declare variables
            if (symbols.length) {
                code.splice(0, 0, 'var ' + symbols.join(','));
            }

            return code.length ?
                        code.join(';' + this.lineFeed) + ";" : "";
        }
    }


export default Compile;