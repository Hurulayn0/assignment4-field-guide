// Name: Huriye Kayadelen; Student number: 2200005795
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { invalidChildren } from '../js/props.jsx'
import { pathToFileURL } from 'node:url'
type CardProps = { title: string; children?: ReactNode }

function CardA(props: CardProps) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }: CardProps) { return <section><h2>{title}</h2>{children}</section> }
function Frame({ title, children, ...rest }: CardProps & ComponentProps<'section'>) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
function Slots({ header, footer, children }: PropsWithChildren<{ header: ReactNode; footer: ReactNode }>) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Flow({ children }: PropsWithChildren) { return <article>{children}</article> }
function DefaultCard({ title = 'Balcony', children }: { title?: string | null; children?: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>
}
function RenderCrop({ children }: { children: (crop: string) => ReactNode }) { return <section>{children('mint')}</section> }
function GardenButton({ children, ...rest }: ComponentProps<'button'>) { return <button {...rest}>{children}</button> }

function run() {
  // Capture actual React console arguments, preserving placeholders in the warning.
  const original = console.error
  console.error = (...args) => console.log('React warning:', ...args)
  try {
    console.log('P1 A:', renderToStaticMarkup(<CardA title="Balcony">basil</CardA>))
    console.log('P1 B:', renderToStaticMarkup(<CardB title="Balcony">basil</CardB>))
    console.log('P2 content:', renderToStaticMarkup(<CardB title="Balcony">mint</CardB>))
    console.log('P2 attribute:', renderToStaticMarkup(<CardB title="Balcony" children="mint" />))
    const cases: [string, ReactNode][] = [['string', 'basil'], ['number', 3], ['element', <b>mint</b>],
      ['elements', [<b key="b">basil</b>, <i key="m">mint</i>]],
      ['undefined', undefined], ['null', null], ['false', false]]
    for (const [name, child] of cases) console.log('P3 ' + name + ':', renderToStaticMarkup(<section>{child}</section>))
    invalidChildren()
    console.log('P3 render prop:', renderToStaticMarkup(<RenderCrop>{crop => <b>{crop}</b>}</RenderCrop>))
    const dom: ComponentProps<'section'> = { id: 'bed-B2', className: 'from-spread' }
    console.log('P4 rest:', renderToStaticMarkup(<Frame title="Water" {...dom}>2 L</Frame>))
    console.log('P4 explicit last:', renderToStaticMarkup(<section {...dom} className="explicit">basil</section>))
    console.log('P4 spread last:', renderToStaticMarkup(<section className="explicit" {...dom}>basil</section>))
    console.log('P5 slots:', renderToStaticMarkup(<Slots header={<h2>Water</h2>} footer={<small>Evening</small>}><p>2 L</p></Slots>))
    console.log('P5 children:', renderToStaticMarkup(<Flow><header><h2>Water</h2></header><main><p>2 L</p></main><footer><small>Evening</small></footer></Flow>))
    console.log('P6 missing:', renderToStaticMarkup(<DefaultCard />))
    console.log('P6 undefined:', renderToStaticMarkup(<DefaultCard title={undefined} />))
    console.log('P6 null:', renderToStaticMarkup(<DefaultCard title={null} />))
    console.log('P7 ReactNode:', renderToStaticMarkup(<CardB title="Seeds">{3}</CardB>))
    console.log('P7 PropsWithChildren:', renderToStaticMarkup(<Flow />))
    console.log('P7 button:', renderToStaticMarkup(<GardenButton type="button" disabled>Water</GardenButton>))
  } finally { console.error = original }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run()
