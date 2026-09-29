// Drawing bar chart in SVG
'use client'

import { compact, money } from "@/lib/chart"
import { memo, useState } from "react"

const W = 900, H = 450, L = 56, R = 16, T = 28, B = 36 // viewBox sizes + paddings
const IW = W - L - R, IH = H - T - B // drawing area (inside)
const TICKS = [0, 0.25, 0.5, 0.75, 1] // gridlines as fractions of max

type Props = {
    values: number[]
    labels: string[]
    title: string
}

function BarChart({values, labels, title }: Props) {
    const [active, setActive] = useState<number | null>(null)
    const max = Math.max(1, ...values)
    const step = IW / values.length // horizontal slot per bar
    const bw = step * 0.7 // bar width (30% gap)
    const y = (v: number) => T + IH - (v / max) * IH
    const empty = values.every(v => v === 0)
    const tx = active === null ? 0 : Math.min(Math.max(L + active * step + step / 2.6), W - 60)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="group" aria-labelledby="chart-title" className="mx-auto block h-auto w-full">
        <title id="chart-title">{title}</title>
        {TICKS.map(t => (
            <g key={t} className="text-slate-300 dark:text-slate-600">
                <line x1={L} x2={W - R} y1={y(max*t)} y2={y(max * t)} stroke="currentColor" strokeWidth={1} />
                <text x={L - 6} y={y(max * t) + 4} textAnchor="end" fontSize={12} className="fill-slate-500 dark:fill-slate-400">
                    {compact(max * t)}
                </text>
            </g>
        ))}
        {values.map((v, i) => {
            const h = (v / max) * IH
            return (
              <g
                key={labels[i]}
                role="img"
                aria-label={`${labels[i]}: ${money(v)}}`}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="outline-none"
                style={{
                  transform: `translateX(${L + i * step + (step - bw) / 2}px)`,
                  transition: "transform 0.5s",
                }}
              >
                <rect y={T} width={bw} height={IH} fill="transparent" />
                <rect
                  y={T + IH - h}
                  width={bw}
                  height={h}
                  className={`${active === i ? "fill-blue-700 dark:fill-blue-300" : "fill-blue-500 dark:fill-blue-400"}`}
                />
                <text x={bw / 2} y={H - 8} textAnchor="middle" fontSize={14} className="fill-slate-600 dark:fill-slate-300">{labels[i]}</text>
              </g>
            );
        })}
        {empty && <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-slate-500">No sales match these filters</text>}
        {active !== null && (
            <text x={tx} y={y(values[active]) - 6} textAnchor="middle" fontSize={13} fontWeight={600} strokeWidth={3} paintOrder="stroke" pointerEvents="none" className="fill-slate-900 stroke-white dark:fill-white dark:stroke-slate-900">
                {labels[active]}: {money(values[active])}
            </text>
        )}
    </svg>
  )
}

export default memo(BarChart)