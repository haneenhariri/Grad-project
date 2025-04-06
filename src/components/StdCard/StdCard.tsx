import { stdProps } from "../../types/interfaces";

export default function StdCard({par, name ,img } :stdProps) {
  return (
    <div className=" rounded-xl overflow-hidden 0">
      
      <div className=" md:p-10 p-5 bg-white ">
        <div className=" flex md:gap-5 mb-5 rtl:flex-row-reverse gap-2 items-center"> 
            <img src={img} alt="student say " className=" rounded-full w-auto" />
            <p  className=" md:text-base text-sm font-normal">{name}</p>
        </div>
        <p className="text-center md:text-base text-sm font-normal">{par}</p>
      </div>
    </div>
  )
}
