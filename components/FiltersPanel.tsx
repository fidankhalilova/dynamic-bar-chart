// Native controls (2 sliders & 2 dropdowns)
"use client"

import type { Dispatch, SetStateAction } from "react"
import { CATEGORIES, LABELS, REGIONS, type Filters } from "@/lib/data";

type SelectProps = {
    label: string
    value: string
    options: readonly string[]
    onChange: (v: string) => void
}

const box = "rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800"

function Select ({ label, value, options, onChange }: SelectProps) {
    return (
        <label className="flex flex-col gap-1 text-sm">
            {label}
            <select className={box} onChange={e => onChange(e.target.value)} value={value}>
                <option value="all">All</option>
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        </label>
    )
}


export default function FiltersPanel({filters, onChange}: {filters: Filters; onChange: Dispatch<SetStateAction<Filters>>}) {
    const setFrom = (v:number) => onChange(f => ({ ...f, from: v, to: Math.max(v, f.to)}))
    const setTo = (v:number) => onChange(f => ({ ...f, to: v, from: Math.min(f.from, v)}))
    const last = LABELS.length - 1
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
            From: {LABELS[filters.from]}
            <input type="range" min={0} max={last} value={filters.from} onChange={e => setFrom(+e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
            To: {LABELS[filters.to]}
            <input type="range" min={0} max={last} value={filters.to} onChange={e => setTo(+e.target.value)} />
        </label>
        <Select label="Category" value={filters.category} options={CATEGORIES} onChange={category => onChange(f => ({ ...f, category }))} />
        <Select label="Regions" value={filters.region} options={REGIONS} onChange={region => onChange(f => ({ ...f, region }))} />
    </div>
  )
}
