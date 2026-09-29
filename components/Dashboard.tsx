// main component
"use client"

import { aggregate, money } from "@/lib/chart"
import { downloadCsv } from "@/lib/csv"
import { Filters, LABELS, SALES } from "@/lib/data"
import { useEffect, useMemo, useState } from "react"
import FiltersPanel from "./FiltersPanel"
import BarChart from "./BarChart"
import { useTheme } from "@/hooks/useTheme";

const INITIAL: Filters = { from: 0, to: LABELS.length - 1, category: "All", region: "All" }

export default function Dashboard() {
    const [filters, setFilters] = useState(INITIAL)
    const [dark, setDark] = useState(false)
    const [darkk, toggleTheme] = useTheme();
    const [showTable, setShowTable] = useState(false)

    useEffect(() => { setDark(matchMedia("(prefers-color-sheme: dark)").matches); }, [])
    useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark])

    const values = useMemo(() => aggregate(SALES, filters), [filters])
    const labels = useMemo(() => LABELS.slice(filters.from, filters.to + 1), [filters.from, filters.to])
    const total = useMemo(() => values.reduce((a, b) => a + b, 0), [values])
    const title = `Sales by month (${filters.category}, ${filters.region})`

    const exportCsv = () => downloadCsv('sales.csv', [["Month", "Sales"], ...labels.map((l, i) => [l, values[i]])])
    const btn = "rounded border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"

    return (
      <div className="min-h-screen bg-white p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-100 sm:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Sales Dashboard</h1>
            <button className={btn} onClick={toggleTheme} aria-pressed={darkk}>
              {darkk ? "Light" : "Dark"} mode
            </button>
          </header>
          <FiltersPanel filters={filters} onChange={setFilters} />

          <p className="text-sm">
            Total: <strong>{money(total)}</strong>
          </p>

          <div className="overflow-x-auto">
            <BarChart values={values} labels={labels} title={title} />
          </div>

          <div className="flex gap-2">
            <button className={btn} onClick={exportCsv}>
              Export CSV
            </button>
            <button
              className={btn}
              onClick={() => setShowTable((s) => !s)}
              aria-expanded={showTable}
            >
              {showTable ? "Hide" : "Show"} data table
            </button>
          </div>

          {showTable && (
            <table className="w-full text-sm">
              <caption className="sr-only">{title}</caption>
              <thead>
                <tr>
                  <th scope="col" className="text-left">
                    Month
                  </th>
                  <th scope="col" className="text-right">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody>
                {labels.map((l, i) => (
                  <tr key={l}>
                    <td>{l}</td>
                    <td className="text-right">{money(values[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}
