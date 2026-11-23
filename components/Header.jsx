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
  return (
    <header className="header">
      <div className="header__bg" />
      <div className="container header__inner">
        <a href="#" className="logo">SOLLUX</a>
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
      </div>
    </header>
  )
}
