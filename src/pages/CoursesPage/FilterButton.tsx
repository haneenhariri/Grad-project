import { useTranslation } from "react-i18next";
import filterIcon from "../../assets/Faders.png";

export default function FilterButton({onClick} : {onClick : () => void}) {
    const {t} = useTranslation()
  return (
    <button
    className="flex rtl:flex-row-reverse w-max gap-2.5 items-center md:text-base text-sm py-2.5 md:px-5 px-2.5 border border-violet-950"
    onClick={onClick}
  >
    <img src={filterIcon} alt="filter" />
    {t("Filter")}
  </button>
  )
}
