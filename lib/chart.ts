// Aggregation (filter + sum per month in one pass) and number formatters
import type { Filters, Sale } from "./data";

export function aggregate(sales: Sale[], f: Filters): number[] {
    const totals: number[] = new Array(f.to - f.from + 1).fill(0)
    for(const s of sales) {
        if(s.month < f.from || s.month > f.to) continue
        if(f.category !== "All" && s.category !== f.category) continue
        if(f.region !== "All" && s.region !== f.region) continue
        totals[s.month - f.from] += s.amount
    }
    return totals
}

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
export const compact = new Intl.NumberFormat("en-US", { notation: "compact" }).format;
