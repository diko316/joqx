'use strict';

export
    class Compile {
        constructor(iterator) {
            var current = {
                    lexemeSymbols: {},
                    symbols: [],
                    code: []
                };

            this.contextSymbol = '$';
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
            var contexts = this.contexts,
                compiled = [],
                lines = 0,
                c = -1,
                l = contexts.length;
            var context, symbols, symbol, sc, sl, lexemeSymbols, value,
                vars, vl, codes, cl;

            for (; l--;) {
                context = contexts[++c];

                codes = context.code;

                // generat variables
                lexemeSymbols = context.lexemeSymbols;

                symbols = context.symbols;
                sc = -1;
                sl = symbols.length;
                vars = [];
                vl = 0;


                for (; sl--;) {
                    symbol = symbols[++sc];
                    value = lexemeSymbols[symbol];

                    vars[vl++] = symbol + ( value ?
                                             '=' + value : '');
                }

                if (vl) {
                    codes.splice(0, 0,
                        'var ' + vars.join(',\n')
                    );
                }

                if (codes.length) {
                    compiled[lines++] = codes.join(';\n') + ';';
                }
                
            }
            
            return compiled.join("\n");

        }
    }


export default Compile;