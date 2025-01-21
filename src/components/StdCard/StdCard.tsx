import Button from "../../Ui/Button/Button";

export default function StdCard({par, name ,img }) {
  return (
    <div className=" rounded-xl overflow-hidden 0">
      <div className=" p-10 bg-white ">
        <p className=" text-base font-normal">{par}</p>
      </div>
      <div className=" border-t border-slate-500/5 bg-White/99 py-6 px-10 flex justify-between">
        <div className=" flex gap-5 items-center"> 
            <img src={img} alt="student say " />
            <p>{name}</p>
        </div>
        <Button text="Read Full Story" Bg="bg-wite/95" textColor=""/>
      </div>
    </div>
  )
}
