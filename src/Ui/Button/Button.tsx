import { btn } from "../../types/interfaces";

export default function Button({text , Bg ,type, textColor,onClick } : btn ) {

  return (
    <button type={type} onClick={onClick} className={`py-2.5 md:px-5 p-2.5 sm:text-base text-sm ${Bg}  ${textColor}   rounded-md`}>
      {text}
    </button>
  )
}
