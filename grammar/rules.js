'use strict';

module.exports = [

// Lexical Grammars
        

    // keywords
    "this",             [/this/],
    "boolean",          [
                            /true/,
                            /false/
                        ],
    "null",             [/null/],
    "undefined",        [/undefined/],

    "new",              [/new/],
    "delete",           [/delete/],
    "typeof",           [/typeof/],
    

// transformer
    "transform",        [
                            /\-\>/,
                            /\|\>/,
                            /then/
                        ],

// arithmetic operators
    "++",               [/\+\+/],
    "--",               [/\-\-/],
    "**",               [/\*\*/],

    "+",                [/\+/],
    "-",                [/\-/],
    "%",                [/\%/],
    "*",                [/\*/],
    "/",                [/\//],

// object access
    ".",                [/\./],

// comparison
    "instanceof",       [/instanceof/],
    "and",              [/and/],
    "or",               [/or/],
    "in",               [/in/],

    "gt",               [/gt/],
    "gte",              [/gte/],

    "lt",               [/lt/],
    "lte",              [/lte/],

    ">=",               [/\>=/],
    "<=",               [/<=/],

    ">",                [/\>/],
    "<",                [/</],

// logical
    

    "&&",               [/\&\&/],
    "||",               [/\|\|/],
    "!",                [/!/],


    "?",                [/\?/],
    ":",                [/\:/],

// equality
    "==",               [/==/],
    "!=",               [/!=/],
    "===",              [/===/],
    "!==",              [/!==/],

//  assignment
    "=",                [/=/],
    "**=",              [/\*\*=/],
    "*=",               [/\*=/],
    "/=",               [/\/=/],
    "%=",               [/\%=/],
    "+=",               [/\+=/],
    "-=",               [/\-=/],

// literals
    "string",           [
                            /\"(\\\"|[^\"])*\"/,
                            /\'(\\\'|[^\'])*\'/
                        ],

    "decimal",          [
                            /[0-9]+/,
                            /\.[0-9]+/,
                            /[0-9]+\.[0-9]+/,

                            // with exponent
                            /[0-9]+[eE][\+\-]?[0-9]+/,
                            /\.[0-9]+[eE][\+\-]?[0-9]+/,
                            /[0-9]+\.[0-9]+[eE][\+\-]?[0-9]+/
                        ],

    "hex",              [/[\+\-]?0[xX][0-9a-fA-F]+/],
    "octal",            [/[\+\-]?0[oO][0-7]+/],
                        
    "binary",           [/[\+\-]?0[bB][01]+/],

    "jsonpath",        [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],

// enclosures
    "[",                [/\[/],
    "]",                [/\]/],
    "{",                [/\{/],
    "}",                [/\}/],
    "(",                [/\(/],
    ")",                [/\)/],
    ",",                [/\,/],

    "comment",          [
                            /\/\/[^ \n]*/,
                            /\#[^ \n]*/
                        ],

    "white_space",      [
                            /[ \r\n\t]+/
                        ],
    
        
    "void(",            [/void\(/],

    "intent",           [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/],

// last priority
    "identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],

    

// Root Expression
    "Joqx",             [
                            "Transform",
                            ["intent", "Transform"]
                        ],
    
// Number
    "Number",           [
                            "decimal",
                            "hex",
                            "octal"
                        ],

// Group
    "Group",            [
                            ["(", "Assignment", ")"]
                        ],

// Array
    "Array",            [
                            ["[", "]"],
                            ["[", "Elements", "]"]
                        ],

    "Elements",         [
                            "Assignment",
                            ["Elements", ",", "Assignment"],
                        ],

// Object
    "Object",           [
                            ["{", "}"],
                            ["{", "Properties", "}"]
                        ],

    "Properties",       [
                            "Property",
                            ["Properties", ",", "Property"]
                        ],

    "Property",         [
                            ["identifier", ":", "Assignment"],
                            ["string", ":", "Assignment"],
                            ["Number", ":", "Assignment"]
                        ],

// Function Call
    "Arguments",        [
                            ["(", ")"],
                            ["(", "ArgumentList", ")"]
                        ],

    "ArgumentList",     [
                            "Assignment",
                            ["ArgumentList", ",", "Assignment"]
                        ],

    "Delete",           [
                            ["delete", "Updatable"]
                        ],

    "Void",             [
                            ["void(", "Javascript", ")"]
                        ],

// Function Call
    "Literal",          [
                            "this",
                            "boolean",
                            "null",
                            "undefined",
                            "string",
                            "Number",
                            "jsonpath"
                        ],
    
    "Primary",          [
                            "Literal",
                        
                            "Array",
                            "Object",
                            "Void",
                            "Group",
                            ["Updatable", "Arguments"],
                            ["new", "Updatable"]
                        ],

    "Updatable",        [
                            "Primary",
                            "identifier",
                            ["Updatable", ".", "identifier"],
                            ["Updatable", "[", "Assignment", "]"]
                        ],

    

    "PostFix",          [
                            "Updatable",
                            ["Updatable", "++"],
                            ["Updatable", "--"]
                        ],

    "Unary",            [
                            
                            "PostFix",
                            ["++", "Updatable"],
                            ["--", "Updatable"],
                            ["+",  "Number"],
                            ["-", "Number"],
                            ["typeof", "Unary"],
                            ["!", "Unary"]
                        ],

    "Exponential",      [
                            "Unary",
                            ["Exponential", "**", "Unary"]
                        ],

    "Multiplicative",   [
                            "Exponential",
                            ["Multiplicative", "*", "Exponential"],
                            ["Multiplicative", "/", "Exponential"],
                            ["Multiplicative", "%", "Exponential"]
                        ],

    "Additive",         [
                            "Multiplicative",
                            ["Additive", "-", "Multiplicative"],
                            ["Additive", "+", "Multiplicative"]
                        ],

    "Relational",       [
                            "Additive",

                            ["Relational", "<", "Additive"],
                            ["Relational", "lt", "Additive"],

                            ["Relational", ">", "Additive"],
                            ["Relational", "gt", "Additive"],

                            ["Relational", "<=", "Additive"],
                            ["Relational", "lte", "Additive"],

                            ["Relational", ">=", "Additive"],
                            ["Relational", "gte", "Additive"],

                            ["Relational", "instanceof", "Additive"],
                            ["Relational", "in", "Additive"]
                        ],

    "Equality",         [
                            "Relational",

                            ["Equality", "==", "Relational"],
                            ["Equality", "!=", "Relational"],
                            ["Equality", "===", "Relational"],
                            ["Equality", "!==", "Relational"]
                            
                        ],

    "LogicalAnd",       [
                            "Equality",
                            ["LogicalAnd", "&&", "Equality"],
                            ["LogicalAnd", "and", "Equality"]
                        ],

    "LogicalOr",        [
                            "LogicalAnd",
                            ["LogicalOr", "||", "LogicalAnd"],
                            ["LogicalOr", "or", "LogicalAnd"]
                        ],
// Ternary
    "Conditional",      [
                            "LogicalOr",
                            ["LogicalOr", "?", "Assignment", ":", "Assignment"]
                        ],


    "Assignment",       [
                            "Conditional",
                            ["Updatable", "=", "Assignment"],
                            ["Updatable", "**=", "Assignment"],
                            ["Updatable", "*=", "Assignment"],
                            ["Updatable", "/=", "Assignment"],
                            ["Updatable", "%=", "Assignment"],
                            ["Updatable", "+=", "Assignment"],
                            ["Updatable", "-=", "Assignment"]
                        ],

    "Javascript",       [
                            "Assignment",
                            "Delete"
                        ],

// Transform Redirection
    "Namespace",        [
                            "identifier",
                            ["Namespace", ".", "identifier"]
                        ],

    "Transformer",      [
                            "Namespace",
                            ["Namespace", "Arguments"]
                        ],

    "Transform",        [
                            "Javascript",
                            ["Transform", "transform", "Transformer"]
                        ]
];