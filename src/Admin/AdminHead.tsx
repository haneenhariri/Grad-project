import { useTranslation } from "react-i18next";
import AuthSide from "../components/NavBar/AuthSide";


export default function AdminHead() {
  const {t} = useTranslation()
  return (
    <div className=" w-full shadow-sm px-10 flex items-center justify-between py-2.5 bg-white h-[61px]">
      <div>
      <h1>{t('Administrator')}</h1>
      </div>
       <AuthSide/>
    </div>
  )
}
