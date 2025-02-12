import Button from "../../Ui/Button/Button";
interface stdProps
{
  par:string;
  name:string;
  img:string;
}
export default function StdCard({par, name ,img } :stdProps) {
  return (
    <div className=" rounded-xl overflow-hidden 0">
      <div className=" md:p-10 p-5 bg-white ">
        <p className=" md:text-base text-sm font-normal">{par}</p>
      </div>
      <div className=" border-t border-slate-500/5 bg-White/99 py-6  md:p-10 p-5 flex justify-between">
        <div className=" flex md:gap-5 gap-2 items-center"> 
            <img src={img} alt="student say " className=" md:w-auto w-7.5" />
            <p  className=" md:text-base text-sm font-normal">{name}</p>
        </div>
        <Button text="Read Full Story" Bg="bg-white border" textColor=""/>
      </div>
    </div>
  )
}
