import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"

interface logbtn 
{
  btn: string;
}

export default function Login({btn} : logbtn ) {
    const {t} = useTranslation()
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')
    const navigate = useNavigate();
    const send = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      axios.post('http://127.0.0.1:8000/api/login', {email: email, password: password})
        .then(response => {
          console.log(response.data);

          if (response.data.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('name' ,response.data.user.name)
              navigate('/');
            }
        })
        .catch(error => {
          console.error("Error during signup:", error);
          alert(t("Signup failed"));
        });
    };
  return (
    <form onSubmit={send} className=' flex flex-col mb-6 '>
      <label className='mb-2.5 font-medium text-base block' htmlFor="">{t("Email")}</label>
      <input
        className="w-full p-5 mb-5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("EmailPlace")}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className='mb-2.5 font-medium text-base block' htmlFor="">{t("Password")}</label>
      <input value={password}
        onChange={(e) => setPassword(e.target.value)} className="mb-5 w-full p-5 placeholder:text-base bg-White/95 rounded-md" placeholder={t("PasswordPlace")} type="password" />
      <Link className="block text-right text-base font-normal text-gray-700 mb-5" to={'/ResetPassword'}>{t("ForgotPassword")}</Link>
      <button className="w-full text-white py-4.5 px-5 rounded-lg bg-violet-950">{t(btn)}</button>
    </form>
  )
}
 