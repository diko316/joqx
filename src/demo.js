'use strict';

import { iterator } from "./index.js";

var p;

iterator.set("?buang yes = buang ? 1 : 2 ?");

p = iterator.next();

for (; p; p = iterator.next()) {
    console.log(p.name, p.value);
}





