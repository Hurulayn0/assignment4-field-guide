// Name: Huriye Kayadelen; Student number: 2200005795
type Bed = { id: string; crop: string; liters: number; sensor: { moisture: number }; days: string[] }
type Water = { liters?: number | null }
const bed: Bed = { id: 'B2', crop: 'basil', liters: 2, sensor: { moisture: 34 }, days: ['Mon', 'Thu'] }
const { crop, liters } = bed
console.log('form 5:', crop, liters)
const { crop: label } = bed
console.log('form 6:', label)
const { liters: missing = 1 } = {} as Water
const { liters: unset = 1 } = { liters: undefined } as Water
const { liters: explicitNull = 1 } = { liters: null } as Water
console.log('form 7:', missing, unset, explicitNull)
const { id, ...details } = bed
console.log('form 8:', id, JSON.stringify(details))
const { sensor: { moisture }, days: [firstDay] } = bed
console.log('form 9:', moisture, firstDay)
const key: keyof Bed = 'liters'
const { [key]: selected } = bed
console.log('form 10:', key, selected)
