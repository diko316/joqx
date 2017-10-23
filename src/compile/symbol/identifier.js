'use strict';

import { string } from "libcore";

import Base from "./base.js";

import NativeSymbol from "./native.js";


export default
    class Identifier extends NativeSymbol {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare =
                this.directAccess = 
                this.symbolAccess =
                this.finalizeOnAccess = false;

            this.accessParent = null;

            this.references = [];
            
            this.allowAccess = 
                this.allowAccessUpdate = true;

            this.accessOrigin = null;

        }

        onDeclare() {
            var list = this.references,
                len = list.length,
                c = -1;

            for (; len--;) {
                list[++c].finalize();
            }

            super.onDeclare();

        }

        setAccessOrigin(item) {
            this.accessOrigin = item;
            return this;
        }

        setSymbolAccess(isSymbolAccess) {
            this.symbolAccess = isSymbolAccess !== false;
            return this;
        }

        setFinalizeOnAccess(isFinalizedOnAccess) {
            this.finalizeOnAccess = isFinalizedOnAccess !== false;
            return this;
        }

        // do not declare
        getDeclarationValue() {
            return this.symbolAccess ?
                        this.getCodeValue() :
                        this.getAccessCodeValue();
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        getCodeValue() {
            var value = this.value;
            
            return string(value) ?
                        this.symbolAccess ?
                            value :
                            '"' + value + '"' :
                        null;
        }

        getAccessCodeValue() {
            return ([
                this.getHelperId(), ".get(",
                            this.getAccessOrigin(), ',',
                            this.generateJSONPathArray(), ')'
            ]).join('');
        }

        getAccessOrigin() {
            var item = this.accessOrigin;
            return string(item) ? item : this.getContextId();
        }

        generateJSONPathArray() {
            var current = this,
                list = [],
                len = 0;

            for (; current.accessParent; current = current.accessParent) {
                list[len++] = current.getCodeValue();
            }

            list.reverse();

            return '[' + list.join(',') + ']';

        }

        createUpdateAccessSymbol(from, directAccess) {
            // if not direct access, resolve value and create another identifier
            if (!directAccess) {
                return super.createUpdateAccessSymbol(from, directAccess);
            }
            
            this.directAccess = directAccess;
            this.accessParent = from;
            
            // reuse me
            return this;
            
        }

        addDependency(symbol) {
            var list = this.references;

            if (!(symbol instanceof Base)) {
                throw new Error("Invalid [symbol] dependency.");
            }

            list[list.length] = symbol;

            return this;
        }

        assign(source, operator) {
            var jsonPath = this.generateJSONPathArray(),
                helper = this.getHelperId(),
                context = this.getContextId(),
                codes = [],
                line = 0,
                sourceId = source.id,
                id = this.id,
                sourceReference = sourceId;

            // source should be finalized if not yet finalized
            this.addDependency(source);
            
            // for arithmetic assignment
            if (string(operator)) {

                operator = operator.substring(0, operator.length - 1);

                switch (operator) {
                case '**':
                case '*':
                case '/':
                case '%':
                case '+':
                case '-':

                    sourceReference = id + ' ' + operator + ' ' + sourceId;

                    codes[line++] = [
                        id, ' = ', this.getAccessCodeValue()
                    ];

                }
            }


            // assign
            codes[line++] = [
                id, ' = ', helper, '.set(', context, ',',
                                            jsonPath, ',',
                                            sourceReference, ')'
            ];

            this.generateCodeLines(codes);

            return this;
        }

        instantiate() {
            var symbol = this.createVariableOfMe([
                                    'new ' + this.id
                                ],
                                "identifier");
            return symbol;
        }

        unset() {
            this.generateCodeLines([[
                this.getHelperId(), '.unset(', this.getContextId(), ',',
                                    this.generateJSONPathArray(), ')'
            ]]);
            return this;
        }

        increment(postfix) {

            if (postfix) {
                this.declare();

                this.generateCodeLines([[
                    this.getHelperId(), '.set(', this.getContextId(), ',',
                                        this.generateJSONPathArray(), ',',
                                        this.id, ' + 1)'
                ]]);

                // in order to redefine again
                this.declared = false;
            }
            // infix is normal call to assign with += operator
            else {
                this.assign(this.compiler.createSymbol('1', "number"),
                            '+=');
            }

            return this;

        }

        decrement(postfix) {
            
            if (postfix) {
                this.declare();

                this.generateCodeLines([[
                    this.getHelperId(), '.set(', this.getContextId(), ',',
                                        this.generateJSONPathArray(), ',',
                                        this.id, ' - 1)'
                ]]);

                // in order to redefine again
                this.declared = false;
            }
            // infix is normal call to assign with += operator
            else {
                this.assign(this.compiler.createSymbol('1', "number"), '-=');
            }

            return this;

        }


        


        
    }