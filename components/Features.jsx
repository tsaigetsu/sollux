// Ikony z public/icons/
const items = [
  ['enter', 'Zwroty nawet do 100 dni', 'szybkie i proste'],
  ['bookmark', '5 lat gwarancji', 'na wszystkie produkty'],
  ['truck', 'Darmowa dostawa', 'już za 299 zł'],
  ['custom', 'Polskie produkty', 'sprawdzona jakość'],
  ['trophy', 'Oficjalny sklep producenta', 'gwarancja satysfakcji'],
]

export default function Features() {
  return (
    <section className="container features">
      {items.map(([icon, t, s]) => (
        <div key={t}>
          <div className="features__icon">
            <img src={`/icons/${icon}.svg`} alt="" width="24" height="24" style={{ display: 'block' }} />
          </div>
          <strong>{t}</strong>
          <small>{s}</small>
        </div>
      ))}
    </section>
  )
}
