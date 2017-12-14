'use strict';

import {
            string,
            method,
            createRegistry
        } from "libcore";

import { promiseGuard } from "../executor.js";


const NAME_RE = /[a-zA-Z\_\$][a-zA-Z0-9\_\$]*(\.[a-zA-Z\_\$][a-zA-Z0-9\_\$]*)*/;

function Transformer() {
    this.registry = createRegistry();
}

Transformer.prototype = {

    register: function (name, transformer) {
        var registry = this.registry;
        
        if (!string(name)) {
            throw new Error("Invalid transformer [name] parameter.");
        }
        else if (!NAME_RE.test(name)) {
            throw new Error("Malformed transformer [name] parameter: " + name);
        }

        if (!method(transformer)) {
            throw new Error("Invalid [transformer] Function parameter named: " +
                            name);
        }

        if (registry.exists(name)) {
            throw new Error("Invalid [transformer] named: " + name +
                            " already exist");
        }

        registry.set(name, promiseGuard(transformer));

        return this;
    },

    exists: function (name) {
        return this.registry.exists(name);
    },

    get: function (name) {
        var registry = this.registry;
        return registry.exists(name) ? registry.get(name) : null;
    }

};


export { Transformer };