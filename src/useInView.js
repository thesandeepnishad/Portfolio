import { useEffect, useRef, useState } from 'react'

// Tracks whether an element is (nearly) visible, so offscreen
// WebGL canvases can stop rendering and free up the GPU.
export default function useInView(rootMargin = '200px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView]
}

export const isMobile =
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

export const isTouchDevice =
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
