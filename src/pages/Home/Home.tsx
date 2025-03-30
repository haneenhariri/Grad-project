import Benefits from "../../components/Benefits/Benefits";
import Courses from "../../components/Courses/Courses";
import FooterSup from "../../components/Footer/FooterSup";
import Hero from "../../components/Hero/Hero";
import Instuctor from "../../components/Instuctor/Instuctor";
import Testimonials from "../../components/Testimonials/Testimonials";
import TopCategory from "../../components/TopCategory/TopCategory";


export default function Home() {
  return (
    <>
    <section className="px-4 lg:px-10 desktop:px-40">
      <Hero/>
      <TopCategory/>
      <Benefits/>
      <Courses/>
      <Testimonials/>
      <Instuctor/>
      </section>
      <FooterSup/>
    </>

  )
}
