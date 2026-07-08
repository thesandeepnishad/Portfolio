import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import TechStack from './sections/TechStack'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import useColorPalette from './useColorPalette'
const App = () => {
  useColorPalette();
  return (
    <div>
      <Hero />
      <About />
      {/* <TechStack /> */}
      <Skills />
      <Projects />
      <Experience />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default App