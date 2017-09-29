# Javasript Object Query Language

## Expression Syntax

Javasript Object Query Expression is made up of `?intent` and `expression clause`.


### 1. Intent Clause

The intention of the expression that starts with `?` followed by name characters in character class `/[a-z]+(\-[a-z]+)/`.

Examples:

```text
?call

?set

?assign
```

### 2. Expression Clause

The Expression Clause is a one line combination of Javascript expression and Javasript Object Query Language extensions.

### 2.1 Supported Javascript expressions

Acceptable Javascript expression is a one-line statement limited to the following language productions:

1. String, and Number literals

1. Keyword literals: `null`, `undefined`, `true`, and `false`

1. Object Notation: `{}`

1. Array Notation: `[]`

1. Property acessor: `.` and `[]`

1. Keyword Operators:

    1. Unary Operator: `new`, `typeof`

    1. Binary Operator: `instanceof`

1. Logical Operators

    1. Unary: `!`

    1. Binary: `||`, and `&&`

    1. Ternary: `?` with `:`

1. Comparison Operators: `<`, `<=`, `>`, `>=`, `==`, `===`, and `!==`

1. Arithmetic Operators:

    1. Unary: `++` and `--`

    1. Binary: `+`, `-`, `/`, `*`, `**`, `%`

1. Assignment Operator: `=`

1. Grouping Operator: `()`

1. Function call: `action(arguments)` and `instance.method(arguments)`

### 2.2. Expression extensions

Other than javascript expressions, there are additional operators that extends javascript intto Javasript Object Query Language.

#### 2.2.1. HTML-safe Operators

Javasript Object Query Language supports interoperability with HTML markup.

In order embed such expressions, javascript operators containing non-HTML safe characters must be escaped as HTML entities.

Since it is cumbersome to HTML escape them, those operators were converted to language constructs or keyword operators.

1. Comparison Operators

    1. `lt` - same as `<`

    1. `lte` - same as `<=`

    1. `gt` - same as `>`

    1. `gte` - same as `>=`

1. Logical Operators

    1. `and` - same as `&&`

    1. `or` - same as `||`

#### 2.2.2. Path clause `@path`

Path clause is composed of `@` operator followed by path literal in a form of:

1. `@` operator

1. `/[^\r\n\t\.\]]+/` starting path literal

1. optional trailing chainable path literals that is a combination of the following:

    1. `/\.[^\r\n\t\.\]]+/` example `start.trail`

    1. `/\[[^\]]+\]/` example `start[trail]`

    1. `/\[\"(\\\"|[^\"])+\"\]/` example `start["trail"]`

    1. `/\[\'(\\\'|[^\'])+\'\]/` example `start['trail']`

##### Getter Path clause

The path clause can be used as getter to extract deeply nested context Object property like:

```text
?call console.log(@records[0].id)

?text @currentCounter
```

##### Setter Path clause

Path clause is assignable when used with `=`, `+=`, `-=`, `*=`, `/=`, `++` or `--` operators.

It will act like setter that deeply traverses nested context Object property (filling it with object or array along the way) and assign value of Object or Array property resolved by the last trailing path literal like:

```text
?call @currentCounter = 100

?call @records[20].id = "string"

?call @records[21].likes ++

?call @records[21].likes += 25

?call -- @records[21].likes

```

#### 2.2.3. Transform Clause `then` transform

Transform Clause is a `then` keyword binary operator that calls registered `transformer` by populating the first argument with result value from the previous expression.

The syntax goes like this: `(expression) then transformer`

If we have a registered transformer named `increment` that accepts number parameter and returns the number parameter incremented by 1, then Transform Clause should look like this:

```text

?call @currentLikes then increment

```

If the registered `increment` transformer should accept number second parameter and returns the first parameter incremented by (e.g. 2) second parameter, then Transform Clause should look like this:

```text

?call @currentLikes then increment(2)

```

`then` operator can be chained to further transform the previous expression like:

```text

?text @currentLikes then increment then increment then increment

```