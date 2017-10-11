'use strict';

import {
            object,
            array,
            string,
            number,
            method,
            jsonFill
        } from "libcore";

function Context() {

}

Context.prototype = {

    constructor: Context,

    access: function (subject, property) {

        if (!object(subject) && !array(subject) &&
            !string(property) && !number(property)) {
            return undefined;
        }

        return property in subject ?
                    subject[property] : undefined;
    },

    fill: function (path, value) {
        if (path.substring(0, 2) === '$.') {
            path = path.substring(2, path.length);
        }

        jsonFill(path, this, value);

    },

    getTransformer(name) {
        var transformer;

        if (string(name) && name in this) {
            transformer = this[name];
            if (method(transformer)) {
                return transformer;
            }
        }

        return null;
    }
    
};

export { Context };

export default Context;