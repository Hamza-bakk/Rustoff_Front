import Hero from "../../components/Hero/hero"
import AboutMe from "../../components/AboutMe/aboutme";
import Gallery from "../../components/Gallery/gallery"; // Assure-toi que le chemin du fichier est correct

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutMe />
      <Gallery />
    </div>
  )
}

export default Home
