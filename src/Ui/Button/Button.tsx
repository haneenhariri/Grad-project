import { useTranslation } from "react-i18next";
import { btn } from "../../types/interfaces";

export default function Button({text , Bg , textColor, onClick } : btn ) {
    const {t} = useTranslation()
  return (
    <button onClick={onClick} className={`py-2.5 px-5 ${Bg}  ${textColor}   rounded-md`}>
      {t(text)}
    </button>
  )
}
