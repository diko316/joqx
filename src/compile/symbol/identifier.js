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
                this.finalizeOnAccess = 
                this.disableValueRecode = false;

            this.accessParent = null;

            this.references = [];
            
            this.allowAccess = 
                this.allowAccessUpdate = true;

            this.accessOrigin = null;

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
            // if (this.disableValueRecode) {
            //     return '';
            // }
            
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
                list = [];
            var next;

            for (; current.accessParent; current = next) {
                list.unshift(current.getCodeValue());

                next = current.accessParent;

                if (next && next.type === "jsonpath") {
                    list.unshift.apply(list, next.getPathParts());
                    break;
                }

            }

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


            codes[line++] = ['// assign'];
            
            // for arithmetic assignment
            if (string(operator)) {

                operator = operator.substring(0, operator.length - 1);

                switch (operator) {
                case '**':
                    sourceReference = 'Math.pow(' + id + ', ' + sourceId + ')';
                    break;

                case '*':
                case '/':
                case '%':
                case '+':
                case '-':
                    sourceReference = id + ' ' + operator + ' ' + sourceId;
                }
            }


            // assign
            codes[line++] = [
                id, ' = ', helper, '.set(', context, ',',
                                            jsonPath, ',',
                                            sourceReference, ')'
            ];
            
            this.generateInfix(codes);

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
            this.generateInfix([[
                this.getHelperId(), '.unset(', this.getContextId(), ',',
                                    this.generateJSONPathArray(), ')'
            ]]);
            return this;
        }

        increment(postfix) {

            if (postfix) {
                this.generatePostFix([[
                        this.getHelperId(), '.set(', this.getContextId(), ',',
                                            this.generateJSONPathArray(), ',',
                                            this.id, ' + 1)'
                    ]]);

                this.declared = false;


            }
            // infix is normal call to assign with += operator
            else {
                this.assign(this.compiler.createSymbol('1', "number"), '+=');
            }
            

            return this;

        }

        decrement(postfix) {
            
            if (postfix) {
                this.generatePostFix([[
                        this.getHelperId(), '.set(', this.getContextId(), ',',
                                            this.generateJSONPathArray(), ',',
                                            this.id, ' - 1)'
                    ]]);

            }
            // infix is normal call to assign with += operator
            else {
                this.assign(this.compiler.createSymbol('1', "number"), '-=');
            }

            return this;

        }


        


        
    }