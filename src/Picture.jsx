import { useState } from 'react'
import IMAGES from './images.json'

const WIDTHS = [480, 800, 1200]
const set = (name, ext) => WIDTHS.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ')

/**
 * Ekran o'lchamiga mos rasm (AVIF → WebP), yuklanguncha xira placeholder.
 * priority — birinchi ekrandagi rasm uchun (darhol yuklanadi).
 * fill — ota-element o'lchamini to'liq egallaydi (object-fit: cover).
 */
export default function Picture({ name, alt, sizes, priority = false, fill = false, className = '' }) {
  const meta = IMAGES[name]
  const [loaded, setLoaded] = useState(false)

  return (
    <span
      className={`pic ${loaded ? 'is-loaded' : ''} ${className}`}
      style={{ backgroundImage: `url(${meta.lqip})`, aspectRatio: fill ? undefined : `${meta.w} / ${meta.h}` }}
    >
      <picture>
        <source type="image/avif" srcSet={set(name, 'avif')} sizes={sizes} />
        <img
          src={`/img/${name}-800.webp`}
          srcSet={set(name, 'webp')}
          sizes={sizes}
          alt={alt}
          width={meta.w}
          height={meta.h}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          ref={(el) => el?.complete && el.naturalWidth && !loaded && setLoaded(true)}
        />
      </picture>
    </span>
  )
}
