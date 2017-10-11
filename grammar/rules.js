'use strict';

module.exports = [

// Lexical Grammars

// keywords
    "this",             [/this/],
    "boolean",          [/true/, /false/],
    "null",             [/null/],
    "undefined",        [/undefined/],

// transformer
    "transform",        [/\-\>/],

// arithmetic operators
    "+",                [/\+/],
    "-",                [/\-/],
    "%",                [/\%/],
    "*",                [/\*/],
    "/",                [/\//],

    "++",               [/\+\+/],
    "--",               [/\-\-/],
    "**",               [/\*\*/],

// object
    "new",              [/new/],
    "delete",           [/delete/],
    "typeof",           [/typeof/],

    ".",                [/\./],

// comparison
    "gt",               [/gt/],
    "gte",              [/gte/],

    "lt",               [/lt/],
    "lte",              [/lte/],

    ">=",               [/\>=/],
    ">",                [/\>/],

    "<=",               [/<=/],
    "<",                [/</],

// logical
    "instanceof",       [/instanceof/],
    "and",              [/and/],
    "or",               [/or/],
    "in",               [/in/],

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

    "json_path",        [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],

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

    "identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],

// Root Expression
    "Joqx",             [
                            "Transform",
                            ["intent", "Transform"],
                        ],
    
// Number
    "Number",           [
                            "decimal",
                            "hex",
                            "octal"
                        ],

// Group
    "Group",            [
                            ["(", "Javascript", ")"]
                        ],

// Array
    "Array",            [
                            ["[", "]"],
                            ["[", "Elements", "]"]
                        ],

    "Elements",         [
                            "Javascript",
                            ["Elements", ",", "Javascript"],
                        ],

// Object
    "Object",           [
                            ["{", "}"],
                            ["{", "Properties", "}"]
                        ],

    "Properties",       [
                            "Property",
                            ["Properies", ",", "Property"]
                        ],

    "Property",         [
                            ["identifier", ":", "Javascript"],
                            ["string", ":", "Javascript"],
                            ["Number", ":", "Javascript"]
                        ],

// Function Call
    "Arguments",        [
                            ["(", ")"],
                            ["(", "ArgumentList", ")"]
                        ],

    "ArgumentList",     [
                            "Javascript",
                            ["ArgumentList", ",", "Javascript"]
                        ],

    "Delete",           [
                            ["delete", "Updatable"]
                        ],

    "Void",             [
                            ["void(", "Javascript", ")"]
                        ],
// Literal
   
    "Literal",          [
                            "this",
                            "boolean",
                            "null",
                            "undefined",
                            "string",

                            "Number",
                            "Array",
                            "Object",
                            "Void",
                            "Group"
                        ],

// Object Member
    "Updatable",        [
                            "identifier",
                            ["Primary", ".", "identifier"],
                            ["Primary", "[", "Javascript", "]"]
                        ],

// Function Call
    "Call",             [
                            ["Primary", "Arguments"]
                        ],

    "Instantiate",      [
                            ["new", "Primary"],
                            ["new", "Primary", "Arguments"]
                        ],

    "Primary",          [
                            "Updatable",
                            "Literal",
                            "Instantiate",
                            "Call"
                        ],

    "PostFix",          [
                            "Primary",
                            ["Updatable", "++"],
                            ["Updatable", "--"]
                            
                        ],

    "Unary",            [
                            "PostFix",
                            ["++", "Updatable"],
                            ["--", "Updatable"],
                            ["+",  "Number"],
                            ["-", "Number"],
                            ["typeof", "Primary"],
                            ["!", "Primary"]
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
                            ["LogicalOr", "?", "Javascript", ":", "Javascript"]
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