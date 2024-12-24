import HeroSection from "./HeroSection";
import Navbar from "./shared/navbar";
import CategoryCarousel from "./CategoryCarousel";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection></HeroSection>
      <CategoryCarousel></CategoryCarousel>
    </>
  );
};

export default Home;
