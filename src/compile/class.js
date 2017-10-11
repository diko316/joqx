'use strict';

import {
            string,
            array,
            contains
        } from "libcore";

export
    class Compile {
        constructor(iterator) {
            var objectType = "object";

            this.constantLookup = {};
            this.symbolConfig = {};
            this.symbols = [];
            this.code = [];
            this.iterator = iterator;

            this.lineFeed = "\n";
            this.defaultSymbolType = "mixed";

            this.contextSymbol = this.createSymbol('context', objectType);
            this.helperSymbol = this.createSymbol('helper', objectType);

            this.errorCount = 0;
            this.errorMessages = [];
            
        }

        createSymbol(value, type, constantify) {
            var symbols = this.symbols,
                configs = this.symbolConfig,
                code = this.code,
                isString = string,
                index = symbols.length,
                id = 's' + index,
                config = {
                    id: id,
                    type: this.defaultSymbolType,
                    constant: constantify = constantify === true,
                    value: null
                };

            if (constantify === true) {
                symbols.splice(0, 0, id);
            }
            else {
                symbols[index] = id;
            }

            configs[id] = config;

            if (isString(type)) {
                config.type = type;
            }

            if (array(value)) {
                value = value.join('');
            }
            
            if (isString(value)) {
                config.value = value;

                if (!constantify) {
                    code[code.length] = id + ' = ' + value;
                }
            }

            return id;
        }

        createConstant(value, type) {
            var lookup = this.constantLookup,
                configs = this.symbolConfig;
            var id, config;

            if (contains(lookup, value)) {
                return lookup[value].id;
            }
            
            id = this.createSymbol(value, type, true);
            config = configs[id];
            lookup[value] = config;
            config.constant = true;

            return id;
            
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

            // declare variables
            if (symbols.length) {
                code.splice(0, 0, 'var ' + symbols.join(','));
            }

            return code.length ?
                        code.join(';' + this.lineFeed) + ";" : "";
        }
    }


export default Compile;