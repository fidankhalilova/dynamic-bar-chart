// Builds csv file and downloads
export function downloadCsv(filename: string, rows: (string | number)[][]) {
    const csv = rows.map(r => r.join(",")).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    const a = document.createElement('a')

    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}
