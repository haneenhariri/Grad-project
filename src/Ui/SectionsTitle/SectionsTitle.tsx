import { TitlePropsType } from "../../types/interfaces";

export default function SectionsTitle({title} : TitlePropsType) {
  return (
    <h2 className=" lg:text-5xl md:text-3xl font-semibold  text-2xl lg:mb-10 mb-5 ">
      {title}
    </h2>
  )
}
