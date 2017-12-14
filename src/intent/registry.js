'use strict';

import {
            string,
            method,
            createRegistry
        } from "libcore";

import { promiseGuard } from "../executor.js";

const NAME_RE = /[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/;

function Intent() {
    this.registry = createRegistry();
}

Intent.prototype = {

    register: function (name, intent) {
        var registry = this.registry;
        
        if (!string(name)) {
            throw new Error("Invalid intent [name] parameter.");
        }
        else if (!NAME_RE.test(name)) {
            throw new Error("Malformed intent [name] parameter: " + name);
        }

        if (!method(intent)) {
            throw new Error("Invalid [intent] Function parameter named: " +
                            name);
        }

        if (registry.exists(name)) {
            throw new Error("Invalid [intent] named: " + name +
                            " already exist");
        }

        registry.set(name, promiseGuard(intent));

        return this;
    },

    exists: function (name) {
        return this.registry.exists(name);
    },

    get: function (name) {
        var registry = this.registry;
        return registry.exists(name) ? registry.get(name) : null;
    },

    run: function (name, value) {
        var registry = this.registry;

        return registry.exists(name) ? registry.get(name)(value) : void(0);
    }
};

export { Intent };
