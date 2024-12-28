import { BenfCard } from "../../types/interfaces";
import { useTranslation } from "react-i18next";


export default function BenCard({num , h , p} : BenfCard) {
 const { t } = useTranslation();
  return (
    <div className=" p-10 bg-white rounded-lg ">
        <h2 className=" text-right font-bold lg:text-[60px] md:text-[45px] text-2xl mb-10">{t(num)}</h2>
        <h1 className=" font-semibold text-xl mb-2.5">{t(h)}</h1>
        <p className=" text-base font-normal">{t(p)}</p>
    </div>
  )
}
