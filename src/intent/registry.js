'use strict';

import {
            string,
            method,
            createRegistry
        } from "libcore";


const REGISTRY = createRegistry(),
    NAME_RE = /[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/;


export
    function register(name, intent) {
        var registry = REGISTRY;

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

        registry.set(name, intent);

    }


export
    function exists(name) {
        return REGISTRY.exists(name);
    }

export
    function get(name) {
        var registry = REGISTRY;
        return registry.exists(name) ? registry.get(name) : null;
    }
    