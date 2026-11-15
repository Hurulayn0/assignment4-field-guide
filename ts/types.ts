// Name: Huriye Kayadelen; Student number: 2200005795
// T1: string is a binding name, not a type annotation.
const source = { a: 'basil' }
const { a: string } = source
const { a }: { a: string } = source
console.log('T1:', string, a)
// T2: tuple return and readonly literal tuple.
function tray(): [number, string] { return [12, 'basil'] }
const [cells, crop] = tray()
const fixed = [4, 'mint'] as const
const [count, herb] = fixed
console.log('T2:', cells, crop, count, herb)
// T3: first is string | undefined; fallback is string.
const pots: string[] = []
const [first] = pots
const [fallback = 'empty'] = pots
console.log('T3:', first, fallback, first === undefined ? 'no pot' : first.toUpperCase())
// T4: before: string | null | undefined; after: string | null.
type Options = { label?: string | null }
const options: Options = { label: null }
const { label: before } = options
const { label: after = 'unlabelled' } = options
const { label: missing = 'unlabelled' }: Options = {}
console.log('T4:', before, after, missing)
// T5: deliberate experiment; capture actual diagnostic without suppression separately.
const reading: { liters: number } = { liters: 2 }
// @ts-expect-error TS2339: misspelled property (actual diagnostic saved separately).
const { litres } = reading
const { liters } = reading
console.log('T5:', litres, liters)
