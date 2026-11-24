import { useRef } from 'react'
import Picture from './Picture'

const IMAGES = [
  { n: 1, alt: 'Favvora va bolalar o‘yingohi', caption: <>Hovlida <b>favvora va bolalar o‘yingohi</b> — farzandlaringiz uchun xavfsiz maskan</> },
  { n: 6, alt: 'Oylik to‘lov 4–5 mlndan', caption: <><b>Oylik to‘lov 4–5 mlndan</b> to‘lab xonadon xarid qilish imkoniyati</> },
  { n: 7, alt: 'ONIX avtomobilini yutib oling', caption: <>Katta aksiyada qatnashing va <b>yangi ONIX avtomobilini</b> yutib oling</> },
  { n: 3, alt: 'Zamonaviy fasad', caption: <>Kechqurun chiroyli yoritiladigan <b>zamonaviy binolar</b></> },
  { n: 5, alt: 'Barchasi 1 km radiusda', caption: <>Maktab, bog‘cha, shifoxona, masjid va bank — <b>barchasi 1 km radiusda</b></> },
  { n: 4, alt: '500+ dan ortiq parkovka', caption: <><b>500+ dan ortiq parkovka</b> — mashinangiz uchun joy muammo emas</> },
  { n: 2, alt: 'Majmua maketi', caption: <>Qir Guli City’ning <b>tepadan to‘liq ko‘rinishi</b></> },
]

// Barmoq shu masofadan ko'p siljisa — bu scroll, bosish emas
const TAP_TOLERANCE = 10

export default function Gallery({ onSelect }) {
  const start = useRef(null)

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY }
  }

  const onClick = (e) => {
    const s = start.current
    start.current = null
    if (s && Math.hypot(e.clientX - s.x, e.clientY - s.y) > TAP_TOLERANCE) return
    onSelect()
  }

  return (
    <section className="gallery" id="gallery">
      <div className="section-head reveal">
        <span className="eyebrow">Galereya</span>
        <h2>Qir Guli City bilan yaqindan tanishing</h2>
      </div>

      <div className="cards">
        {IMAGES.map((img) => (
          <button
            key={img.n}
            type="button"
            className="card reveal"
            onPointerDown={onPointerDown}
            onClick={onClick}
            aria-label={`${img.alt} — ro‘yxatdan o‘tish`}
          >
            <span className="card-media">
              <Picture
                name={`g${img.n}`}
                alt={img.alt}
                sizes="(max-width: 560px) calc(100vw - 60px), 500px"
              />
            </span>
            <span className="card-cap">{img.caption}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
