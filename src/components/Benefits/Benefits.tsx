import { benefitsData } from "../../data/benefits";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import BenCard from "../BenCard/BenCard";


export default function Benefits() {
  return (
    <section className="mb-20">
      <div className=" flex justify-center ">
        <SectionsTitle title="Services.title"/>
      </div>
      <div className="">
        {benefitsData.map((e, i) => (
          <BenCard key={i} img={e.img} imgRTL={e.imgRTL} h={e.h} p={e.p} flex={e.flex} />
        ))}
      </div>
    </section>
  );
}
