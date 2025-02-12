import { BenfCard } from "../../types/interfaces";
import { useTranslation } from "react-i18next";


export default function BenCard({num , h , p} : BenfCard) {
 const { t } = useTranslation();
  return (
    <div className=" lg:p-10 p-5 bg-white rounded-lg ">
        <h2 className=" text-right font-bold lg:text-[60px] md:text-[45px] text-2xl md-5 md:mb-10">{t(num)}</h2>
        <h1 className=" font-semibold sm:text-xl text-lg mb-2.5">{t(h)}</h1>
        <p className=" sm:text-base text-sm font-normal">{t(p)}</p>
    </div>
  )
}
