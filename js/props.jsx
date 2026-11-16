// Name: Huriye Kayadelen; Student number: 2200005795
import { renderToStaticMarkup } from 'react-dom/server'
import { pathToFileURL } from 'node:url'

// Deliberate runtime experiments live in JS because TS rejects these child values.
// TS calls the same probe instead of suppressing its ReactNode checks.
export function invalidChildren() {
  const grow = () => <b>mint</b>
  console.log('P3 function:', renderToStaticMarkup(<section>{grow}</section>))
  try { console.log(renderToStaticMarkup(<section>{{ crop: 'mint' }}</section>)) }
  catch (error) { console.log('P3 object deliberate experiment:', error.name + ': ' + error.message) }
}

function CardA(props) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }) { return <section><h2>{title}</h2>{children}</section> }
function Frame({ title, children, ...rest }) {
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
function Slots({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function Flow({ children }) { return <article>{children}</article> }
function DefaultCard({ title = 'Balcony', children }) {
  return <section><h2>{title}</h2>{children}</section>
}
function RenderCrop({ children }) { return <section>{children('mint')}</section> }
function GardenButton({ children, ...rest }) { return <button {...rest}>{children}</button> }

function run() {
  // Capture actual React console arguments, preserving placeholders in the warning.
  const original = console.error
  console.error = (...args) => console.log('React warning:', ...args)
  try {
    console.log('P1 A:', renderToStaticMarkup(<CardA title="Balcony">basil</CardA>))
    console.log('P1 B:', renderToStaticMarkup(<CardB title="Balcony">basil</CardB>))
    console.log('P2 content:', renderToStaticMarkup(<CardB title="Balcony">mint</CardB>))
    console.log('P2 attribute:', renderToStaticMarkup(<CardB title="Balcony" children="mint" />))
    const cases = [['string', 'basil'], ['number', 3], ['element', <b>mint</b>],
      ['elements', [<b key="b">basil</b>, <i key="m">mint</i>]],
      ['undefined', undefined], ['null', null], ['false', false]]
    for (const [name, child] of cases) console.log('P3 ' + name + ':', renderToStaticMarkup(<section>{child}</section>))
    invalidChildren()
    console.log('P3 render prop:', renderToStaticMarkup(<RenderCrop>{crop => <b>{crop}</b>}</RenderCrop>))
    const dom = { id: 'bed-B2', className: 'from-spread' }
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
