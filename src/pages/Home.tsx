import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import Gallery from "@/components/gallery/Gallery";
import ServicesSection from "@/components/ServicesSection";
import FestivalSection from "@/components/FestivalSection";

const Home = () => (
  <Layout>
    <HeroSection />
    <IntroductionSection />
    <Gallery />
    <ServicesSection />
    <FestivalSection />
  </Layout>
);

export default Home;
