import { useEffect, useState } from 'react'

const START = 30

// Oxirgi 10 soniyada sanash tezlashadi (1000ms → ~450ms)
const tickDelay = (s) => (s > 10 ? 1000 : 450 + (s / 10) * 550)

export default function Countdown() {
  const [sec, setSec] = useState(START)

  useEffect(() => {
    if (sec <= 0) return
    const t = setTimeout(() => setSec((s) => s - 1), tickDelay(sec))
    return () => clearTimeout(t)
  }, [sec])

  const urgent = sec <= 10
  const done = sec === 0

  return (
    <div className={`countdown ${urgent ? 'urgent' : ''} ${done ? 'done' : ''}`} aria-live="polite">
      <span className="cd-label">{done ? 'Shoshiling! Joylar tugayapti' : 'Taklif tugashiga qoldi'}</span>
      <span className="cd-time" key={sec}>
        00:{String(sec).padStart(2, '0')}
      </span>
    </div>
  )
}
