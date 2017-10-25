'use strict';

import { createRegistry } from "libcore";

const CONFIG = createRegistry();

// defaults
CONFIG.assign({
    debug: false
});

export
    function get(name) {
        return CONFIG.get(name);
    }

export
    function set(name, value) {
        return CONFIG.set(name, value);
    }