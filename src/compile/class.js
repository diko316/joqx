'use strict';

import {
            string,
            array
        } from "libcore";

export
    class Compile {
        constructor(iterator) {

            this.contextSymbol = '$';
            this.symbols = [];
            this.code = [];
            this.iterator = iterator;

            this.lineFeed = "\n";
            
        }

        createSymbol(value) {
            var symbols = this.symbols,
                code = this.code,
                index = symbols.length,
                id = 's' + index;

            symbols[index] = id;

            if (array(value)) {
                value = value.join('');
            }
            
            if (string(value)) {
                code[code.length] = id + ' = ' + value;
            }

            return id;
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

            list.push.apply(list, codes);

        }

        generate() {
            var symbols = this.symbols,
                code = this.code.slice(0);
           
            // declare variables
            if (symbols.length) {
                code.splice(0, 0, 'var ' + symbols.join(','));
            }

            return code.length ?
                        code.join(';' + this.lineFeed) + ";" : "";
        }
    }


export default Compile;