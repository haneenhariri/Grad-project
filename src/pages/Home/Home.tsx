import Benefits from "../../components/Benefits/Benefits";
import Company from "../../components/Company/Company";
import Courses from "../../components/Courses/Courses";
import FooterSup from "../../components/Footer/FooterSup";
import Hero from "../../components/Hero/Hero";
import Instuctor from "../../components/Instuctor/Instuctor";
import Testimonials from "../../components/Testimonials/Testimonials";



export default function Home() {
  return (
    <>
    <section className="px-4 lg:px-20 desktop:px-40">
      <Hero/>
      <Company/>
      <Benefits/>
      <Courses/>
      <Testimonials/>
      <Instuctor/>
      </section>
      <FooterSup/>
    </>

  )
}
