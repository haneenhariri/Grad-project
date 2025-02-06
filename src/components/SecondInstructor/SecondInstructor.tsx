import SmallSecondInstructor from "../SmallSecondInstructor/SmallSecondInstructor";
import img1 from "../../../src/assets/instructor/icons/Users.png"
import img2 from "../../../src/assets/instructor/icons/Notebook.png"
import img3 from "../../../src/assets/instructor/icons/GlobeHemisphereWest.png"
import img4 from "../../../src/assets/instructor/icons/CircleWavyCheck.png"
import img5 from "../../../src/assets/instructor/icons/Stack.png"
export default function SecondInstructor() {
  return (
    <section className="flex bg-violet-400 py-10 justify-between px-4 lg:px-20 desktop:px-40">
      <SmallSecondInstructor icon={img1} alt={"users icon"} span1={"67.1k"} span2={"Students"}/>
      <SmallSecondInstructor icon={img2} alt={"notebook icon "} span1={"26k"} span2={"Certified Instructor"}/>
      <SmallSecondInstructor icon={img3} alt={"global icon"} span1={"72"} span2={"Country Language"}/>
      <SmallSecondInstructor icon={img4} alt={"circle icon "} span1={"99.9%"} span2={"Success Rate"}/>
      <SmallSecondInstructor icon={img5} alt={"stack icon "} span1={"57"} span2={"Trusted Companies"}/>
    </section>
  )
}
// jojo
