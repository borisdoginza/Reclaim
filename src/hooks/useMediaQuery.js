import { useEffect, useState } from 'react'

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)

    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)
    window.addEventListener('resize', updateMatches)

    return () => {
      mediaQuery.removeEventListener('change', updateMatches)
      window.removeEventListener('resize', updateMatches)
    }
  }, [query])

  return matches
}
