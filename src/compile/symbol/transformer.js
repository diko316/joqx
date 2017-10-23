'use strict';

import CallSymbol from "./call.js";


export default
    class TransformerCallSymbol extends CallSymbol {
        constructor(compiler) {
            super(compiler);

            this.baseArgument = null;
        }

        setBaseArgument(item) {
            this.addDependency(item).baseArgument = item;
            return this;
        }

        getArgumentsCode() {
            var args = this.getCodeValue(),
                base = this.baseArgument;

            if (base) {
                args = args ? base + ',' + args : '';
            }

            return this.constructorCall ?
                        args :
                        this.getCallContext() + (args ? ',' + args : '');

        }
    }