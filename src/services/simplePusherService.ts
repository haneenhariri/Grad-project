import Pusher from 'pusher-js';
import { getSecureCookie } from '../utils/cookiesHelper';
import { PusherMessageEvent } from '../types/interfaces';

class SimplePusherService {
  private pusher: Pusher | null = null;
  private channels: Record<string, any> = {};
  private messageHandlers: Record<number, ((data: PusherMessageEvent) => void)[]> = {};

  // تهيئة اتصال Pusher
  initialize() {
    if (this.pusher) return this.pusher;
    
    const token = getSecureCookie('token');
    if (!token) {
      console.error('Authentication token not found');
      return null;
    }
    
    try {
      // استخدام المفتاح من متغيرات البيئة
      const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY || '51cb977726ad1dd37a3b';
      const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER || 'eu';
      
      console.log('Initializing Pusher with:');
      console.log('- Pusher key:', pusherKey);
      console.log('- Pusher cluster:', pusherCluster);
      
      // استخدام المسار النسبي بدلاً من المطلق لتجنب مشاكل CORS
      const authEndpoint = '/broadcasting/auth';
      
      // تكوين Pusher للاتصال بخدمة Pusher السحابية
      this.pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
        forceTLS: true,
        authEndpoint: authEndpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
          }
        },
        enabledTransports: ['ws', 'wss'],
        disabledTransports: ['xhr_streaming', 'xhr_polling', 'sockjs'],
        enableLogging: true,
        pongTimeout: 30000,      // زيادة مهلة انتظار رد pong
        activityTimeout: 120000, // زيادة مهلة النشاط
        unavailableTimeout: 30000 // زيادة مهلة عدم التوفر
      });
      
      // الاستماع لتغييرات حالة الاتصال
      this.pusher.connection.bind('state_change', (states: { previous: string; current: string }) => {
        console.log(`Pusher connection state changed from ${states.previous} to ${states.current}`);
        
        // إعادة الاشتراك في القنوات عند إعادة الاتصال
        if (states.previous === 'connecting' && states.current === 'connected') {
          this.resubscribeToChannels();
        }
      });
      
      // الاستماع لأخطاء الاتصال
      this.pusher.connection.bind('error', (err: any) => {
        console.error('Pusher connection error:', err);
        
        // محاولة إعادة الاتصال بعد فترة دون إظهار رسالة للمستخدم
        setTimeout(() => {
          if (this.pusher && this.pusher.connection.state !== 'connected') {
            console.log('Attempting to reconnect to Pusher...');
            this.pusher.connect();
          }
        }, 5000);
      });
      
      // الاستماع لنجاح الاتصال
      this.pusher.connection.bind('connected', () => {
        console.log('Pusher connected successfully');
      });
      
      return this.pusher;
    } catch (error) {
      console.error('Failed to initialize Pusher:', error);
      return null;
    }
  }
  
  // بدء اتصال المستخدم
  startUserConnection(userId: number): boolean {
    if (!userId) return false;
    
    // تهيئة Pusher إذا لم يكن موجود
    if (!this.pusher) {
      this.initialize();
      if (!this.pusher) return false;
    }
    
    try {
      // الاشتراك في قناة المستخدم الخاصة
      const channelName = `private-chat.user.${userId}`;
      console.log(`Subscribing to channel: ${channelName}`);
      
      // التحقق من وجود اشتراك سابق
      if (this.channels[channelName]) {
        console.log(`Already subscribed to channel: ${channelName}`);
        return true;
      }
      
      // الاشتراك في القناة
      const channel = this.pusher.subscribe(channelName);
      
      // الاستماع لأحداث الاشتراك
      channel.bind('pusher:subscription_succeeded', () => {
        console.log(`Successfully subscribed to channel: ${channelName}`);
      });
      
      channel.bind('pusher:subscription_error', (error: any) => {
        console.error(`Error subscribing to channel ${channelName}:`, error);
      });
      
      // الاستماع لحدث الرسائل
      channel.bind('message.sent', (data: PusherMessageEvent) => {
        console.log('Received message.sent event:', data);
        
        // التحقق من صحة البيانات المستلمة
        if (!data || !data.message) {
          console.error('Received invalid message data:', data);
          return;
        }
        
        // استدعاء جميع معالجات الرسائل المسجلة لهذا المستخدم
        if (this.messageHandlers[userId]) {
          console.log(`Calling ${this.messageHandlers[userId].length} handlers for user ${userId}`);
          this.messageHandlers[userId].forEach(handler => {
            try {
              handler(data);
            } catch (error) {
              console.error('Error in message handler:', error);
            }
          });
        } else {
          console.warn(`No message handlers registered for user ${userId}`);
        }
      });
      
      // إضافة الاستماع لأحداث أخرى قد تكون مهمة
      channel.bind('new-message', (data: PusherMessageEvent) => {
        console.log('Received new-message event:', data);
        if (this.messageHandlers[userId]) {
          this.messageHandlers[userId].forEach(handler => handler(data));
        }
      });
      
      // الاستماع لجميع الأحداث للتشخيص
      channel.bind_global((eventName: string, data: any) => {
        console.log(`[Channel ${channelName}] Received event: ${eventName}`, data);
      });
      
      // تخزين القناة
      this.channels[channelName] = channel;
      
      return true;
    } catch (error) {
      console.error('Error starting Pusher connection:', error);
      return false;
    }
  }
  
  // تسجيل معالج لاستلام الرسائل
  onMessageReceived(userId: number, handler: (data: PusherMessageEvent) => void): () => void {
    if (!userId) {
      console.error('Invalid user ID provided to onMessageReceived');
      return () => {};
    }
    
    console.log(`Registering message handler for user ${userId}`);
    
    if (!this.messageHandlers[userId]) {
      this.messageHandlers[userId] = [];
    }
    
    // تجنب تسجيل نفس المعالج مرتين
    const handlerExists = this.messageHandlers[userId].some(h => h === handler);
    if (handlerExists) {
      console.warn('Handler already registered, skipping duplicate');
      return () => {
        if (this.messageHandlers[userId]) {
          this.messageHandlers[userId] = this.messageHandlers[userId].filter(h => h !== handler);
        }
      };
    }
    
    this.messageHandlers[userId].push(handler);
    console.log(`Now ${this.messageHandlers[userId].length} handlers for user ${userId}`);
    
    // إرجاع دالة لإلغاء التسجيل
    return () => {
      console.log(`Unregistering message handler for user ${userId}`);
      if (this.messageHandlers[userId]) {
        this.messageHandlers[userId] = this.messageHandlers[userId].filter(h => h !== handler);
        console.log(`Now ${this.messageHandlers[userId].length} handlers for user ${userId}`);
      }
    };
  }
  
  // إلغاء الاشتراك من قناة
  unsubscribeFromChannel(userId: number): void {
    const channelName = `private-chat.user.${userId}`;
    if (this.pusher && this.channels[channelName]) {
      this.pusher.unsubscribe(channelName);
      delete this.channels[channelName];
      console.log(`Unsubscribed from channel: ${channelName}`);
    }
  }
  
  // إغلاق اتصال Pusher
  disconnect() {
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
      this.channels = {};
      this.messageHandlers = {};
      console.log('Disconnected from Pusher');
    }
  }
  
  // إعادة الاشتراك في جميع القنوات
  private resubscribeToChannels() {
    console.log('Resubscribing to all channels');
    
    // إعادة الاشتراك في جميع القنوات المخزنة
    Object.keys(this.channels).forEach(channelName => {
      console.log(`Resubscribing to channel: ${channelName}`);
      
      // استخراج معرف المستخدم من اسم القناة
      const match = channelName.match(/private-chat\.user\.(\d+)/);
      if (match && match[1]) {
        const userId = parseInt(match[1]);
        this.startUserConnection(userId);
      }
    });
  }
}

const simplePusherService = new SimplePusherService();
export default simplePusherService;







