import { BenfCard } from "../../types/interfaces";
import { useTranslation } from "react-i18next";


export default function BenCard({img ,imgRTL, h , p , flex} : BenfCard) {
 const { t } = useTranslation();
  return (
    <div className={`flex ${flex} items-center gap-8 justify-between w-full `}>
        <img src={img} alt={h} className=" w-2/5 rtl:hidden"/>
        <img src={imgRTL} alt={h} className=" w-2/5 hidden rtl:block"/>
        <div className=" w-1/2">
          <h2>{t(h)}</h2>
          <p>{t(p)}</p>
        </div>
    </div>
  )
}
