'use strict';


import Parser from "libcore-parser-lalr";


import data from "./states.json";

export
    const   parser = Parser.load(data),
            iterator = parser.iterator();

export default iterator;

