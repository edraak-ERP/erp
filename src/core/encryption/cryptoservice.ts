import { generateKey, encrypt, decrypt } from 'crypto-js';
import { enc } from 'crypto-js';

/**
 * خدمة التشفير لحماية بيانات المستخدم
 * تستخدم خوارزمية AES-256-CBC مع مفتاح مشتق من كلمة مرور المستخدم
 */
class CryptoService {
  private static salt = 'edrak-salt-2023';

  /**
   * توليد مفتاح تشفير من كلمة المرور
   * @param password كلمة مرور المستخدم
   * @returns مفتاح تشفير
   */
  private static generateEncryptionKey(password: string): string {
    return generateKey(password, this.salt).toString();
  }

  /**
   * تشفير البيانات
   * @param data البيانات المراد تشفيرها
   * @param password كلمة مرور المستخدم
   * @returns بيانات مشفرة
   */
  static encryptData(data: string, password: string): string {
    const key = this.generateEncryptionKey(password);
    return encrypt(data, key).toString();
  }

  /**
   * فك تشفير البيانات
   * @param encryptedData البيانات المشفرة
   * @param password كلمة مرور المستخدم
   * @returns بيانات مفكوكة
   */
  static decryptData(encryptedData: string, password: string): string {
    try {
      const key = this.generateEncryptionKey(password);
      return decrypt(encryptedData, key).toString(enc.Utf8);
    } catch (error) {
      console.error('فك التشفير فشل:', error);
      throw new Error('كلمة المرور غير صحيحة');
    }
  }

  /**
   * تشفير الملفات
   * @param file محتوى الملف
   * @param password كلمة مرور المستخدم
   * @returns ملف مشفر
   */
  static encryptFile(file: ArrayBuffer, password: string): ArrayBuffer {
    const key = this.generateEncryptionKey(password);
    const wordArray = enc.Hex.parse(file.toString());
    const encrypted = encrypt(wordArray, key);
    return enc.Hex.parse(encrypted.toString()).toArray();
  }

  /**
   * فك تشفير الملفات
   * @param encryptedFile ملف مشفر
   * @param password كلمة مرور المستخدم
   * @returns ملف مفكوك
   */
  static decryptFile(encryptedFile: ArrayBuffer, password: string): ArrayBuffer {
    const key = this.generateEncryptionKey(password);
    const encrypted = enc.Hex.parse(encryptedFile.toString());
    const decrypted = decrypt(encrypted, key);
    return enc.Hex.parse(decrypted.toString()).toArray();
  }
}

export default CryptoService;