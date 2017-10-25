'use strict';

import {
            string,
            array
            
        } from "libcore";

function Symbol(compiler) {
    this.compiler = compiler;
    this.type = this.type;

    this.pendingCodes = [];
}

Symbol.prototype = {
    constructor: Symbol,
    id: null,
    
    autoDeclare: false,
    declared: false,
    value: null,
    declareCode: null,

    autoFinalize: false,
    finalizeCode: null,
    constant: false,

    finalized: false,
    initialized: false,

    inFixCode: null,
    postFixCode: null,

    onInitialize: function (compiler, value, constantify) {
        var symbols = compiler.symbols,
            index = symbols.length,
            id = 's' + index;

        this.id = id;

        // register
        this.constant = constantify;
        this.value = value;
        this.references = [];

        if (constantify) {
            symbols.splice(0, 0, id);
        }
        else {
            symbols[index] = id;
        }

        compiler.symbolConfig[id] = this;

    },

    onDeclare: function () {
        var list = this.references,
            len = list.length,
            c = -1;
        var item, value;

        for (; len--;) {
            item = list[++c];
            item.declare();
        }

        value = this.getDeclarationValue();

        if (value) {
            this.generateCodeLines([[this.id, ' = ', value]]);
        }
    },

    onDeclarePostFix: function (postfix) {
        this.generateCodeLines(postfix);
    },

    onDeclareInfix: function (infix) {
        this.generateCodeLines(infix);
    },

    initialize: function (value, constantify) {
        if (!this.initialized) {
            this.initialized = true;
            
            this.onInitialize(this.compiler,
                                value,
                                constantify === true || constantify === false ?
                                    constantify : this.constant);

            if (this.autoDeclare) {
                this.declare();
            }
        }
    },

    declare: function () {
        var compiler = this.compiler,
            postfix = this.postFixCode,
            infix = this.inFixCode;

        // run declaration
        if (!this.declared) {
            this.declared = true;

            this.onDeclare(compiler);
        }

        // run infix
        if (infix) {
            this.onDeclareInfix(infix);

            delete this.inFixCode;
        }
        
        // postfix code
        if (postfix) {
            this.onDeclarePostFix(postfix);

            // run once
            delete this.postFixCode;

            // should redeclare when needed again
            delete this.declared;
        }

        return this;

    },

    redeclare: function () {
        if (this.declared) {
            this.declared = false;
        }
        return this.declare();
    },

    addDependency: function (symbol) {
        var list = this.references;

        if (!(symbol instanceof Symbol)) {
            throw new Error("Invalid [symbol] dependency.");
        }

        list[list.length] = symbol;

        return this;
    },

    typeofSymbol: function () {
        return this.createVariableOfMe('typeof ' + this.id);
    },

    notSymbol: function () {
        return this.createVariableOfMe('!' + this.id);
    },

    

    getDeclarationValue: function () {
        return this.getCodeValue();
    },

    getCodeValue: function () {
        return this.value;
    },

    generateCodeLines: function (value, force) {
        var compiler = this.compiler,
            isArray = array,
            isString = string,
            pending = this.pendingCodes,
            commit = this.declared || force === true;
        var c, l, item, pl;

        if (isString(value)) {
            value = [[value]];
        }

        if (isArray(value)) {
            pl = pending.length;
            for (c = -1, l = value.length; l--;) {
                item = value[++c];
                if (isArray(item) || isString(item)) {
                    pending[pl++] = item;
                }
            }
        }

        // commit
        if (commit) {
            for (c = -1, l = pending.length; l--;) {
                compiler.appendCode(pending[++c]);
            }
            pending.splice(0, pending.length);
        }

        return this;
    },

    generateInfix: function (code) {
        var current = this.inFixCode,
            isArray = array,
            isString = string;
        var c, l, item, cl;

        if (!current) {
            current = this.inFixCode = [];
        }
        
        if (isString(code)) {
            code = [code];
        }

        if (isArray(code)) {
            cl = current.length;
            for (c = -1, l = code.length; l--;) {
                item = code[++c];
                if (isArray(item) || isString(item)) {
                    current[cl++] = item;
                }
            }
        }

    },

    generatePostFix: function (code) {
        var current = this.postFixCode,
            isArray = array,
            isString = string;
        var c, l, item, cl;

        if (!current) {
            current = this.postFixCode = [];
        }
        
        if (isString(code)) {
            code = [code];
        }

        if (isArray(code)) {
            cl = current.length;
            for (c = -1, l = code.length; l--;) {
                item = code[++c];
                if (isArray(item) || isString(item)) {
                    current[cl++] = item;
                }
            }
        }
    },

    getHelperId: function () {
        return this.compiler.helperSymbol.id;
    },

    getContextId: function () {
        return this.compiler.contextSymbol.id;
    },

    createVariableOfMe: function (value) {
        var identifier;

        if (array(value)) {
            value = value.join('');
        }

        if (!string(value)) {
            value = this.id;
        }

        identifier = this.compiler.createSymbol(value, "identifier");
        identifier.symbolAccess = true;
        identifier.addDependency(this);

        return identifier;

    }


};

export default Symbol;