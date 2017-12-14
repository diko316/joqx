'use strict';

import {
            string,
            number,
            contains,
            jsonFill,
            jsonFind,
            jsonUnset,
            thenable
        } from "libcore";

import {
            numeric,
            escapeString
        } from "../helper/string.js";

import { FakePromise } from "../helper/promise.js";


import { Transformer } from "../transformer/registry.js";

import { Intent } from "../intent/registry.js";

function Helper(intent, transformer) {
    var IntentClass = Intent,
        TransformerClass = Transformer;

    this.intentRegistry = intent instanceof IntentClass ?
                                    intent : new Intent();

    this.transformerRegistry = transformer instanceof TransformerClass ?
                                    transformer : new TransformerClass();

    this.transformCache = {};
    this.intentCache = {};
}

Helper.prototype = {

    constructor: Helper,

    transformerRegistry: null,
    intentRegistry: null,

    contains: contains,
    number: number,

    validProperty: function (property) {
        return string(property) || number(property);
    },

    get: function (subject, paths) {
        
        return jsonFind(this.createJsonPath(paths), subject);
        
    },

    set: function (subject, paths, value) {

        jsonFill(this.createJsonPath(paths), subject, value);

        return value;
        
    },

    unset: function (subject, paths) {
        
        return jsonUnset(this.createJsonPath(paths), subject);
        
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

    getTransformer: function(name) {
        var access = ':' + name,
            list = this.transformCache;
        var found;

        if (access in list) {
            return list[access];
        }

        found = this.transformerRegistry.get(name);
        if (!found) {
            throw new Error("Transformer named " + name + " do not exist.");
        }

        return (list[access] = found);

    },

    getIntent: function(name) {
        var access = ':' + name,
            list = this.intentCache;
        var found;

        if (access in list) {
            return list[access];
        }

        found = this.intentRegistry.get(name);
        if (!found) {
            throw new Error("Intent named " + name + " do not exist.");
        }

        return (list[access] = found);
    },

    intent: function (name, value) {
        return this.getIntent(name)(this, value);
    },

    transform: function (name, value) {
        return this.getTransformer(name)(this, value);
    },

    formatReturn: function (value, rawValue) {

        if (rawValue === true) {
            return value;
        }

        return thenable(value) ? value : new FakePromise(value);
    },

    reject: function (error) {
        return Promise.reject(error);
    }

    
};

export { Helper };

export default Helper;
