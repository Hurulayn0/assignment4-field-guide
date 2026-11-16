Name: Huriye Kayadelen
Student number: 2200005795

# Destructuring Field Guide

This guide covers the twelve JavaScript and strict TypeScript forms, five pitfalls, T1-T5 and React P1-P7. The examples use a balcony garden theme. Depth experiments are also implemented; real-code analysis and the LaTeX guide are the next stages.

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

## Props and children - Day 2

Both props files run P1-P7 using renderToStaticMarkup. The snippets below are from ts/props.tsx; js/props.jsx uses the same components without annotations. Shared types/imports:

```tsx
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
type CardProps = { title: string; children?: ReactNode }
```

### P1

```tsx
function CardA(props: CardProps) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }: CardProps) { return <section><h2>{title}</h2>{children}</section> }
```

A component gets one props object. CardA reads its properties directly; CardB binds the same properties in its parameter. That combines form 5 (named properties) with form 11 (parameter patterns). Neither version changes what React receives.

Real output (the JS and TS runs agree):

```text
P1 A: <section><h2>Balcony</h2>basil</section>
P1 B: <section><h2>Balcony</h2>basil</section>
```

### P2

```tsx
<CardB title="Balcony">mint</CardB>
<CardB title="Balcony" children="mint" />
```

The content between tags becomes the children property. These two calls render the same HTML. Missing children is allowed and renders nothing; it is not a second argument to the component.

Real output (the JS and TS runs agree):

```text
P2 content: <section><h2>Balcony</h2>mint</section>
P2 attribute: <section><h2>Balcony</h2>mint</section>
```

### P3

```tsx
const cases: [string, ReactNode][] = [
  ['string', 'basil'], ['number', 3], ['element', <b>mint</b>],
  ['elements', [<b key="b">basil</b>, <i key="m">mint</i>]],
  ['undefined', undefined], ['null', null], ['false', false]
]
for (const [name, child] of cases) console.log('P3 ' + name + ':', renderToStaticMarkup(<section>{child}</section>))
function RenderCrop({ children }: { children: (crop: string) => ReactNode }) {
  return <section>{children('mint')}</section>
}
<RenderCrop>{crop => <b>{crop}</b>}</RenderCrop>
```

Strings and numbers render as text; elements render as HTML. Several elements retain their order. undefined, null and false leave no visible content. A function is not an ordinary ReactNode: passing it directly warns and leaves the section empty. RenderCrop instead accepts a function in its own explicit type and calls it with mint. The returned element is what React renders. The direct function and object failures are deliberate experiments in the JS helper invalidChildren(), also called by the TS run, so TS needs no suppression or unsafe cast.

Real output (the JS and TS runs agree):

```text
P3 string: <section>basil</section>
P3 number: <section>3</section>
P3 element: <section><b>mint</b></section>
P3 elements: <section><b>basil</b><i>mint</i></section>
P3 undefined: <section></section>
P3 null: <section></section>
P3 false: <section></section>
P3 function: <section></section>
P3 object deliberate experiment: Error: Objects are not valid as a React child (found: object with keys {crop}). If you meant to render a collection of children, use an array instead.
P3 render prop: <section><b>mint</b></section>
```

The JS probe really passes `<section>{grow}</section>` where `grow = () => <b>mint</b>`, and `<section>{{ crop: 'mint' }}</section>`. The console capture forwards the original React arguments to console.log, so the raw `%s` placeholders and following substitution arguments are preserved:

```text
React warning: Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it. grow grow
```

### P4

```tsx
function Frame({ title, children, ...rest }: CardProps & ComponentProps<'section'>) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
const dom: ComponentProps<'section'> = { id: 'bed-B2', className: 'from-spread' }
<Frame title="Water" {...dom}>2 L</Frame>
<section {...dom} className="explicit">basil</section>
<section className="explicit" {...dom}>basil</section>
```

Rest collects all properties except title and children. Spreading rest forwards id and className onto the section, while children remains body content and title becomes a heading. React writes className as class in HTML. When values conflict, the later property wins. The TS DOM type makes className optional: it describes a normal forwarding component.

Real output (the JS and TS runs agree):

```text
P4 rest: <section id="bed-B2" class="from-spread"><h2>Water</h2>2 L</section>
P4 explicit last: <section id="bed-B2" class="explicit">basil</section>
P4 spread last: <section class="from-spread" id="bed-B2">basil</section>
```

### P5

```tsx
function Slots({ header, footer, children }: PropsWithChildren<{ header: ReactNode; footer: ReactNode }>) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Flow({ children }: PropsWithChildren) { return <article>{children}</article> }
<Slots header={<h2>Water</h2>} footer={<small>Evening</small>}><p>2 L</p></Slots>
<Flow><header><h2>Water</h2></header><main><p>2 L</p></main><footer><small>Evening</small></footer></Flow>
```

Slots fixes the header/body/footer structure and names the roles. I would choose it for a consistent watering card whose callers supply content but not layout. Flow leaves structure and order to the caller; I would choose it for a flexible garden journal with mixed sections. They can render identical HTML here, but Flow does not enforce the slot layout.

Real output (the JS and TS runs agree):

```text
P5 slots: <article><header><h2>Water</h2></header><main><p>2 L</p></main><footer><small>Evening</small></footer></article>
P5 children: <article><header><h2>Water</h2></header><main><p>2 L</p></main><footer><small>Evening</small></footer></article>
```

### P6

```tsx
function DefaultCard({ title = 'Balcony', children }: { title?: string | null; children?: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>
}
<DefaultCard />
<DefaultCard title={undefined} />
<DefaultCard title={null} />
```

This is the form 7 default inside a form 11 parameter. A missing title and an explicit undefined both use Balcony. Null is an explicit value and does not activate the default; React renders it as no heading content. An empty string would also stay empty. A field default does not protect destructuring an entire null props object.

Real output (the JS and TS runs agree):

```text
P6 missing: <section><h2>Balcony</h2></section>
P6 undefined: <section><h2>Balcony</h2></section>
P6 null: <section><h2></h2></section>
```

### P7

```tsx
function GardenButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
<CardB title="Seeds">{3}</CardB>
<Flow />
<GardenButton type="button" disabled>Water</GardenButton>
```

children?: ReactNode permits missing children, text, numbers, elements, arrays of nodes and empty values such as null/false. It rejects a function or an arbitrary object. PropsWithChildren<P> adds optional ReactNode children to P; it does not make other required props optional and does not turn a function into a node. ComponentProps<'button'> reuses React button props, including children, type, disabled and event types. It rejects href (an anchor prop) and disabled="yes". Runtime rendering alone does not check these types: tsx executes, while tsc checks. The deliberate rejected examples were each compiled separately in disposable files and removed; exact sources, exit codes and diagnostics are in logs/compiler-diagnostics.txt.

Real output (the JS and TS runs agree):

```text
P7 ReactNode: <section><h2>Seeds</h2>3</section>
P7 PropsWithChildren: <article></article>
P7 button: <button type="button" disabled="">Water</button>
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

| P7: children | React decides runtime rendering | ReactNode | TS2322: Type '() => string' is not assignable to type 'ReactNode'. |
| P7: DOM forwarding | Props spread in order | `ComponentProps<'button'>` | TS2322: Type 'string' is not assignable to type 'boolean \| undefined'. |

## Bonus 2: Depth

These experiments investigate iteration, evaluation order, copying and type inference. Predictions were recorded before execution in experiments.md. They run with npm run all.

### D1: An array pattern asks for an iterator

```js
const [letter, ...letters] = 'mint'
const [crop, ...otherCrops] = new Set(['basil', 'mint', 'basil', 'sage'])
const [[bed, liters]] = new Map([['B2', 2], ['C1', 3]])
console.log('D1 iterables:', letter, letters.join(''), '|', crop, JSON.stringify(otherCrops), '|', bed, liters)
const events = []
function* harvest() {
  try { events.push('start'); yield 'basil'; events.push('second'); yield 'mint' }
  finally { events.push('closed') }
}
const [firstCrop] = harvest()
console.log('D1 early close:', firstCrop, JSON.stringify(events))
try { const [first] = { 0: 'basil', length: 1 }; console.log(first) }
catch (error) { console.log('D1 deliberate experiment:', error.name + ': ' + error.message) }
```

```text
D1 iterables: m int | basil ["mint","sage"] | B2 2
D1 early close: basil ["start","closed"]
D1 deliberate experiment: TypeError: {(intermediate value)(intermediate value)} is not iterable
```

A string yields characters, a Set yields unique entries in insertion order, and a Map yields key/value pairs. The nested Map pattern takes the first entry apart. The generator trace contains start and closed but not second: taking one item closes the unfinished iterator and runs finally. A numeric property plus length does not make an object iterable; the deliberate array-like experiment throws. This matters for generators holding resources: a short pattern can end iteration early. Array rest would consume the remaining iterator instead.

### D2: A default is evaluated only when needed

```js
const defaults = []
function fallback(label, value) { defaults.push(label); return value }
const [pots = fallback('pots', 3), capacity = fallback('capacity', pots * 2),
  explicitNull = fallback('null', 9), zero = fallback('zero', 9)] = [undefined, undefined, null, 0]
console.log('D2 evaluation:', pots, capacity, explicitNull, zero, JSON.stringify(defaults))
```

```text
D2 evaluation: 3 6 null 0 ["pots","capacity"]
```

The pots fallback runs first. The capacity fallback can then read pots and calculates six. Null and zero are present values, so their fallback calls never execute. The trace records only pots and capacity. I would avoid expensive or state-changing defaults unless this order is intentional; the same pattern can do different work depending on the incoming values.

### D3: Object rest copies values, not descriptors

```js
const tag = Symbol('tag')
let reads = 0
const record = Object.create({ inherited: 'not copied' })
Object.defineProperties(record, {
  id: { value: 'B2', enumerable: true },
  crop: { get() { reads++; return 'basil' }, enumerable: true },
  sensor: { value: { moisture: 34 }, enumerable: true },
  hidden: { value: 'not copied', enumerable: false },
  [tag]: { value: 'outdoor', enumerable: true }
})
const { id, ...rest } = record
rest.sensor.moisture = 10
console.log('D3 rest:', id, JSON.stringify(Reflect.ownKeys(rest).map(String)), reads,
  rest[tag], 'hidden' in rest, 'inherited' in rest, record.sensor.moisture)
```

```text
D3 rest: B2 ["crop","sensor","Symbol(tag)"] 1 outdoor false false 10
```

The own enumerable crop, sensor and symbol properties are copied; id is excluded by the pattern. Inherited and non-enumerable properties are absent. The crop getter runs once when rest reads its value, and rest receives a data property rather than the getter itself. JSON alone would hide symbol keys, so Reflect.ownKeys is used to inspect the result. The sensor is still shared: mutating the rest sensor changes the original reading to 10.

### D4: Destructuring can assign to properties and catch bindings

```js
const targets = { east: 'basil', west: 'mint' }
;[targets.east, targets.west] = [targets.west, targets.east]
console.log('D4 targets:', JSON.stringify(targets))
try { throw new Error('B2 needs water') }
catch ({ message }) { console.log('D4 catch:', message) }
```

```text
D4 targets: {"east":"mint","west":"basil"}
D4 catch: B2 needs water
```

The right-hand array is evaluated before either target is assigned, so the two existing object properties swap safely. There are no new east/west local variables. The catch parameter reads message from the thrown Error. This is convenient for a known object, but destructuring an arbitrary thrown null value would itself fail; a defensive TypeScript catch normally narrows unknown before reading message.

### D5: Pulling apart types and generic component props

```tsx
import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
// Bonus 2: destructuring types, not runtime values.
type First<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never
type Rest<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : []
function watering(crop: string, liters: number) { return crop + ': ' + liters + ' L' }
type WateringArguments = Parameters<typeof watering>
const head: First<readonly [string, number]> = 'basil'
const tail: Rest<readonly [string, number]> = [2]
const args: WateringArguments = [head, tail[0]]
console.log('D5 types:', head, JSON.stringify(tail), watering(...args))
function CropList<T>({ items, renderItem }: { items: readonly T[]; renderItem: (item: T) => ReactNode }) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>
}
console.log('D5 generic props:', renderToStaticMarkup(
  <CropList items={[{ crop: 'basil', liters: 2 }]} renderItem={({ crop, liters }) => <b>{crop}: {liters} L</b>} />
))
```

```text
D5 types: basil [2] basil: 2 L
D5 generic props: <ul><li><b>basil: 2 L</b></li></ul>
```

First extracts the head of a nonempty readonly tuple; Rest infers the remaining tuple. They operate only during type checking. First<[]> becomes never and Rest<[]> becomes [], rather than inventing a runtime value. Parameters<typeof watering> produces [crop: string, liters: number]. Spreading that tuple supplies the original function arguments. CropList infers the item object type from items; its renderItem parameter destructures crop and liters with that inferred type. The generic type connects the data to the rendering callback without an unsafe cast.

References: [ECMAScript destructuring assignment and iterator closing](https://tc39.es/ecma262/2024/multipage/ecmascript-language-expressions.html#sec-destructuring-assignment), [TypeScript conditional types and infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html), and [Parameters utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype). The iterator and conditional-type explanations above follow these references; the output is from the local runs.

## Repository and remaining work

Public repository: [assignment4-field-guide](https://github.com/Hurulayn0/assignment4-field-guide).

The core destructuring and React examples are implemented and locally verified. Depth experiments are verified. Real-code analysis and the LaTeX/PDF guide are the remaining stages. Bonus 4 will be assessed against the actual dated history and public access.

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

8. A direct function child produced the exact React warning in P3 and no visible content. The render-prop component called its function and rendered mint. The deliberately invalid object child threw a caught Error.
9. All five P7 misuse cases failed strict checks as predicted. Exact messages are recorded in logs/compiler-diagnostics.txt.

10. The generator closed after one value and ran finally, while the array-like object was rejected. Object rest copied a symbol key that JSON.stringify would not reveal; Reflect.ownKeys made it visible. Only the two undefined positions called the D2 fallback.
