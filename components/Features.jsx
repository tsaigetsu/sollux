const items = [
  ['↵', 'Zwroty nawet do 100 dni', 'szybkie i proste'],
  ['🔖', '5 lat gwarancji', 'na wszystkie produkty'],
  ['🚚', 'Darmowa dostawa', 'już za 299 zł'],
  ['🛡', 'Polskie produkty', 'sprawdzona jakość'],
  ['🏆', 'Oficjalny sklep producenta', 'gwarancja satysfakcji'],
]

export default function Features() {
  return (
    <section className="container features">
      {items.map(([icon, t, s]) => (
        <div key={t}>
          <div className="features__icon">{icon}</div>
          <strong>{t}</strong>
          <small>{s}</small>
        </div>
      ))}
    </section>
  )
}
