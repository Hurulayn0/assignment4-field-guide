Name: Huriye Kayadelen
Student number: 2200005795

# Destructuring Field Guide - Part 1

This first part covers the twelve JavaScript and strict TypeScript forms, five pitfalls, T1-T5 and an eight-row comparison table. The examples use a balcony garden theme. React props and children and the optional bonus work are planned for the next part; this is not the final submission.

## Run and scope

Node.js 20.19 or newer is required.

```sh
npm ci
npm run all
npm run check
```

strict and noUncheckedIndexedAccess stay enabled, and library checking is enabled. The single permitted T5 line uses @ts-expect-error. The deliberate compiler experiments are run separately without suppressions and their temporary sources are removed. output.txt records the actual run; logs/check.txt records the strict check.

## Field guide

JS files contain the runtime examples; corresponding TS files add tuple, object, parameter and collection types. The repeated form lines in output.txt are the real JS and TS runs. Snippets below can be run separately.

### Form 1: Values by position

**Syntax:** `const [free, used] = traySpace(3, 4, 7)`

**Example** (js/arrays.mjs; focused snippet):

```js
function traySpace(rows, columns, planted) { return [rows * columns - planted, planted] }
const [free, used] = traySpace(3, 4, 7)
console.log('form 1:', free, used)
```

**Output:**

```text
form 1: 5 7
```

**Use it when:** a tray calculation returns two related values.

**Watch out:** Position decides the name. Reversing the bindings reverses their meaning.

Plain assignment equivalent (in its own scope):

```js
const result = traySpace(3, 4, 7)
const free = result[0]
const used = result[1]
```

### Form 2: Skip and array rest

**Syntax:** `const [, next, ...later] = sowingOrder`

**Example** (js/arrays.mjs; focused snippet):

```js
const sowingOrder = ['basil', 'mint', 'thyme', 'sage']
const [, next, ...later] = sowingOrder
console.log('form 2:', next, JSON.stringify(later))
```

**Output:**

```text
form 2: mint ["thyme","sage"]
```

**Use it when:** the first sowing is done and you need the remaining queue.

**Watch out:** Rest must come last. It collects a new array, but nested values would still be shared.

Plain assignment equivalent (in its own scope):

```js
const next = sowingOrder[1]
const later = sowingOrder.slice(2)
```

### Form 3: Swap

**Syntax:** `[morning, evening] = [evening, morning]`

**Example** (js/arrays.mjs; focused snippet):

```js
let morning = 'east', evening = 'west'
;[morning, evening] = [evening, morning]
console.log('form 3:', morning, evening)
```

**Output:**

```text
form 3: west east
```

**Use it when:** two pot positions exchange roles.

**Watch out:** Use let. The leading semicolon prevents this array from joining the previous statement.

Plain assignment equivalent (in its own scope):

```js
const oldMorning = morning
morning = evening
evening = oldMorning
```

### Form 4: Array defaults

**Syntax:** `const [missing = 6] = []`

**Example** (js/arrays.mjs; focused snippet):

```js
const [missing = 6] = []
const [unset = 6, explicitNull = 6] = [undefined, null]
console.log('form 4:', missing, unset, explicitNull)
```

**Output:**

```text
form 4: 6 6 null
```

**Use it when:** a missing seed count needs a fallback.

**Watch out:** Only undefined triggers the default. Null is kept.

Plain assignment equivalent (in its own scope):

```js
const empty = []
const values = [undefined, null]
const missing = empty[0] === undefined ? 6 : empty[0]
const unset = values[0] === undefined ? 6 : values[0]
const explicitNull = values[1] === undefined ? 6 : values[1]
```

### Form 5: Properties by name

**Syntax:** `const { crop, liters } = bed`

**Example** (js/objects.mjs; focused snippet):

```js
const bed = { crop: 'basil', liters: 2 }
const { crop, liters } = bed
console.log('form 5:', crop, liters)
```

**Output:**

```text
form 5: basil 2
```

**Use it when:** a watering record has named fields.

**Watch out:** Property order does not matter. A missing property gives undefined.

Plain assignment equivalent (in its own scope):

```js
const crop = bed.crop
const liters = bed.liters
```

### Form 6: Rename

**Syntax:** `const { crop: label } = bed`

**Example** (js/objects.mjs; focused snippet):

```js
const bed = { crop: 'basil' }
const { crop: label } = bed
console.log('form 6:', label)
```

**Output:**

```text
form 6: basil
```

**Use it when:** a crop name is used as a display label.

**Watch out:** The binding is label. This pattern does not create a crop variable.

Plain assignment equivalent (in its own scope):

```js
const label = bed.crop
```

### Form 7: Object defaults

**Syntax:** `const { liters: missing = 1 } = {}`

**Example** (js/objects.mjs; focused snippet):

```js
const { liters: missing = 1 } = {}
const { liters: unset = 1 } = { liters: undefined }
const { liters: explicitNull = 1 } = { liters: null }
console.log('form 7:', missing, unset, explicitNull)
```

**Output:**

```text
form 7: 1 1 null
```

**Use it when:** an omitted watering amount should use one liter.

**Watch out:** Missing and undefined use one; null does not. The whole source must still be an object.

Plain assignment equivalent (in its own scope):

```js
const absent = {}
const undefinedField = { liters: undefined }
const nullField = { liters: null }
const missing = absent.liters === undefined ? 1 : absent.liters
const unset = undefinedField.liters === undefined ? 1 : undefinedField.liters
const explicitNull = nullField.liters === undefined ? 1 : nullField.liters
```

### Form 8: Object rest

**Syntax:** `const { id, ...details } = bed`

**Example** (js/objects.mjs; shared runnable example):

```js
const bed = { id: 'B2', crop: 'basil', liters: 2, sensor: { moisture: 34 }, days: ['Mon', 'Thu'] }
const { crop, liters } = bed
console.log('form 5:', crop, liters)
const { crop: label } = bed
console.log('form 6:', label)
const { liters: missing = 1 } = {}
const { liters: unset = 1 } = { liters: undefined }
const { liters: explicitNull = 1 } = { liters: null }
console.log('form 7:', missing, unset, explicitNull)
const { id, ...details } = bed
console.log('form 8:', id, JSON.stringify(details))
const { sensor: { moisture }, days: [firstDay] } = bed
console.log('form 9:', moisture, firstDay)
const key = 'liters'
const { [key]: selected } = bed
console.log('form 10:', key, selected)
```

**Output:**

```text
form 8: B2 {"crop":"basil","liters":2,"sensor":{"moisture":34},"days":["Mon","Thu"]}
```

**Use it when:** a public record should leave out the bed ID.

**Watch out:** Rest copies remaining own enumerable properties, shallowly.

Plain assignment equivalent (in its own scope):

```js
const id = bed.id
const details = Object.assign({}, bed)
delete details.id
```

### Form 9: Nested object and array

**Syntax:** `const { sensor: { moisture }, days: [firstDay] } = bed`

**Example** (js/objects.mjs; shared runnable example):

```js
const bed = { id: 'B2', crop: 'basil', liters: 2, sensor: { moisture: 34 }, days: ['Mon', 'Thu'] }
const { crop, liters } = bed
console.log('form 5:', crop, liters)
const { crop: label } = bed
console.log('form 6:', label)
const { liters: missing = 1 } = {}
const { liters: unset = 1 } = { liters: undefined }
const { liters: explicitNull = 1 } = { liters: null }
console.log('form 7:', missing, unset, explicitNull)
const { id, ...details } = bed
console.log('form 8:', id, JSON.stringify(details))
const { sensor: { moisture }, days: [firstDay] } = bed
console.log('form 9:', moisture, firstDay)
const key = 'liters'
const { [key]: selected } = bed
console.log('form 10:', key, selected)
```

**Output:**

```text
form 9: 34 Mon
```

**Use it when:** a sensor reading and the first watering day belong together.

**Watch out:** Missing sensor throws. An empty days array gives undefined; keep deep patterns short.

Plain assignment equivalent (in its own scope):

```js
const moisture = bed.sensor.moisture
const firstDay = bed.days[0]
```

### Form 10: Computed key

**Syntax:** `const { [key]: selected } = bed`

**Example** (js/objects.mjs; shared runnable example):

```js
const bed = { id: 'B2', crop: 'basil', liters: 2, sensor: { moisture: 34 }, days: ['Mon', 'Thu'] }
const { crop, liters } = bed
console.log('form 5:', crop, liters)
const { crop: label } = bed
console.log('form 6:', label)
const { liters: missing = 1 } = {}
const { liters: unset = 1 } = { liters: undefined }
const { liters: explicitNull = 1 } = { liters: null }
console.log('form 7:', missing, unset, explicitNull)
const { id, ...details } = bed
console.log('form 8:', id, JSON.stringify(details))
const { sensor: { moisture }, days: [firstDay] } = bed
console.log('form 9:', moisture, firstDay)
const key = 'liters'
const { [key]: selected } = bed
console.log('form 10:', key, selected)
```

**Output:**

```text
form 10: liters 2
```

**Use it when:** the selected metric is chosen by a key variable.

**Watch out:** The brackets evaluate key. In TS, keyof limits it to valid property names.

Plain assignment equivalent (in its own scope):

```js
const selected = bed[key]
```

### Form 11: Object parameter default

**Syntax:** `function watering({ liters = 1, crop = 'seedlings' } = {})`

**Example** (js/params.mjs; shared runnable example):

```js
function watering({ liters = 1, crop = 'seedlings' } = {}) { return crop + ': ' + liters + ' L' }
console.log('form 11:', watering(), '|', watering({ crop: 'basil', liters: 2 }))
// Form 11b: array parameter requested by starter.
function area([rows, columns]) { return rows * columns }
console.log('form 11b:', area([3, 4]))
const weekly = { Mon: 2, Thu: 3 }
for (const [day, liters] of Object.entries(weekly)) console.log('form 12 object:', day, liters)
const pots = new Map([['B2', 4], ['C1', 2]])
for (const [bed, count] of pots) console.log('form 12 Map:', bed, count)
```

**Output:**

```text
form 11: seedlings: 1 L | basil: 2 L
form 11b: 12
```

**Use it when:** callers may omit the whole options object or individual fields.

**Watch out:** The outer default handles omitted/undefined arguments, not null. Field defaults are a separate step. The typed version uses optional fields so {} is valid.

Plain assignment equivalent (in its own scope):

```js
function watering(options = {}) {
 const liters = options.liters === undefined ? 1 : options.liters
 const crop = options.crop === undefined ? 'seedlings' : options.crop
 return crop + ': ' + liters + ' L'
}
```

### Form 12: Entry loops

**Syntax:** `for (const [day, liters] of Object.entries(weekly))`

**Example** (js/params.mjs; shared runnable example):

```js
function watering({ liters = 1, crop = 'seedlings' } = {}) { return crop + ': ' + liters + ' L' }
console.log('form 11:', watering(), '|', watering({ crop: 'basil', liters: 2 }))
// Form 11b: array parameter requested by starter.
function area([rows, columns]) { return rows * columns }
console.log('form 11b:', area([3, 4]))
const weekly = { Mon: 2, Thu: 3 }
for (const [day, liters] of Object.entries(weekly)) console.log('form 12 object:', day, liters)
const pots = new Map([['B2', 4], ['C1', 2]])
for (const [bed, count] of pots) console.log('form 12 Map:', bed, count)
```

**Output:**

```text
form 12 object: Mon 2
form 12 object: Thu 3
form 12 Map: B2 4
form 12 Map: C1 2
```

**Use it when:** each watering day or Map entry needs a key and a value.

**Watch out:** Object.entries gives string keys. A Map preserves its key types and insertion order.

Plain assignment equivalent (in its own scope):

```js
for (const entry of Object.entries(weekly)) {
 const day = entry[0]
 const liters = entry[1]
 console.log(day, liters)
}
for (const entry of pots) {
 const bed = entry[0]
 const count = entry[1]
 console.log(bed, count)
}
```

## Rest and spread

Rest collects remaining items in a binding pattern: `const { id, ...details } = bed`. Spread expands values in an expression: `const copy = { ...bed }`. Both make shallow containers. Neither deep-copies sensor. Array rest collects after a position; object rest excludes named properties.

## Five pitfalls

All five run in js/pitfalls.mjs. The thrown errors are deliberate experiments and are caught.

### Pitfall 1

```text
pitfall 1: undefined TypeError: Cannot destructure property 'liters' of 'source' as it is undefined.
pitfall 1: null TypeError: Cannot destructure property 'liters' of 'source' as it is null.
```

Neither undefined nor null can supply properties, so destructuring throws TypeError.

### Pitfall 2

```text
pitfall 2: undefined 1
pitfall 2: undefined 1
pitfall 2: null null
```

The default is used only for undefined; the first source is missing liters, the second explicitly sets it to undefined, and null remains null.

### Pitfall 3

```text
pitfall 3: SyntaxError: Unexpected token '='
pitfall 3 fixed: 2
```

A leading brace is parsed as a block; parentheses turn the pattern into an assignment expression. The invalid code is compiled inside new Function so its SyntaxError can be caught.

### Pitfall 4

```text
pitfall 4: 10 true {"crop":"basil"}
```

The sensor binding shares the original nested object; changing it changes the original, while rest only creates a shallow outer object.

### Pitfall 5

```text
pitfall 5: basil 2 | 2 basil
```

Object bindings follow names regardless of property order, while array bindings follow positions.

## TypeScript T1-T5

Examples are in ts/types.ts. strict and noUncheckedIndexedAccess stay enabled.

### T1

In { a: string }, string is the new variable name. The correct annotation is const { a }: { a: string } = source. The two bindings both contain basil.

```text
T1: basil basil
```

### T2

tray(): [number, string] fixes the length and the type at each position. as const infers readonly [4, "mint"], keeping literal types. Readonly is a compile-time restriction; it does not freeze the runtime array.

```text
T2: 12 basil 4 mint
```

### T3

An ordinary string[] may be empty. first is string | undefined. The branch checks undefined before toUpperCase. fallback is string because its default removes undefined.

```text
T3: undefined empty no pot
```

### T4

For label?: string | null, the binding without a default has type string | null | undefined. With a default it has type string | null. The actual null remains null; the missing field becomes unlabelled.

```text
T4: null null unlabelled
```

### T5

The deliberate experiment misspells liters as litres. Removing only the suppression produced the actual diagnostic below. It was then restored on that one line. The fixed binding uses liters. The runtime experiment shows undefined for the wrong key and 2 for the corrected key. tsx runs code but does not perform the separate type check.

```text
T5: undefined 2
```

Actual diagnostic, captured in logs/t5-diagnostic.txt (expected exit 2):

```text
.compiler-experiments/t5-unsuppressed.tsx(27,9): error TS2339: Property 'litres' does not exist on type '{ liters: number; }'.
```

## JavaScript versus TypeScript

Types do not change destructuring at runtime. These are actual strict compiler diagnostics, not predicted messages. Every case was an isolated deliberate experiment. Full diagnostics and experiment sources: [logs/compiler-diagnostics.txt](logs/compiler-diagnostics.txt).

| Form | Same behavior | Type information | Observed compiler error |
| --- | --- | --- | --- |
| 1: tuple return | Positions keep their meaning | [number, string] | TS2322: Type 'number' is not assignable to type 'string'. |
| 6 / T1: rename | The name after the colon is the binding | Type after the whole pattern | TS2304: Cannot find name 'a'. |
| 7: default | Only undefined activates the default | Include null when allowed | TS18047: 'label' is possibly 'null'. |
| 9 / T3: array item | An empty array has no first item | string[] gives string \| undefined | TS18048: 'first' is possibly 'undefined'. |
| 10: computed key | The key expression selects a property | keyof typeof bed | TS2322: Type '"litres"' is not assignable to type '"liters"'. |
| 11: parameter | Properties are read from one object | Optional fields for {} defaults | TS2345: Argument of type '{}' is not assignable to parameter of type '{ liters: number; }'. |
| 12: Map loop | Entries contain key and value | Map<string, number> | TS2345: Argument of type 'string' is not assignable to parameter of type 'number'. |
| T5: missing property | A wrong key reads undefined in JS | Correct property spelling | TS2339: Property 'litres' does not exist on type '{ liters: number; }'. |

## Repository and next part

Public repository: [assignment4-field-guide](https://github.com/Hurulayn0/assignment4-field-guide).

This repository begins with the completed plain-language examples and their evidence. The next part will add runnable P1-P7 in JavaScript and TypeScript, their render output, the LaTeX/PDF guide, deeper experiments and real-code analysis. Bonus 4 is not claimed: publishing one initial commit does not meet five meaningful commits over several days.

## My own log

This assignment took a lot of my time. The points needing the most care in this part were defaults, null values, tuple positions and possibly missing array items.

The entries below record actual experiment results. Predictions were recorded before running the checks.

1. Missing values and undefined used the defaults in forms 4 and 7, while null stayed null. A default does not replace every empty-looking value.
2. Deliberate experiment: destructuring undefined and null threw TypeError. Both errors were caught; the exact messages are in the pitfalls section above and output.txt.
3. Deliberate experiment: a bare object assignment produced `SyntaxError: Unexpected token '='`. Parentheses fixed the parse, and the corrected result was 2.
4. The sensor binding remained shared. Changing its moisture value changed the original record too; rest creates only a shallow outer copy.
5. The empty typed array gave undefined. The default produced empty, and the undefined check avoided calling toUpperCase on a missing value.
6. Deliberate T5 experiment: the misspelled property produced TS2339. The wrong key gave undefined at runtime and the corrected key gave 2. The exact compiler diagnostic is in logs/t5-diagnostic.txt.
7. In T1, the variable named string contained basil. The colon inside the pattern renamed the binding; the type annotation belongs after the whole pattern.
