import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Tiles from '../components/Tiles.jsx'
import ShaderSection from '../components/ShaderSection.jsx'
import Footer from '../components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Tiles />
        <ShaderSection />
      </main>
      <Footer />
    </>
  )
}
