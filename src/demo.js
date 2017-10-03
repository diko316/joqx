'use strict';

import { iterator } from "./index.js";

var p;

iterator.set("?buang test[1]['daddy'] ?");

p = iterator.next();

for (; p; p = iterator.next()) {
    console.log(p.name, p.value);
}





