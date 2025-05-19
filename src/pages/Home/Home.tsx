import Courses from "../../components/Courses/Courses";
import Hero from "../../components/Hero/Hero";
import Instuctor from "../../components/Instuctor/Instuctor";
import Recommended from "../../components/Recommended/Recommended";
import TopCategory from "../../components/TopCategory/TopCategory";


export default function Home() {
  return (
    <>
      <div className="hero-wrapper overflow-hidden">
        <Hero/>
      </div>
      <section className="px-4 lg:px-10 desktop:px-40">
        <TopCategory/>
        <Courses/>
        <Instuctor/>
        <Recommended/>
      </section>
    </>
  )
}
