import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, formatByMask, maskLength } from './countries'
import { submitLead, TELEGRAM_URL } from './config'

export default function PhoneModal({ open, onClose }) {
  const [country, setCountry] = useState(COUNTRIES[0])
  const [digits, setDigits] = useState('')
  const [error, setError] = useState('')
  const [picker, setPicker] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const searchRef = useRef(null)

  const need = maskLength(country.mask)
  const valid = digits.length === need

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => inputRef.current?.focus(), 280)
    const onKey = (e) => {
      if (e.key === 'Escape') picker ? setPicker(false) : onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, picker, onClose])

  useEffect(() => {
    if (picker) setTimeout(() => searchRef.current?.focus(), 50)
    else setQuery('')
  }, [picker])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace('+', '')
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.replace('+', '').startsWith(q),
    )
  }, [query])

  const handleChange = (e) => {
    let d = e.target.value.replace(/\D/g, '')
    const dialDigits = country.dial.replace('+', '')
    // To'liq raqam qo'yilsa (masalan +998901234567) — kodni olib tashlaymiz
    if (d.length > need && d.startsWith(dialDigits)) d = d.slice(dialDigits.length)
    setDigits(d.slice(0, need))
    if (error) setError('')
  }

  const pickCountry = (c) => {
    setCountry(c)
    setDigits((d) => d.slice(0, maskLength(c.mask)))
    setPicker(false)
    setError('')
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid) {
      setError("Telefon raqam to'liq emas!")
      inputRef.current?.focus()
      return
    }
    setLoading(true)
    await submitLead(country.dial + digits)
    window.location.href = TELEGRAM_URL
    setTimeout(() => setLoading(false), 2500)
  }

  return (
    <div className={`modal-root ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="sheet-handle" />
        <button className="modal-close" onClick={onClose} aria-label="Yopish">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {!picker ? (
          <form onSubmit={handleSubmit} noValidate>
            <h3 id="modal-title" className="modal-title">Katta aksiyada xonadon xarid qilish uchun raqamingizni qoldiring</h3>
            <p className="modal-sub">Barcha ma'lumotlar Telegram kanalimizda</p>

            <label className={`phone-field ${error ? 'has-error' : ''} ${valid ? 'is-valid' : ''}`}>
              <button type="button" className="country-btn" onClick={() => setPicker(true)} aria-label="Davlatni tanlash">
                <span className="flag">{country.flag}</span>
                <span className="dial">{country.dial}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={country.mask.replace(/#/g, '0')}
                value={formatByMask(digits, country.mask)}
                onChange={handleChange}
                enterKeyHint="go"
              />
            </label>
            <div className="field-error" role="alert">{error}</div>

            <button type="submit" className="cta cta-block" disabled={loading}>
              {loading ? <span className="spinner" /> : (
                <>
                  <span>DAVOM ETISH</span>
                  <span className="cta-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </>
              )}
            </button>
            <p className="modal-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9.8 15.3l-.4 5.5c.6 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .5 1.7.3 2-.9l3.6-17c.3-1.5-.5-2.1-1.5-1.7L1.4 9.6c-1.4.6-1.4 1.4-.2 1.7l5.4 1.7L19 5.2c.6-.4 1.1-.2.7.2" /></svg>
              Tugmani bosganingizdan so'ng Telegram kanalga o'tasiz
            </p>
          </form>
        ) : (
          <div className="picker">
            <div className="picker-head">
              <button type="button" className="picker-back" onClick={() => setPicker(false)} aria-label="Orqaga">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <input
                ref={searchRef}
                className="picker-search"
                placeholder="Davlat yoki kod qidiring"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ul className="picker-list">
              {filtered.map((c) => (
                <li key={c.code}>
                  <button type="button" className={c.code === country.code ? 'active' : ''} onClick={() => pickCountry(c)}>
                    <span className="flag">{c.flag}</span>
                    <span className="cname">{c.name}</span>
                    <span className="cdial">{c.dial}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="picker-empty">Topilmadi</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
