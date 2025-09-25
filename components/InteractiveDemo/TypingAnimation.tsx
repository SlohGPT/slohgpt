'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function TypingAnimation({
  text,
  speed = 70,
  onDone,
}: {
  text: string
  speed?: number
  onDone?: () => void
}) {
  const [out, setOut] = useState('')
  const ref = useRef<number | null>(null)
  const onDoneCalled = useRef(false)
  const onDoneRef = useRef(onDone)
  
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    // Reset completion flag when text changes
    onDoneCalled.current = false
    
    setOut('')
    let i = 0
    ref.current = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        if (ref.current) window.clearInterval(ref.current)
        // Small delay to ensure final paint before calling onDone
        setTimeout(() => {
          if (!onDoneCalled.current) {
            onDoneCalled.current = true
            if (onDoneRef.current) onDoneRef.current()
          }
        }, 100)
      }
    }, speed)
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [text, speed])

  return (
    <span>
      {out}
      <span className="demo-caret">|</span>
    </span>
  )
}


