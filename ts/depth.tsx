// Name: Huriye Kayadelen; Student number: 2200005795
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
