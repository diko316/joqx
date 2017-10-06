'use strict';

import { iterator } from "./index.js";

var p;

iterator.set("?buang !buang ?");

p = iterator.next();

for (; p; p = iterator.next()) {
    console.log(p.name, p.value);
}





