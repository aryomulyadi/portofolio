import { marqueeItems } from '../data/marquee'

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-line-dark bg-midnight-deep py-4"
      aria-hidden
    >
      <div className="marquee-track gap-12 pr-12">
        {marqueeItems.concat(marqueeItems).map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-12 font-display text-sm font-medium tracking-[0.18em] uppercase text-electric/80"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
        ))}
      </div>
    </div>
  )
}

