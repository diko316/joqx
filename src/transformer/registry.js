'use strict';

import {
            string,
            method,
            createRegistry
        } from "libcore";


const REGISTRY = createRegistry(),
    NAME_RE = /[a-zA-Z\_\$][a-zA-Z0-9\_\$]*(\.[a-zA-Z\_\$][a-zA-Z0-9\_\$]*)*/;


export
    function register(name, transformer) {
        var registry = REGISTRY;

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

        registry.set(name, transformer);

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
    