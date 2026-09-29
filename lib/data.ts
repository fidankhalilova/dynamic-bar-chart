export type Sale = {
    month: number,
    category: string,
    region: string,
    amount: number
}
export type Filters = {
    from: number
    to: number
    category: string 
    region: string
}

export const LABELS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export const CATEGORIES = [
    'Electronics', 'Clothing', 'Home', 'Sports'
] as const

export const REGIONS = [
    'North', 'South', 'East', 'West'
] as const

// Random generator
let seed = 42;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const pick = <T>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)]

export const SALES: Sale[] = Array.from({ length: 2000 }, () => ({
    month: Math.floor(rand() * 1.5 * 12),
    category: pick(CATEGORIES),
    region: pick(REGIONS),
    amount: Math.round(50 + rand() * 950)

}));