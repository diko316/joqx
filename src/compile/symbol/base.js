'use strict';

import {
            string,
            array,
            boolean
        } from "libcore";

function Symbol(compiler) {
    this.compiler = compiler;
}

Symbol.prototype = {
    constructor: Symbol,
    id: null,
    
    declared: false,
    declareCode: null,

    autoFinalize: false,
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

        if (constantify) {
            symbols.splice(0, 0, id);
        }
        else {
            symbols[index] = id;
        }

        compiler.symbolConfig[id] = this;

        if (array(value)) {
            value = value.join('');
        }
        
        if (string(value)) {
            this.declareCode = value;

            if (constantify) {
                compiler.constantLookup[value] = id;
            }
        }


    },

    onDeclare: function (compiler) {
        var code = this.declareCode;

        if (code) {
            compiler.appendCode(this.id + ' = ' + code);
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

            if (this.constant) {
                this.declare();
            }
        }
    },

    declare: function () {
        if (!this.declared) {
            this.declared = true;

            this.onDeclare(this.compiler);
        }

    },

    finalize: function () {
        if (!this.finalized) {
            this.finalized = true;
            this.onFinalize(this.compiler);
        }
    }
};

export default Symbol;