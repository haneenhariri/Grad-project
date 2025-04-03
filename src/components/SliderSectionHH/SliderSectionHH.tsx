import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import CustomSlider from "./CustomSlider";

export default function SliderSectionHH() {
  return (
    <div className=" lg:w-[45%] ">
      <div className=" mb-10 ">
        <SectionsTitle title="Testimonials"/>
      </div>
       <CustomSlider/>
    </div>
  )
}
