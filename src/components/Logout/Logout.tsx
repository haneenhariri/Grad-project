import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from '../../Ui/Button/LogoutBtn'

export default function Logout() {
    const navigate = useNavigate()
    const logout = () =>
        {
           axios.post('http://127.0.0.1:8000/api/logout',{},
            {
              headers:
              {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
               Accept: 'application/json'
              }
            })
          
              .then(() => {localStorage.removeItem('token'); 
                navigate('/')
              })
        }
  return (
    <div>
         <LogoutBtn onClick={(logout)}/>
    </div>
  )
}
