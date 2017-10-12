'use strict';

import NativeObject from "./native.js";

import ArgumentSymbol from "./arguments.js";

var INVALID_ARGUMENTS = "Invalid Arguments [symbol] parameter.",
    INVALID_CALLABLE = "Invalid Callable [symbol] parameter. ",
    INVALID_NOT_CALLABLE = "Reference [symbol] is not callable. ";


export default
    class CallSymbol extends NativeObject {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare =
                this.autoFinalize = false;

            this.reference = 
                this.arguments = null;

        }

        onUseReference() {

        }

        onUseArguments() {

        }

        getDeclarationValue() {
            var reference = this.reference,
                args = this.arguments;

            if (reference && args) {
                reference.finalize();

                args = args.getCodeValue();

                return ([
                    reference.id, '.call(', this.getCallContext(),
                                            args ? ',' + args : '', ')'
                ]).join('');

            }
            return null;

        }

        getCallContext() {
            var reference = this.reference;
            var parent;

            if (reference && reference.type === "identifier") {
                parent = reference.accessParent;
                if (parent) {
                    parent.finalize();
                    return parent.id;
                }
            }

            return this.getContextId();
        }

        useReference(symbol) {
            if (!(symbol instanceof NativeObject)) {
                throw new Error(INVALID_CALLABLE);
            }

            switch (symbol) {
            case "number":
                throw new Error(INVALID_NOT_CALLABLE);
            }

            this.reference = symbol;
            this.onUseReference(symbol);

            return this;
        }

        useArguments(symbol) {
            if (!(symbol instanceof ArgumentSymbol)) {
                throw new Error(INVALID_ARGUMENTS);
            }

            this.arguments = symbol;
            this.onUseArguments(symbol);

            return this;
        }
        
    }