// Name: Huriye Kayadelen; Student number: 2200005795
// Form 1: return free and planted seed-tray cells.
function traySpace(rows, columns, planted) { return [rows * columns - planted, planted] }
const [free, used] = traySpace(3, 4, 7)
console.log('form 1:', free, used)
// Form 2
const sowingOrder = ['basil', 'mint', 'thyme', 'sage']
const [, next, ...later] = sowingOrder
console.log('form 2:', next, JSON.stringify(later))
// Form 3
let morning = 'east', evening = 'west'
;[morning, evening] = [evening, morning]
console.log('form 3:', morning, evening)
// Form 4: missing, undefined, null
const [missing = 6] = []
const [unset = 6, explicitNull = 6] = [undefined, null]
console.log('form 4:', missing, unset, explicitNull)
