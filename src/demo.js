'use strict';

import { iterator } from "./index.js";

var p;

iterator.set("?buang test ?");

p = iterator.next();

for (; p; p = iterator.next()) {
    console.log(p.name, p.value);
}





