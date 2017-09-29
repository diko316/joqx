# Expression Grammar

## Tokens

### Javascript expression

#### Literals

```text
string      ->  /\"(\\\"|[^\"])*\"/,
                /\'(\\\'|[^\'])*\'/

number      ->  /[\+\-]?[0-9]*\.?[0-9]+/

null        ->  /null/

undefined   ->  /undefined/

boolean     ->  /true|false/

```

#### Keywords

```text

typeof      ->  /typeof/

instanceof  ->  /instanceof/

new         ->  /new/

```

#### Operators

```text
property_access     ->  /\./

comma               ->  /\,/

not                 ->  /!/

or                  ->  /\|\|/

and                 ->  /&&/

ternary_condition   ->  /\?/

ternary_option      ->  /\:/

greater_than        ->  /\>/

greater_equal       ->  /\>\=/

lesser_than         ->  /\</

lesser_equal        ->  /\<\=/

equal               ->  /\=\=/

strict_equal        ->  /\=\=\=/

unequal             ->  /!\=/

strict_unequal      ->  /!\=\=/

increment           ->  /\+\+/

decrement           ->  /\-\-/

add                 ->  /\+/

subtract            ->  /\-/

multiply            ->  /\*/

divide              ->  /\//

exponential         ->  /\*\*/

modulo              ->  /\%/

assign              ->  /\=/

bracket_open        ->  /\[/

bracket_close       ->  /\]/

parenthesis_open    ->  /\(/

parenthesis_close   ->  /\)/

```

### Path expression

The path token

```text
/^\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*$/g
```