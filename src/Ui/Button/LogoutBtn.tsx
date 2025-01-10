import { btn } from "../../types/interfaces";
import logout from '../../assets/icons/sign-out-alt 1.png'

export default function LogoutBtn({ onClick } : btn ) {

  return (
    <button onClick={onClick}>
        <img src={logout} alt="logout" />
    </button>
  )
}
