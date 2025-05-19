import Pusher from 'pusher-js';
import { getSecureCookie } from '../utils/cookiesHelper';

class DirectPusherService {
  private pusher: Pusher | null = null;
  private channels: Record<string, any> = {};
  
  initialize() {
    if (this.pusher) return;
    
    const token = getSecureCookie('token');
    if (!token) {
      console.error('Authentication token not found');
      return;
    }
    
    try {
      // استخدام المفتاح من متغيرات البيئة أو القيمة الثابتة
      const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY || '51cb977726ad1dd37a3b';
      const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1';
      
      console.log('Initializing Direct Pusher with:');
      console.log('- Pusher key:', pusherKey);
      console.log('- Pusher cluster:', pusherCluster);
      console.log('- Token:', token ? 'Available' : 'Not available');
      
      // تكوين Pusher مباشرة
      this.pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
        forceTLS: true,
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        enabledTransports: ['ws', 'wss'],
        disabledTransports: ['xhr_streaming', 'xhr_polling', 'sockjs'],
        enableLogging: true
      });
      
      // الاستماع لتغييرات حالة الاتصال
      this.pusher.connection.bind('state_change', (states: { previous: string; current: string }) => {
        console.log(`Direct Pusher connection state changed from ${states.previous} to ${states.current}`);
      });
      
      // الاستماع لأخطاء الاتصال
      this.pusher.connection.bind('error', (err: any) => {
        console.error('Direct Pusher connection error:', err);
      });
      
      // الاستماع لنجاح الاتصال
      this.pusher.connection.bind('connected', () => {
        console.log('Direct Pusher connected successfully');
      });
      
      console.log('Direct Pusher service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Direct Pusher service:', error);
    }
  }
  
  subscribeToChannel(channelName: string) {
    if (!this.pusher) {
      this.initialize();
      if (!this.pusher) {
        throw new Error('Failed to initialize Pusher');
      }
    }
    
    console.log(`Subscribing to channel: ${channelName}`);
    
    // الاشتراك في القناة
    const channel = this.pusher.subscribe(channelName);
    
    // الاستماع لأحداث الاشتراك
    channel.bind('pusher:subscription_succeeded', () => {
      console.log(`Successfully subscribed to channel: ${channelName}`);
    });
    
    channel.bind('pusher:subscription_error', (error: any) => {
      console.error(`Error subscribing to channel ${channelName}:`, error);
    });
    
    // تخزين القناة
    this.channels[channelName] = channel;
    
    return channel;
  }
  
  listenToEvent(channelName: string, eventName: string, callback: (data: any) => void) {
    if (!this.channels[channelName]) {
      this.subscribeToChannel(channelName);
    }
    
    console.log(`Listening to event ${eventName} on channel ${channelName}`);
    this.channels[channelName].bind(eventName, callback);
    
    // إرجاع دالة لإلغاء الاستماع
    return () => {
      if (this.channels[channelName]) {
        this.channels[channelName].unbind(eventName, callback);
      }
    };
  }
  
  unsubscribeFromChannel(channelName: string) {
    if (this.pusher && this.channels[channelName]) {
      this.pusher.unsubscribe(channelName);
      delete this.channels[channelName];
      console.log(`Unsubscribed from channel: ${channelName}`);
    }
  }
  
  disconnect() {
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
      this.channels = {};
      console.log('Disconnected from Pusher');
    }
  }
}

const directPusherService = new DirectPusherService();
export default directPusherService;