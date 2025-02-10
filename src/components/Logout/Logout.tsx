import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutBtn from '../../Ui/Button/LogoutBtn';
import { logout } from '../../services/authService';
import { logoutSuccess } from '../../redux/authSlice/index';      
import { removeSecureCookie } from '../../utils/cookiesHelper';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isError } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeSecureCookie('token');
      removeSecureCookie('role');
      dispatch(logoutSuccess());
      navigate('/');
    },
    onError: (error) => {
      console.error('Error during logout:', error);
    },
  });

  return (
    <div>
      <LogoutBtn onClick={() => mutate()} />
      {isError && <p className="text-red-500">An error occurred during logout. Please try again.</p>}
    </div>
  );
}
