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

    onInitialize: function (compiler, value, constantify) {
        var symbols = compiler.symbols,
            index = symbols.length,
            id = 's' + index;

        this.id = id;

        // register
        this.constant = constantify;
        this.value = value;

        if (constantify) {
            symbols.splice(0, 0, id);
        }
        else {
            symbols[index] = id;
        }

        compiler.symbolConfig[id] = this;

    },

    onDeclare: function () {
        var value = this.getDeclarationValue();

        if (value) {
            this.declareCode = [this.id, ' = ', value];
        }
    },

    onFinalize: function () {
        
    },

    initialize: function (value, constantify) {
        if (!this.initialized) {
            this.initialized = true;
            
            this.onInitialize(this.compiler,
                                value,
                                constantify === true || constantify === false ?
                                    constantify : this.constant);

            if (this.autoFinalize) {
                this.finalize();
            }
            else if (this.autoDeclare) {
                this.declare();
            }
        }
    },

    declare: function () {
        var compiler = this.compiler;

        this.declared = true;

        // finalize first
        if (!this.finalized) {
            this.finalize();
        }

        this.onDeclare(compiler, this.value);

        this.generateCodeLines([this.declareCode]);

        return this;

    },

    redeclare: function () {
        if (this.declared) {
            this.declared = false;
        }
        return this.declare();
    },

    finalize: function () {

        if (!this.finalized) {
            this.finalized = true;
            
            this.onFinalize(this.compiler);

            this.generateCodeLines(this.finalizeCode);

        }

        if (!this.declared) {
            this.declare();
        }

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
            commit = this.finalized || force === true;
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