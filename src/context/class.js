'use strict';

import {
            object,
            array,
            string,
            number,
            method,
            contains,
            jsonFill,
            jsonFind
        } from "libcore";

import {
            numeric,
            escapeString
        } from "../helper/string.js";

function Context() {

}

Context.prototype = {

    constructor: Context,

    contains: contains,
    number: number,

    validProperty: function (property) {
        return string(property) || number(property);
    },

    set: function (subject, paths, value) {

        jsonFill(this.createJsonPath(paths), subject, value);

        return value;
        
    },

    get: function (subject, paths) {
        
        return jsonFind(this.createJsonPath(paths), subject);
        
    },

    createJsonPath: function (paths) {
        var strEscape = escapeString,
            isNumeric = numeric,
            l = paths.length;
        var item;

        paths = paths.slice(0);

        // create path
        for (; l--;) {
            item = paths[l];
            // quote
            paths[l] = '[' +
                        (isNumeric(item) ?
                                item :
                                '"' + strEscape(item) + '"') + ']';
        }

        return paths.join('');
    },

    // access: function (subject, property) {

    //     if (!object(subject) && !array(subject) &&
    //         !string(property) && !number(property)) {
    //         return undefined;
    //     }

    //     return property in subject ?
    //                 subject[property] : undefined;
    // },

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