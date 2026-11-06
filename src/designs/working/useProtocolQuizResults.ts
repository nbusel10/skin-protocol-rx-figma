import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { clearQuizSession, loadQuizSession, protocolFromSession } from '../../lib/quizSession'

const RESULTS_FLAG = 'sprxProtocolResults'

function hasSavedResults() {
  const saved = loadQuizSession()
  return Boolean(saved?.done && protocolFromSession(saved))
}

function historyRecord(): Record<string, unknown> {
  const current = window.history.state as unknown
  return current && typeof current === 'object' ? (current as Record<string, unknown>) : {}
}

function scrollToQuiz(quizId: string) {
  document.getElementById(quizId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

/** Results view for the working protocol quiz: scroll, restart, and browser history. */
export function useProtocolQuizResults(quizId: string) {
  const [showResults, setShowResults] = useState(hasSavedResults)
  const scrollQuiz = useRef(false)
  const scrollTop = useRef(false)
  const pagePath = useRef('')

  if (!pagePath.current && typeof window !== 'undefined') {
    pagePath.current = window.location.pathname.replace(/\/$/, '') || '/'
  }

  useLayoutEffect(() => {
    if (showResults) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      return
    }
    if (scrollTop.current) {
      scrollTop.current = false
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      return
    }
    if (!scrollQuiz.current) return
    scrollQuiz.current = false
    scrollToQuiz(quizId)
    const frame = requestAnimationFrame(() => scrollToQuiz(quizId))
    return () => cancelAnimationFrame(frame)
  }, [showResults, quizId])

  useEffect(() => {
    if (!showResults) return
    const timer = window.setTimeout(() => {
      if (historyRecord()[RESULTS_FLAG]) return
      window.history.pushState({ ...historyRecord(), [RESULTS_FLAG]: true }, '')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [showResults])

  useEffect(() => {
    function onOpenPage() {
      if (!showResults) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const record = historyRecord()
      if (record[RESULTS_FLAG]) {
        const next = { ...record }
        delete next[RESULTS_FLAG]
        window.history.pushState(next, '')
      }
      scrollTop.current = true
      setShowResults(false)
    }
    window.addEventListener('sprx-open-protocol-page', onOpenPage)
    return () => window.removeEventListener('sprx-open-protocol-page', onOpenPage)
  }, [showResults])

  useEffect(() => {
    function onPop() {
      const path = window.location.pathname.replace(/\/$/, '') || '/'
      if (path !== pagePath.current) return
      if (historyRecord()[RESULTS_FLAG] && hasSavedResults()) {
        setShowResults(true)
        return
      }
      scrollQuiz.current = true
      setShowResults(false)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function revealResults() {
    setShowResults(true)
  }

  function startOver() {
    clearQuizSession()
    window.dispatchEvent(new Event('sprx-cart-updated'))
    scrollQuiz.current = true
    if (historyRecord()[RESULTS_FLAG]) {
      window.history.back()
      return
    }
    setShowResults(false)
  }

  return { showResults, revealResults, startOver }
}
