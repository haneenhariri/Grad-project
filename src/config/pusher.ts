// تكوين Pusher المركزي
export const PUSHER_CONFIG = {
  // مفتاح التطبيق - استخدم القيمة من متغيرات البيئة أو القيمة الافتراضية
  appKey: import.meta.env.VITE_PUSHER_APP_KEY || 'app-key',
  
  // المجموعة - استخدم القيمة من متغيرات البيئة أو القيمة الافتراضية
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
  
  // عنوان خادم المصادقة
  authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
  
  // استخدام خادم محلي (true) أو خدمة Pusher السحابية (false)
  useLocalServer: true,
  
  // إعدادات الخادم المحلي
  wsHost: '127.0.0.1',
  wsPort: 6001,
  
  // تمكين السجلات للتصحيح
  enableLogging: true
};