'use strict';

import { string } from "libcore";

import Base from "./native.js";

var SIGN_RE = /[\-\+]/g;


export default
    class NumberSymbol extends Base {

        positive() {
            var value = this.value;

            if (string(value)) {
                this.value = '+' + value.replace(SIGN_RE, '');
                this.redeclare();
            }

            return this;
        }

        negative() {
            var value = this.value;

            if (string(value)) {
                this.value = '-' + value.replace(SIGN_RE, '');
                this.redeclare();
            }


            return this;
        }


    }