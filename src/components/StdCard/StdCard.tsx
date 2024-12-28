import Button from "../../Ui/Button/Button";
import std from '../../assets/StdImg/Image (17).png'

export default function StdCard() {
  return (
    <div className=" rounded-xl overflow-hidden 0">
      <div className=" p-10 bg-white ">
        <p className=" text-base font-normal">The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!</p>
      </div>
      <div className=" border-t border-slate-500/5 bg-White/99 py-6 px-10 flex justify-between">
        <div className=" flex gap-5 items-center"> 
            <img src={std} alt="student say " />
            <p>Sarah L</p>
        </div>
        <Button text="Read Full Story" Bg="bg-wite/95" textColor=""/>
      </div>
    </div>
  )
}
