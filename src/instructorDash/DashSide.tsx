import { instractSide } from "../data/sideDashData";
import Logo from "../Ui/Logo/Logo";
import NavLinkDash from "../Ui/NavLinkDash/NavLinkDash";

export default function DashSide() {
  return (
    <div className=" w-2/12 bg-gray-900 lg:block hidden ">
        <div className="flex text-white items-center  p-2.5 border-b gap-2.5">
          <Logo/>
        </div>
        <div className=" flex flex-col items-center gap-2.5 py-4 text-sm">
            {instractSide.map((e) =>(
                <NavLinkDash  pathLink={e.pathLink} title={e.title} icon={e.img}/>
            ))}
        </div>
    </div>
  )
}
