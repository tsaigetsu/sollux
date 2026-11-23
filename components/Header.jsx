import { useEffect, useState } from 'react'

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ margin: '2px 0 0 6px' }}>
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Ikony z public/svg/ – rysowane jako maska w kolorze tekstu,
// dzięki czemu zmieniają kolor (biały → czarny) razem z menu na hover.
const Icon = ({ name, size = 20, label }) => {
  const url = `url(/svg/${name}.svg)`
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: 'currentColor',
        WebkitMask: `${url} center / contain no-repeat`,
        mask: `${url} center / contain no-repeat`,
      }}
    />
  )
}

const links = ['Lampy', 'Kolory', 'Pomieszczenia', 'Nowości', 'Bestsellery', 'Promocje']

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Blokada scrolla strony, Esc zamyka menu, powrót na większy ekran też
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && close()
    const mq = window.matchMedia('(min-width: 641px)')
    const onMq = (e) => e.matches && close()
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <header className={`header ${open ? 'is-open' : ''}`}>
      <div className="header__bg" />
      <div className="container header__inner">
        <a href="#" className="logo" onClick={close}>SOLLUX</a>
        <nav className="nav">
          {links.map((l, i) => (
            <a href="#" key={l} style={{ display: 'inline-flex', alignItems: 'center' }}>{l}{i < 3 && <Chevron />}</a>
          ))}
        </nav>
        <div className="search">
          <input placeholder="Czego szukasz?" />
          <Icon name="search" size={16} label="Szukaj" />
        </div>
        <div className="header__actions">
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="cube" size={16} />
            Stwórz swoją lampę
          </a>
          <a href="#" aria-label="Moje konto"><Icon name="user" size={20} /></a>
          <a href="#" aria-label="Koszyk"><Icon name="shop" size={20} /></a>
        </div>

        {/* Burger – tylko na telefonach */}
        <button
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Białe menu mobilne */}
      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu__search">
          <input placeholder="Czego szukasz?" tabIndex={open ? 0 : -1} />
          <Icon name="search" size={16} label="Szukaj" />
        </div>
        <nav className="mobile-menu__nav">
          {links.map((l, i) => (
            <a href="#" key={l} onClick={close} tabIndex={open ? 0 : -1}>
              {l}{i < 3 && <Chevron />}
            </a>
          ))}
        </nav>
        <a href="#" className="mobile-menu__cta" onClick={close} tabIndex={open ? 0 : -1}>
          <Icon name="cube" size={18} />
          Stwórz swoją lampę
        </a>
      </div>
    </header>
  )
}
