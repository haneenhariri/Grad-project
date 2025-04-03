import { SliderButtonProps } from "../../types/interfaces";


export default function SliderButton({onClick , img } : SliderButtonProps) {
  return (
    <button 
     onClick={onClick}
     className=" desktop:p-3.5 p-3 flex  border rounded-lg  border-White/95 bg-white">
     <img src={img} alt="arrow" className="w-8 h-8" />
    </button>
  )
}
