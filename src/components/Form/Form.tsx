import { useTranslation } from "react-i18next";
import { form } from "../../types/interfaces";
import { Link, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";


export default function Form({title , formText , LogBtn } : form) {
  const {t} = useTranslation()
  const location = useLocation();
  return (
    <div className=" p-50 bg-white rounded-lg">
      <div className=" text-center mb-10">
        <h2 className=" font-semibold text-4xl mb-2">{t(title)}</h2>
        <p className=" text-base font-normal">{t(formText)}</p>
      </div>
      {location.pathname === '/auth/login' ? 
      (<Login btn={LogBtn}/> ): <SignUp btn={LogBtn}/> }
      {location.pathname === '/auth/login' ? 
      (<Link to={'/auth/signup'}>Don’t have an account? Sign Up</Link>) : (<Link to={'/auth/login'}>Already have an account? Login</Link>) }
    </div>
    
  )
}
