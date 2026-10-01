import { useState, useMemo } from 'react'

export function usePagination(items = [], itemsPerPage = 10) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, page, itemsPerPage])

  const goToPage  = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const nextPage  = () => goToPage(page + 1)
  const prevPage  = () => goToPage(page - 1)

  return { page, totalPages, paginated, goToPage, nextPage, prevPage }
}
