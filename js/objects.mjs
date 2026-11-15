// Name: Huriye Kayadelen; Student number: 2200005795

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
