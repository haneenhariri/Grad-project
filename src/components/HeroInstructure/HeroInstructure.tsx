import { useNavigate } from "react-router-dom"
import HeroPic from "../../../src/assets/instructor/heroinstructor.png"
import Button from "../../Ui/Button/Button"
import { useTranslation } from "react-i18next"

export default function HeroInstructure() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const handelNav = () =>
  {
    navigate('/InstructorForm')
  }
  return (
    <section className="mt-[108px] flex justify-between items-center px-4 lg:px-10 desktop:px-40 h-full">
        {/* left div */}
      <div className="w-1/2">
        <h3 className="text-5xl mb-8">{t("instructor.becomeInstructor")}</h3>
        <p className="text-xl text-gray-500 leading-8 mb-10">{t("instructor.becomeInstructorDesc")}</p>
        <Button text={t("getStarted")} Bg='bg-btn w-1/3' textColor='text-white' onClick={handelNav} />
 
      </div>
      {/* right left */}
      <img src={HeroPic} alt={t("instructor.instructorImage")} className="w-5/12"/>

    </section>
  )
}
