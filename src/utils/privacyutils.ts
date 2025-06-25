/**
 * أدوات الخصوصية والأمان
 * توفر وظائف للتحقق من متطلبات الخصوصية
 */
import KeyManager from '../core/encryption/KeyManager';

export class PrivacyUtils {
  /**
   * التحقق من قوة كلمة المرور
   * @param password كلمة المرور
   * @returns مستوى القوة (0-4)
   */
  static checkPasswordStrength(password: string): number {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  }

  /**
   * التحقق من توافق المتصفح مع واجهة نظام الملفات
   * @returns true إذا كان المتصفح يدعم API
   */
  static checkFileSystemCompatibility(): boolean {
    return 'showDirectoryPicker' in window && 'showOpenFilePicker' in window;
  }

  /**
   * توليد معرف فريد للمستخدم
   * @returns معرف فريد
   */
  static generateUserID(): string {
    return KeyManager.generateRandomKey(16);
  }

  /**
   * تسجيل أحداث الأمان
   * @param event نوع الحدث
   * @param details تفاصيل الحدث
   */
  static logSecurityEvent(event: string, details: Record<string, any> = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      userAgent: navigator.userAgent,
      ...details
    };
    
    console.log('[SECURITY LOG]', logEntry);
    // يمكن إضافة إرسال إلى سيرفر مركزي هنا (مع حماية الخصوصية)
  }
}