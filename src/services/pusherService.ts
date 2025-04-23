import Pusher from 'pusher-js';

const pusher = new Pusher('51cb977726ad1dd37a3b', {  
  cluster: 'mt1',
  authEndpoint: 'http://your-laravel-api.com/broadcasting/auth',
  auth: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
});

export default pusher;