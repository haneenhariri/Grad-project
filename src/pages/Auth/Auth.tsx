import { useTranslation } from "react-i18next"
import Form from "../../components/Form/Form"
import { useLocation } from "react-router-dom";
import StdCard from "../../components/StdCard/StdCard";


export default function Auth() {
 const {t} = useTranslation();
 const location = useLocation();
  return (
    <section className="px-4 lg:px-20 desktop:px-40 pt-20 pb-40 flex gap-10  items-center">
      <div className="w-1/2">
        <h2>{t("Testimonials")}</h2>
        <StdCard/>
      </div>
      {location.pathname === '/auth/login' ? 
      ( <Form title={"Login"} formText={"formTextLogin"} LogBtn={"Login"} />) 
      :
      ( <Form title={"SignUp"} formText={"formTextSign"} LogBtn={"SignUp"} />)
      }
     
    </section>
  )
}
