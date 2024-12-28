import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
        <button
           onClick={(logout)}
           className='link-log'>
           logout
        </button>
    </div>
  )
}
