// Name: Huriye Kayadelen; Student number: 2200005795
// Deliberate experiments: expected failures are caught.
for (const source of [undefined, null]) {
 try { const { liters } = source; console.log(liters) }
 catch (error) { console.log('pitfall 1:', String(source), error.name + ': ' + error.message) }
}
for (const source of [{}, { liters: undefined }, { liters: null }]) {
 const { liters = 1 } = source
 console.log('pitfall 2:', String(source.liters), liters)
}
try { new Function('{ liters } = { liters: 2 }')() }
catch (error) { console.log('pitfall 3:', error.name + ': ' + error.message) }
let liters
;({ liters } = { liters: 2 })
console.log('pitfall 3 fixed:', liters)
const bed = { sensor: { moisture: 34 }, crop: 'basil' }
const { sensor, ...rest } = bed
sensor.moisture = 10
console.log('pitfall 4:', bed.sensor.moisture, sensor === bed.sensor, JSON.stringify(rest))
const { crop, amount } = { amount: 2, crop: 'basil' }
const [first, second] = [2, 'basil']
console.log('pitfall 5:', crop, amount, '|', first, second)
