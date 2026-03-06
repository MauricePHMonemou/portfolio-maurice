import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Formation from './components/Formation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ConstellationBG from './components/ConstellationBG'

function App() {
  return (
    <>
      <ConstellationBG />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Formation />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App