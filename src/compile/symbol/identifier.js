'use strict';

import { string } from "libcore";

import Base from "./native.js";


export default
    class Identifier extends Base {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare =
                this.directAccess = 
                this.symbolAccess =
                this.finalizeOnAccess = false;

            this.reference =
                this.accessParent = null;

            
            this.allowAccess = 
                this.allowAccessUpdate = true;

        }

        onDeclare() {
            var reference = this.reference;

            if (reference) {
                reference.finalize();
            }

            super.onDeclare();

        }

        // do not declare
        getDeclarationValue() {
            return this.symbolAccess ?
                        this.getCodeValue() :
                        this.getAccessCodeValue();
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
                            this.getContextId(), ',',
                            this.generateJSONPathArray(), ')'
            ]).join('');
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
            source.finalize();
            
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
                this.assign(this.compiler.createSymbol('1', "number"), '+=');
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


        
    }