'use strict';

import { iterator } from "./index.js";

var p;

//iterator.set("buang = new Diko(1 + 3).property");

iterator.set("1 + - 3");

p = iterator.next();

for (; p; p = iterator.next()) {
    console.log(p.name, p.value);
}





