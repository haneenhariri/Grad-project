import { benefitsData } from "../../data/benefits";
import SectionsTitle from "../../Ui/SectionsTitle/SectionsTitle";
import BenCard from "../BenCard/BenCard";


export default function Benefits() {
  return (
    <section className="mb-20">
      <div className=" flex justify-center">
        <SectionsTitle title="Services.title"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitsData.map((e, i) => (
          <BenCard key={i} num={e.num} h={e.h} p={e.p} />
        ))}
      </div>
    </section>
  );
}
