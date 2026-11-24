import { useCallback, useEffect, useRef, useState } from 'react'
import Gallery from './Gallery'
import PhoneModal from './PhoneModal'
import Countdown from './Countdown'
import Picture from './Picture'

const ArrowCircle = () => (
  <span className="cta-arrow" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
  </span>
)

export default function App() {
  const [modal, setModal] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const ctaRef = useRef(null)

  const openModal = useCallback(() => setModal(true), [])
  const closeModal = useCallback(() => setModal(false), [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <main className="page">
        <header className="topbar">
          <div className="chip reveal">
            <span className="chip-ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 11h3v9h5v-6h4v6h5v-9h3z" /></svg>
            </span>
            <span className="chip-txt"><small>xonadon:</small>2 XONALI</span>
          </div>

          <div className="logo-tab">
            <img src="/img/logo-tab.png" alt="Qir Guli City" width="360" height="283" />
          </div>

          <div className="chip chip-r reveal">
            <span className="chip-txt"><small>bosh to‘lov:</small>0 SO‘M</span>
            <span className="chip-ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M20 12V8H6a2 2 0 010-4h12v4M4 6v12a2 2 0 002 2h14v-4M18 12a2 2 0 000 4h4v-4z" /></svg>
            </span>
          </div>
        </header>

        <h1 className="headline reveal" style={{ '--d': '80ms' }}>
          Boshlang‘ich <em>to‘lovsiz</em> <em>2 xonali</em> xonadon xarid qiling!
        </h1>

        <div className="hero-img">
          <Picture
            name="dom"
            alt="Qir Guli City turar joy majmuasi"
            sizes="(max-width: 560px) 100vw, 560px"
            priority
            fill
          />
        </div>

        <div className="hero-cta">
          <button ref={ctaRef} className="cta cta-xl reveal" style={{ '--d': '220ms' }} onClick={openModal}>
            <span>BEPUL QATNASHISH</span>
            <ArrowCircle />
          </button>
          <Countdown />
        </div>

        <Gallery onSelect={openModal} />


      </main>

      <div className={`sticky-cta ${showSticky && !modal ? 'show' : ''}`}>
        <button className="cta cta-block" onClick={openModal} tabIndex={showSticky ? 0 : -1}>
          <span>BEPUL QATNASHISH</span>
          <ArrowCircle />
        </button>
      </div>

      <PhoneModal open={modal} onClose={closeModal} />
    </>
  )
}
