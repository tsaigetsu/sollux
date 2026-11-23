import { useEffect, useRef, useState } from 'react'

const SLIDE_MS = 3000

// Tła slidera – pliki z public/imgs/
const slides = ['/imgs/hero_one.webp', '/imgs/hero_two.webp']

// Lampy – pliki z public/imgs/
// x / y: pozycja w px względem kontenera (1220 px, wyśrodkowany), width: szerokość obrazka,
// depth: siła ruchu za kursorem (większa = bliżej widza)
// behind: true = lampa pod tekstem hero
const lamps = [
  { src: '/imgs/lampa1.png', x: 560, y: 110, width: 220, depth: 30 },
  { src: '/imgs/lampa2.png', x: 300, y: 320, width: 240, depth: 55, behind: true },
  { src: '/imgs/lampa3.png', x: 780, y: 250, width: 200, depth: 20 },
]

function Lamp({ src, x, y, width, depth, mouse }) {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-label="Włącz / wyłącz lampę"
      aria-pressed={on}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        pointerEvents: 'auto',
        transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)`,
        transition: 'transform 500ms var(--ease-out)',
        willChange: 'transform',
      }}
    >
      <img src={src} alt="" draggable={false} style={{ display: 'block', width: '100%', height: 'auto' }} />
      {/* Poświata po kliknięciu (tylko opacity) */}
      <span
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: '-12%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,236,170,0.9), rgba(255,220,120,0) 70%)',
          opacity: on ? 1 : 0,
          transition: 'opacity 250ms var(--ease)',
          pointerEvents: 'none',
        }}
      />
    </button>
  )
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  // Autoplay co 3 s
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [active])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }

  const go = (d) => setActive((a) => (a + d + slides.length) % slides.length)

  return (
    <section className="hero" ref={ref} onMouseMove={onMove} onMouseLeave={() => setMouse({ x: 0, y: 0 })}>
      {slides.map((src, i) => (
        <div key={src} className={`hero__slide ${i === active ? 'is-active' : ''}`}>
          <div
            className="hero__img"
            style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </div>
      ))}

      {/* Lampy pod tekstem (z-index 1) */}
      <div className="hero__lamps" style={{ zIndex: 1 }}>
        {lamps.filter((l) => l.behind).map((l) => <Lamp key={l.src} {...l} mouse={mouse} />)}
      </div>

      <div className="container hero__content" style={{ zIndex: 2 }}>
        <p>Bestsellery SOLLUX</p>
        <h1>Kolor i forma<br />w nowym świetle</h1>
        <a href="#" className="btn btn--yellow">Sprawdź bestsellery</a>
      </div>

      {/* Lampy nad tekstem (z-index 3) */}
      <div className="hero__lamps" style={{ zIndex: 3 }}>
        {lamps.filter((l) => !l.behind).map((l) => <Lamp key={l.src} {...l} mouse={mouse} />)}
      </div>

      <button className="arrow arrow--left" onClick={() => go(-1)} aria-label="Poprzedni">←</button>
      <button className="arrow arrow--right" onClick={() => go(1)} aria-label="Następny">→</button>

      <div className="hero__progress">
        {slides.map((_, i) => (
          <div className="bar" key={i}>
            {i === active && <span key={active} className="bar__fill" />}
          </div>
        ))}
      </div>

      <div className="hero__rating"><b>4.8</b><span className="hero__rating-star">★</span> Uwielbiany przez klientów</div>
    </section>
  )
}
