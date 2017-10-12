'use strict';

import Base from "./base.js";

import NativeObject from "./native.js";

var INVALID_ITEM = "Invalid Symbol [item] parameter.",
    INVALID_NOT_ALLOWED_ITEM = "Appending Symbol [item] is not allowed.";


export default
    class Collection extends NativeObject {

        constructor(compiler) {
            super(compiler);

            this.data = [];

        }

        allowAppend() {
            return true;
        }

        append(item) {
            var list = this.data;

            if (!(item instanceof Base)) {
                throw new Error(INVALID_ITEM);
            }

            if (!this.allowAppend(item)) {
                throw new Error(INVALID_NOT_ALLOWED_ITEM + item.type);
            }

            list[list.length] = item;

            return this;

        }

        getCodeValue() {
            var data = this.data,
                c = -1,
                l = data.length,
                generated = [];
            var symbol;

            for (; l--;) {
                symbol = data[++c];
                console.log("is already finalized? ", symbol.id, " = ", symbol.finalized);
                symbol.finalize();
                generated[c] = symbol.id;
            }

            return generated.join(',');

        }
        
    }