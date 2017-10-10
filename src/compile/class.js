'use strict';


export
    class Compile {
        constructor(iterator) {
            var current = {
                    lexemeSymbols: {},
                    symbols: [],
                    code: []
                };

            this.iterator = iterator;
            this.contexts = [this.current = current];
        }

        createSymbol(value) {
            var current = this.current,
                symbols = current.symbols,
                lexemes = current.lexemeSymbols,
                index = symbols.length,
                id = 's' + index;

            lexemes[id] = value;
            symbols[index] = id;

            return id;
        }

        updateIterator(value) {
            this.iterator.update(value);
        }

        appendCode(codes) {
            var list = this.current.code;

            list.push.apply(list, codes);

        }

        generate() {
            
        }
    }


export default Compile;