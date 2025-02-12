import { benefitsData } from "../../data/benefits";
import BenCard from "../BenCard/BenCard";


export default function Benefits() {
  return (
    <section className="mb-20">
      <h2 className=" font-semibold sm:text-3xl text-xl text-[#0A033C] mb-7.5">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitsData.map((e, i) => (
          <BenCard key={i} num={e.num} h={e.h} p={e.p} />
        ))}
      </div>
    </section>
  );
}
