import { copmanyImg } from "../../data/company";

export default function Company() {
  return (
    <section className="overflow-hidden my-[80px]">
      <div className="flex w-full animate-scrollContinuous">
        {copmanyImg.map((e, i) => (
          <div key={i} className="flex-shrink-0 w-1/6 px-4">
            <img src={e.img} alt={e.alt} className="max-w-full" />
          </div>
        ))}
        {copmanyImg.map((e, i) => (
          <div key={`${i}-duplicate`} className="flex-shrink-0 w-1/6 px-4">
            <img src={e.img} alt={e.alt} className="max-w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
