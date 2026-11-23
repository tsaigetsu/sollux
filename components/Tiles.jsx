// img: plik z public/imgs/
// size / position: sposób dopasowania obrazka w kafelku (cover = wypełnij, contain = pokaż w całości)
const tiles = [
  { cls: 'tile--thoro', img: '/imgs/women.webp', size: 'cover', position: 'center', small: 'Marka THORO', title: 'Poznaj lampy premium', btn: 'Odwiedź sklep THORO', light: true },
  { cls: 'tile--config', img: '/imgs/laptop.webp', size: 'cover', position: 'right center', small: 'Konfigurator 3D', title: 'Wybierz projekt i dostosuj go do swojego wnętrza', btn: 'Stwórz swój projekt', light: true },
  { cls: 'tile--catalog', img: '/imgs/tablet.webp', size: 'cover', position: 'right center', small: 'Katalog', title: 'Odkryj najnowszy katalog', btn: 'Sprawdź katalog' },
  { cls: 'tile--smart', img: '/imgs/smartphone.webp', size: 'cover', position: 'right center', small: 'SOLLUX SMART', title: 'Przymierz lampę w aplikacji', btn: 'Pobierz aplikację na telefon' },
]

export default function Tiles() {
  return (
    <section className="container tiles">
      {tiles.map((t) => (
        <article key={t.cls} className={`tile ${t.cls} ${t.light ? 'tile--light' : ''}`}>
          <div
            className="tile__img"
            style={{
              backgroundImage: `url(${t.img})`,
              backgroundSize: t.size,
              backgroundPosition: t.position,
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="tile__text">
            <small>{t.small}</small>
            <h3>{t.title}</h3>
            <a href="#" className="btn btn--black">{t.btn}</a>
          </div>
        </article>
      ))}
    </section>
  )
}
