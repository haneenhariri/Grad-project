import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { getSecureCookie } from './cookiesHelper';

// اجلب التوكن من localStorage أو cookie حسب طريقة التخزين لديك
const token = getSecureCookie('token');

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  },
});

export default echo;
