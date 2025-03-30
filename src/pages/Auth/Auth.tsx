import Form from "../../components/Form/Form"
import { useLocation } from "react-router-dom";
import SliderSectionHH from "../../components/SliderSectionHH/SliderSectionHH";


export default function Auth() {
 const location = useLocation();
  return (
    <section className="pt-[150px]   desktop:pb-paddingBottom150 md:pb-100 pb-paddingBottom50 px-4 lg:px-20 1600:px-40 flex lg:flex-row flex-col-reverse justify-between gap-y-[50px]">
{/*         <SliderSectionHH/>
 */}      {location.pathname === '/auth/login' ? 
      ( <Form title={"logIn.Login"} formText={"logIn.formTextLogin"} LogBtn={"logIn.Login"} />) 
      :
      ( <Form title={"signUp.SignUp"} formText={"signUp.formTextSign"} LogBtn={"SignUp"} />)
      }
     
    </section>
  )
}
