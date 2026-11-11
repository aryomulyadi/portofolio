import { Fragment } from 'react'
import { marqueeItems } from '../data/marquee'

export function Marquee() {
  const sequence = [...marqueeItems, ...marqueeItems]

  return (
    <div className="overflow-hidden border-b border-ink bg-ink text-paper" aria-hidden>
      <div className="marquee-track">
        {sequence.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <span className="text-signal">/</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
