'use strict';

import CallSymbol from "./call.js";


export default
    class TransformerCallSymbol extends CallSymbol {
        constructor(compiler) {
            super(compiler);

            this.baseArgument = null;
        }

        onUseReference(symbol) {
            symbol.setValue(
                this.compiler.helperSymbol.id +
                '.getTransformer("' + symbol.value + '")');
        }

        setBaseArgument(item) {
            this.addDependency(item).baseArgument = item;
            return this;
        }

        getDeclarationValue() {
            var reference = this.reference,
                args = this.arguments;

            if (reference) {
                reference.finalize();

                args = this.getArgumentsCode();

                return ([ reference.id, '(', args, ')']).join('');

            }
            return null;

        }

        getArgumentsCode() {
            var args = this.arguments,
                base = this.baseArgument;

            args = args ?
                        args.getCodeValue() : '';

            if (base) {
                args = args ?
                             base.id + ',' + args :
                             base.id;
            }

            return args;

        }
    }