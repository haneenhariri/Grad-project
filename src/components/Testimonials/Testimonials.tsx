import StdCard from "../StdCard/StdCard";
import Title from "../Title/Title";


export default function Testimonials() {
  return (
    <section>
      <Title title="Our Testimonials" p="Lorem ipsum   Ac cum eget habitasse in velit fringilla feugiat senectus in." btn="View All"/>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <StdCard/>
        <StdCard/>
        <StdCard/>
        <StdCard/>
      </div>
    </section>
  )
}
