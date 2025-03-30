import { useTranslation } from "react-i18next";
import { btn } from "../../types/interfaces";

export default function Button({text , Bg ,type, textColor,onClick } : btn ) {
  const {t} = useTranslation()
  return (
    <button type={type} onClick={onClick} className={`py-2.5 md:px-5 p-2.5 sm:text-base text-sm ${Bg} ${textColor} rounded-md`}>
      {t(`btn.${text}`)}
    </button>
  )
}
