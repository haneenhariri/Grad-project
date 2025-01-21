import { SliderButtonProps } from "../../interfaces";

export default function SliderButton({onClick , img } : SliderButtonProps) {
  return (
    <button 
     onClick={onClick}
     className=" desktop:p-3.5 p-3  border rounded-lg  border-White/95 bg-white">
     <img src={img} alt="arrow" className=" desktop:w-[34px] desktop:h-[34px] w-7.5 h-7.5" />
    </button>
  )
}
