'use strict';


import Base from "./base.js";

var INVALID_ACCESS = "Invalid object access in [reference] parameter. ",
    INVALID_ACCESS_NOT_ALLOWED = "Unable to access property. ",
    INVALID_UPDATE_ACCESS_OBJECT = "Invalid Object to update access. ",
    INVALID_ACCESS_UPDATE = "Unable to update access of object. ";

export default
    class Native extends Base {

        constructor(compiler) {
            super(compiler);

            this.reference =
                this.autoDeclare = 
                this.allowAccess = true;

            this.finalizeOnAccess = true;

            this.allowBinaryOperation = [
                '**',
                '*',
                '/',
                '%',
                '+',
                '-',
                '<',
                '>',
                '<=',
                '>=',
                'instanceof',
                'in',
                '==',
                '===',
                '!=',
                '!==',
                '&&',
                '||'
            ];

        }

        onAccess() {
            if (this.finalizeOnAccess) {
                this.declare();
            }
        }

        createUpdateAccessSymbol(from, directAccess) {
            var identifier;

            // pray that runtime can generate string
            this.declare();

            // create identifier
            identifier = this.createVariableOfMe();
            identifier.directAccess = directAccess;
            identifier.accessParent = from;
            
            return identifier;
            
        }

        access(reference, directAccess) {

            if (!(reference instanceof Base)) {
                throw new Error(INVALID_ACCESS);
            }

            if (!this.allowAccess) {
                throw new Error(INVALID_ACCESS_NOT_ALLOWED);
            }
            
            directAccess = directAccess === true;

            this.onAccess(reference, directAccess);

            // update access
            return reference.updateAccess(this, directAccess);

        }

        updateAccess(from, directAccess) {

            if (!(from instanceof Base)) {
                throw new Error(INVALID_UPDATE_ACCESS_OBJECT);
            }

            if (!this.allowAccessUpdate) {
                throw new Error(INVALID_ACCESS_UPDATE + from.type);
            }

            return this.createUpdateAccessSymbol(from, directAccess);

        }

        assign() {
            throw new Error("Invalid Assignment");
        }

        instantiate() {
            throw new Error("Invalid Instantiation");
        }

        unset() {
            throw new Error("Invalid Delete statement");
        }

// arithmetic
        binaryOperation(operand, operation) {
            var allow = this.allowBinaryOperation;

            if (!(operand instanceof Base)) {
                throw new Error("Invalid [operand] parameter.");
            }

            if (allow.indexOf(operation) === -1) {
                throw new Error("Operation not allowed " + operation +
                                " for " + operand.type);
            }

            return operand.createVariableOfMe([this.id, ' ',
                                                operation, ' ',
                                                operand.id]).
                        addDependency(this);

        }

        exponential(operand) {
            return this.binaryOperation(operand, '**');
        }

        multiplication(operand) {
            return this.binaryOperation(operand, '*');
        }

        division(operand) {
            return this.binaryOperation(operand, '/');
        }

        modulo(operand) {
            return this.binaryOperation(operand, '%');
        }

        addition(operand) {
            return this.binaryOperation(operand, '+');
        }

        subtraction(operand) {
            return this.binaryOperation(operand, '-');
        }

        lt(operand) {
            return this.binaryOperation(operand, '<');
        }

        lte(operand) {
            return this.binaryOperation(operand, '<=');
        }

        gt(operand) {
            return this.binaryOperation(operand, '>');
        }

        gte(operand) {
            return this.binaryOperation(operand, '>=');
        }

        instanceOf(operand) {
            return this.binaryOperation(operand, 'instanceof');
        }

        inOp(operand) {
            return this.binaryOperation(operand, 'in');
        }

        equal(operand) {
            return this.binaryOperation(operand, '==');
        }

        sequal(operand) {
            return this.binaryOperation(operand, '===');
        }

        notEqual(operand) {
            return this.binaryOperation(operand, '!=');
        }

        notSequal(operand) {
            return this.binaryOperation(operand, '!==');
        }

        and(operand) {
            return this.binaryOperation(operand, '&&');
        }

        or(operand) {
            return this.binaryOperation(operand, '||');
        }

        guard() {

        }
        
    }