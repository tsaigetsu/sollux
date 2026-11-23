const cols = {
  'Moje zamówienia': ['Status zamówienia', 'Śledzenie przesyłki', 'Chcę zareklamować produkt', 'Informacje o wymianie', 'Kontakt'],
  'Moje konto': ['Zarejestruj się', 'Koszyk', 'Listy zakupowe', 'Lista zakupionych produktów', 'Historia transakcji', 'Moje rabaty'],
  Regulaminy: ['Sposoby wysyłki', 'Sposoby płatności', 'Regulamin sklepu', 'Polityka prywatności', 'Polityka bezpieczeństwa', 'Zmień ustawienia ciasteczek'],
  Informacje: ['O nas', 'FAQ', 'Kurs światła', 'Inspiracje', 'Marka premium', 'Gwarancja', 'Konfigurator 3D'],
  Współpraca: ['Dla Architekta', 'Modele 3D', 'Dystrybucja'],
}

const socials = [
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
]

// public/pay_icons/ – kolejność jak w projekcie (2 rzędy po 5)
const payments = [
  ['pay_visa', 'Visa'], ['pay_mc', 'Mastercard'], ['pay_payu', 'PayU'], ['pay_pp', 'PayPal'], ['pay_ip', 'InPost'],
  ['pay_dpd', 'DPD'], ['pay_ppl', 'PPL'], ['pay_dhl', 'DHL'], ['pay_gls', 'GLS'], ['pay_pwr', 'Paczka w Ruchu'],
]

// public/rewards/
const rewards = [
  ['r_rf', 'Rzetelna Firma'], ['r_oo', 'Orły Oświetlenia'], ['r_gb', 'Gazele Biznesu'],
  ['r_sf', 'Solidna Firma'], ['r_ppj', 'Polski Produkt – gwarancja jakości'], ['r_fgz', 'Firma Godna Zaufania'],
]

// public/countries/
const countries = [
  ['PL', 'Polska'], ['DE', 'Deutschland'], ['ES', 'España'], ['RO', 'România'],
  ['FR', 'France'], ['GB', 'United Kingdom'], ['NL', 'Nederland'], ['SE', 'Sverige'],
]

const row = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 18px' }

export default function Footer() {
  return (
    <footer className="container footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="logo logo--dark">SOLLUX</span>
          <div className="socials">
            {socials.map(([file, label]) => (
              <a href="#" key={file} aria-label={label}>
                <img src={`/icons/${file}.svg`} alt={label} width="22" height="22" style={{ display: 'block' }} />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(cols).map(([h, links]) => (
          <div key={h}>
            <h4>{h}</h4>
            {links.map((l) => <a className="footer__link" href="#" key={l}>
              {l}
            </a>)}
          </div>
        ))}
      </div>

      <div className="footer__mid">
        <div>
          <h4>Płatności i dostawy</h4>
          <div style={{ ...row, display: 'grid', gridTemplateColumns: 'repeat(5, auto)', justifyContent: 'start', gap: '14px 22px' }}>
            {payments.map(([file, label]) => (
              <img key={file} src={`/pay_icons/${file}.png`} alt={label} style={{ height: 22, width: 'auto', maxWidth: 56, objectFit: 'contain' }} />
            ))}
          </div>
        </div>
        <div>
          <h4>Nagrody</h4>
          <div style={{ ...row, display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'start', gap: '14px 22px' }}>
            {rewards.map(([file, label]) => (
              <img key={file} src={`/rewards/${file}.png`} alt={label} style={{ height: 34, width: 'auto' }} />
            ))}
          </div>
        </div>
        <div>
          <h4>Nasze sklepy</h4>
          <div style={{ ...row, gap: 12 }}>
            {countries.map(([code, label]) => (
              <a href="#" key={code} aria-label={label}>
                <img src={`/countries/${code}.svg`} alt={label} width="20" height="20" style={{ display: 'block', borderRadius: '50%', objectFit: 'cover' }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__legal">
        <p>W sklepie prezentujemy ceny brutto (z VAT). Stawki VAT dla konsumentów z kraju: Polska.</p>
        <p>NIP: 6070082443 · +48 668 806 323 (Pn–Pt 7:00–15:00) · sklep@sollux.pl · Sollux Lighting Sp. z o.o., Władysława Łokietka 35, 64-840 Budzyń (POLSKA)</p>
      </div>
    </footer>
  )
}
