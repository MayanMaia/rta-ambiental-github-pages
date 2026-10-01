import { useCallback, useEffect, useRef, useState } from 'react'
import { getSiteDraft, saveSiteDraft } from '../mock/content'

const clone = (value) => JSON.parse(JSON.stringify(value))

export function useElementEditor() {
  const [content, setContent] = useState(() => getSiteDraft())
  const [page, setPage] = useState('home')
  const [selectedId, setSelectedId] = useState(null)
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const [saveState, setSaveState] = useState('saved')
  const saveTimer = useRef(null)
  const contentRef = useRef(content)
  const historyRef = useRef([])
  const futureRef = useRef([])

  const layoutKey = page === 'home' ? 'pageBuilder' : 'sobreBuilder'
  const layout = content?.[layoutKey]?.layout || []
  const selected = layout.find((item) => item.id === selectedId) || null

  useEffect(() => {
    setSelectedId(layout[0]?.id || null)
  }, [page])

  const updateContent = useCallback((producer) => {
    const current = contentRef.current
    const next = typeof producer === 'function' ? producer(current) : producer
    const nextHistory = [...historyRef.current.slice(-49), clone(current)]
    contentRef.current = next
    historyRef.current = nextHistory
    futureRef.current = []
    setContent(next)
    setHistory(nextHistory)
    setFuture([])
    setSaveState('unsaved')
  }, [])

  const updateSelected = useCallback((field, value) => {
    updateContent((current) => ({
      ...current,
      [layoutKey]: {
        ...current[layoutKey],
        layout: current[layoutKey].layout.map((item) => (
          item.id === selectedId ? { ...item, [field]: value } : item
        )),
      },
    }))
  }, [layoutKey, selectedId, updateContent])

  const addBlock = useCallback((block) => {
    updateContent((current) => ({
      ...current,
      [layoutKey]: { ...current[layoutKey], layout: [...(current[layoutKey]?.layout || []), block] },
    }))
    setSelectedId(block.id)
  }, [layoutKey, updateContent])

  const removeSelected = useCallback(() => {
    if (!selectedId) return
    const nextLayout = layout.filter((item) => item.id !== selectedId)
    updateContent((current) => ({ ...current, [layoutKey]: { ...current[layoutKey], layout: nextLayout } }))
    setSelectedId(nextLayout[0]?.id || null)
  }, [layout, layoutKey, selectedId, updateContent])

  const moveSelected = useCallback((direction) => {
    const index = layout.findIndex((item) => item.id === selectedId)
    const target = index + direction
    if (index < 0 || target < 0 || target >= layout.length) return
    const nextLayout = [...layout]
    ;[nextLayout[index], nextLayout[target]] = [nextLayout[target], nextLayout[index]]
    updateContent((current) => ({ ...current, [layoutKey]: { ...current[layoutKey], layout: nextLayout } }))
  }, [layout, layoutKey, selectedId, updateContent])

  const undo = useCallback(() => {
    const previous = historyRef.current.at(-1)
    if (!previous) return
    const nextHistory = historyRef.current.slice(0, -1)
    const nextFuture = [clone(contentRef.current), ...futureRef.current]
    contentRef.current = previous
    historyRef.current = nextHistory
    futureRef.current = nextFuture
    setContent(previous)
    setHistory(nextHistory)
    setFuture(nextFuture)
    setSaveState('unsaved')
  }, [])

  const redo = useCallback(() => {
    const next = futureRef.current[0]
    if (!next) return
    const nextHistory = [...historyRef.current, clone(contentRef.current)]
    const nextFuture = futureRef.current.slice(1)
    contentRef.current = next
    historyRef.current = nextHistory
    futureRef.current = nextFuture
    setContent(next)
    setHistory(nextHistory)
    setFuture(nextFuture)
    setSaveState('unsaved')
  }, [])

  useEffect(() => {
    if (saveState !== 'unsaved') return undefined
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      saveSiteDraft(content)
      setSaveState('autosaved')
    }, 2000)
    return () => window.clearTimeout(saveTimer.current)
  }, [content, saveState])

  useEffect(() => {
    const handleKey = (event) => {
      if (!(event.ctrlKey || event.metaKey)) return
      if (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'y') {
        event.preventDefault()
        event.key.toLowerCase() === 'y' || event.shiftKey ? redo() : undo()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [redo, undo])

  return {
    content, page, setPage, layout, selected, selectedId, setSelectedId,
    updateContent, updateSelected, addBlock, removeSelected, moveSelected,
    undo, redo, canUndo: history.length > 0, canRedo: future.length > 0, saveState,
  }
}
