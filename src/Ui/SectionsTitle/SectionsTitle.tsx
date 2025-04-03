import { useTranslation } from "react-i18next";
import { TitlePropsType } from "../../types/interfaces";

export default function SectionsTitle({title} : TitlePropsType) {
  const {t} = useTranslation()
  return (
    <h2 className=" lg:text-4xl md:text-3xl font-semibold  text-2xl lg:mb-10 mb-5 ">
      {t(title)}
    </h2>
  )
}
