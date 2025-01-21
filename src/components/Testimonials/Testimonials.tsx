import { dataTestmonialsLKHH } from "../../data/dataTestHH+LK";
import StdCard from "../StdCard/StdCard";
import Title from "../Title/Title";


export default function Testimonials() {
  return (
    <section>
      <Title title="Student Reviews" p="feedback and reviews from students who have enrolled in courses." btn="View All"/>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">        
        {dataTestmonialsLKHH.map((e,i)=> (
          <StdCard key={i} name={e.theName} par={e.par} img={e.imag}/>))}
      </div>
    </section>
  )
}
