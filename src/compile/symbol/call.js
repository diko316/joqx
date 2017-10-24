'use strict';

import NativeObject from "./native.js";

import Identifier from "./identifier.js";

import ArgumentSymbol from "./arguments.js";

var INVALID_ARGUMENTS = "Invalid Arguments [symbol] parameter.",
    INVALID_CALLABLE = "Invalid Callable [symbol] parameter. ",
    INVALID_NOT_CALLABLE = "Reference [symbol] is not callable. ";


export default
    class CallSymbol extends Identifier {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare =
                this.autoFinalize = false;

            this.reference = 
                this.arguments = null;

            this.constructorCall = false;
            this.disableContext = false;
        }

        onUseReference() {

        }

        onUseArguments() {

        }

        instantiate() {
            this.constructorCall = true;
            return this;
        }

        getDeclarationValue() {
            var reference = this.reference,
                args = this.arguments;

            if (reference) {
                reference.finalize();

                args = this.getArgumentsCode();

                return (this.constructorCall ?
                            [
                                'new ', reference.id, '(', args, ')'
                            ] :
                            [
                                reference.id, '.call(', args, ')'
                            ]).join('');

            }
            return null;

        }

        getArgumentsCode() {
            var args = this.arguments;

            args = args ?
                        args.getCodeValue() : '';

            return this.constructorCall ?
                        args :
                        this.getCallContext() + (args ? ',' + args : '');

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