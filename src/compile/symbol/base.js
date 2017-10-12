'use strict';

import {
            string,
            array
            
        } from "libcore";

function Symbol(compiler) {
    this.compiler = compiler;
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
        this.declareCode = this.value;
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

            if (this.autoDeclare) {
                this.declare();
            }

            if (this.autoFinalize) {
                this.finalize();
            }
        }
    },

    declare: function () {
        var compiler = this.compiler;
        var value;

        if (!this.declared) {
            this.declared = true;

            this.onDeclare(compiler, this.value);

            value = this.declareCode;

            if (array(value)) {
                this.declareCode = value = value.join('');
            }
            
            // declare!
            if (string(value)) {
                compiler.appendCode(this.id + ' = ' + value);
            }
        }

    },

    finalize: function () {
        var compiler = this.compiler,
            isArray = array,
            isString = string;
        var value, c, l, item;

        if (!this.finalized) {
            this.finalized = true;
            this.declare();
            this.onFinalize(this.compiler);

            value = this.finalizeCode;
            if (isString(value)) {
                value = [[value]];
            }

            if (isArray(value)) {
                for (c = -1, l = value.length; l--;) {
                    item = value[++c];
                    if (isArray(item) || isString(item)) {
                        compiler.appendCode(item);
                    }
                }
            }
        }
    }
};

export default Symbol;