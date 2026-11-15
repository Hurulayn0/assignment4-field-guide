// Name: Huriye Kayadelen; Student number: 2200005795
type Watering = { liters?: number; crop?: string }
function watering({ liters = 1, crop = 'seedlings' }: Watering = {}) { return crop + ': ' + liters + ' L' }
console.log('form 11:', watering(), '|', watering({ crop: 'basil', liters: 2 }))
// Form 11b: array parameter requested by starter.
function area([rows, columns]: [number, number]) { return rows * columns }
console.log('form 11b:', area([3, 4]))
const weekly: Record<string, number> = { Mon: 2, Thu: 3 }
for (const [day, liters] of Object.entries(weekly)) console.log('form 12 object:', day, liters)
const pots = new Map<string, number>([['B2', 4], ['C1', 2]])
for (const [bed, count] of pots) console.log('form 12 Map:', bed, count)
