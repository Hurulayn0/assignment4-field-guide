// Name: Huriye Kayadelen; Student number: 2200005795
// Bonus 2: deliberate experiments with iterators, defaults and object rest.
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

const defaults = []
function fallback(label, value) { defaults.push(label); return value }
const [pots = fallback('pots', 3), capacity = fallback('capacity', pots * 2),
  explicitNull = fallback('null', 9), zero = fallback('zero', 9)] = [undefined, undefined, null, 0]
console.log('D2 evaluation:', pots, capacity, explicitNull, zero, JSON.stringify(defaults))

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
const targets = { east: 'basil', west: 'mint' }
;[targets.east, targets.west] = [targets.west, targets.east]
console.log('D4 targets:', JSON.stringify(targets))
try { throw new Error('B2 needs water') }
catch ({ message }) { console.log('D4 catch:', message) }
