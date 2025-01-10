import { btn } from "../../types/interfaces";

export default function Button({text , Bg , textColor, onClick } : btn ) {

  return (
    <button onClick={onClick} className={`py-2.5 md:px-5 p-2.5 text-base sm:text-sm ${Bg}  ${textColor}   rounded-md`}>
      {text}
    </button>
  )
}
