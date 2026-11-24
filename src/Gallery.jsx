import { useRef } from 'react'

const IMAGES = [
  { id: 1, w: 1400, h: 1050, alt: 'Favvora va bolalar o‘yingohi', caption: <>Hovlida <b>favvora va bolalar o‘yingohi</b> — farzandlaringiz uchun xavfsiz maskan</> },
  { id: 6, w: 1400, h: 1050, alt: 'Oylik to‘lov 4–5 mlndan', caption: <><b>Oylik to‘lov 4–5 mlndan</b> to‘lab xonadon xarid qilish imkoniyati</> },
  { id: 7, w: 1024, h: 1280, alt: 'ONIX avtomobilini yutib oling', caption: <>Katta aksiyada qatnashing va <b>yangi ONIX avtomobilini</b> yutib oling</> },
  { id: 3, w: 1280, h: 960, alt: 'Zamonaviy fasad', caption: <>Kechqurun chiroyli yoritiladigan <b>zamonaviy binolar</b></> },
  { id: 5, w: 1120, h: 1400, alt: 'Barchasi 1 km radiusda', caption: <>Maktab, bog‘cha, shifoxona, masjid va bank — <b>barchasi 1 km radiusda</b></> },
  { id: 4, w: 1062, h: 1400, alt: '500+ dan ortiq parkovka', caption: <><b>500+ dan ortiq parkovka</b> — mashinangiz uchun joy muammo emas</> },
  { id: 2, w: 1400, h: 1050, alt: 'Majmua maketi', caption: <>Qir Guli City’ning <b>tepadan to‘liq ko‘rinishi</b></> },
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
            key={img.id}
            type="button"
            className="card reveal"
            onPointerDown={onPointerDown}
            onClick={onClick}
            aria-label={`${img.alt} — ro‘yxatdan o‘tish`}
          >
            <span className="card-media">
              <img
                src={`/opt/g${img.id}.webp`}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="card-cap">{img.caption}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
