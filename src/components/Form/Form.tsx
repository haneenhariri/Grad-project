import { useTranslation } from "react-i18next";
import { form } from "../../types/interfaces";
import { Link, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";


export default function Form({title , formText , LogBtn } : form) {
  const {t} = useTranslation()
  const location = useLocation();
  return (
    <div className=" 1600:w-[41.25%] lg:w-[42.19%] desktop:p-12.5 md:p-10 p-7.5  desktop:rounded-xl md:rounded-[10px] bg-white">
      <div className=" text-center mb-10">
        <h2 className=" font-semibold lg:text-4xl text-2xl mb-2">{t(title)}</h2>
        <p className=" md:text-base text-sm font-normal">{t(formText)}</p>
      </div>
      {location.pathname === '/auth/login' ? 
      (<Login btn={LogBtn}/> ): <SignUp btn={LogBtn}/> }
      {location.pathname === '/auth/login' ? 
      (<Link className="md:text-base text-sm" to={'/auth/signup'}>Don’t have an account? Sign Up</Link>) : (<Link className="md:text-base text-sm" to={'/auth/login'}>Already have an account? Login</Link>) }
    </div>
    
  )
}
