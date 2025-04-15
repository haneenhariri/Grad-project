import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutBtn from '../../Ui/Button/LogoutBtn';
import { logout } from '../../services/authService';
import { logoutSuccess } from '../../redux/authSlice/index';      
import { removeSecureCookie } from '../../utils/cookiesHelper';
import { showToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeSecureCookie('token');
      removeSecureCookie('role');
      showToast(t('LogoutSuccess'), 'success');
      dispatch(logoutSuccess());
      navigate('/');
    },
    onError: (error) => {
      console.error('Error during logout:', error);
      showToast(t('LogoutError'), 'error');
    },
  });

  return (
    <div>
      <LogoutBtn onClick={() => mutate()} />
    </div>
  );
}
