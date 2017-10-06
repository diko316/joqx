'use strict';

module.exports = [



// Root
    "Joqx",             [
                            [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/, "Expression", /\?/]
                        ],


// Lexical Grammar
    "Identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],
    
    "String",           [
                            /\"(\\\"|[^\"])*\"/,
                            /\'(\\\'|[^\'])*\'/
                        ],

    "Number",           [/[\+\-]?[0-9]*\.?[0-9]+/],

    "Null",             [/null/],

    "Undefined",        [/undefined/],

    "Boolean",          [/true|false/],

    "JsonPath",         [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],


// Expression
    "Expression",       [
                            "Assignment"
                        ],

    "Primary",          [
                            /this/,
                            "Null",
                            "Undefined",
                            "Boolean",
                            "Number",
                            "String",
                            "Identifier",
                            "Array",
                            "Object",
                            //"Call",
                            "Group"
                        ],

    "Group",            [
                            [/\(/, "Expression", /\)/]
                        ],

// Array
    "Array",            [
                            [/\[/, /\]/],
                            [/\[/, "Elements", /\]/]
                        ],

    "Elements",         [
                            "Assignment",
                            ["Elements", /\,/, "Assignment"],
                            
                        ],
// Object
    "Object",           [
                            [/\{/, /\}/],
                            [/\{/, "Properties", /\}/]
                        ],

    "Properties",       [
                            "Property",
                            ["Properies", /\,/, "Property"]
                            
                        ],

    "Property",         [
                            ["Identifier", /\:/, "Assignment"],
                            ["String", /\:/, "Assignment"],
                            ["Number", /\:/, "Assignment"]

                        ],

// Call
    "Call",             [
                            ["Primary", "Arguments"]
                        ],

    "Arguments",        [
                            [/\(/, /\)/],
                            [/\(/, "ArgumentList", /\)/]
                        ],

    "ArgumentList",     [
                            "Expression",
                            ["ArgumentList", /\,/, "Assignment"]
                        ],


// Member
    "Member",           [
                            "Primary",
                            ["Member", "MemberAccess"]
                        ],

    "MemberAccess",     [
                            [/\./, "Identifier"],
                            [/\[/, "Expression", /\]/]
                        ],

    "Typeof",           [
                            [/typeof/, "Member"],
                        ],

    "Delete",           [
                            [/delete/, "Member"],
                        ],

    "Not",              [
                            [/!/, "Member"]
                        ],
    

// Unary
    "Unary",            [
                            "Member",
                            "Typeof",
                            "Delete",
                            "Not",

                            
                            [/void\(/, "Expression", /\)/]
                            
                            // [/delete/, "Unary"],
                            //[/void\(/, "Unary", /\)/],
                            // 
                        ],

    // "Exponential",      [
    //                         "Unary",
    //                         ["Exponential", /\*\*/, "Unary"]
    //                     ],

    // "Multiplicative",   [
    //                         "Exponential",
    //                         ["Multiplicative", /\*/, "Exponential"],
    //                         ["Multiplicative", /\//, "Exponential"],
    //                         ["Multiplicative", /\%/, "Exponential"]
    //                     ],

    // "Additive",         [
    //                         "Multiplicative",
    //                         ["Additive", /\-/, "Multiplicative"],
    //                         ["Additive", /\+/, "Multiplicative"]
    //                     ],

    // "Relational",       [
    //                         "Additive",

    //                         ["Relational", /</, "Additive"],
    //                         ["Relational", /lt/, "Additive"],

    //                         ["Relational", /\>/, "Additive"],
    //                         ["Relational", /gt/, "Additive"],

    //                         ["Relational", /<\=/, "Additive"],
    //                         ["Relational", /lte/, "Additive"],

    //                         ["Relational", /\>\=/, "Additive"],
    //                         ["Relational", /gte/, "Additive"],

    //                         ["Relational", /instanceof/, "Additive"],
    //                         ["Relational", /in/, "Additive"]
    //                     ],

    // "Equality",         [
    //                         "Relational",

    //                         ["Equality", /\=\=/, "Relational"],
    //                         ["Equality", /!\=/, "Relational"],
    //                         ["Equality", /\=\=\=/, "Relational"],
    //                         ["Equality", /!\=\=/, "Relational"]
                            
    //                     ],

    // "LogicalAnd",       [
    //                         "Equality",
    //                         ["LogicalAnd", /\&\&/, "Equality"],
    //                         ["LogicalAnd", /and/, "Equality"]
    //                     ],

    // "LogicalOr",        [
    //                         "LogicalAnd",
    //                         ["LogicalOr", /\|\|/, "LogicalAnd"],
    //                         ["LogicalOr", /or/, "LogicalAnd"]

    //                     ],

    // "Conditional",      [
    //                         "LogicalOr",
    //                         ["LogicalOr", /\?/, "Assignment", /\:/, "Assignment"]
    //                     ],

// Assignment


    "Assignment",       [
                            ["Unary", /\=/, "Assignment"],
                            "Unary"
                        ]
];