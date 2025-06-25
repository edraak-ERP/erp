import LocalStorage from '../storage/LocalStorage';
import CryptoService from '../encryption/CryptoService';

/**
 * محرك قواعد البيانات المشابه لـ Notion
 * يدعم إنشاء الجداول والحقول وأنواع البيانات المختلفة
 */
class DatabaseEngine {
  private static instance: DatabaseEngine;
  private databases: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): DatabaseEngine {
    if (!DatabaseEngine.instance) {
      DatabaseEngine.instance = new DatabaseEngine();
    }
    return DatabaseEngine.instance;
  }

  /**
   * إنشاء قاعدة بيانات جديدة
   * @param name اسم قاعدة البيانات
   * @param schema تصميم قاعدة البيانات
   */
  createDatabase(name: string, schema: Record<string, string>): void {
    this.databases[name] = {
      schema,
      rows: []
    };
    
    LocalStorage.getInstance().setItem(`db_${name}`, this.databases[name]);
  }

  /**
   * إضافة صف إلى قاعدة البيانات
   * @param dbName اسم قاعدة البيانات
   * @param data البيانات
   */
  addRow(dbName: string, data: Record<string, any>): void {
    if (!this.databases[dbName]) {
      throw new Error('قاعدة البيانات غير موجودة');
    }
    
    // التحقق من المطابقة مع التصميم
    for (const key in this.databases[dbName].schema) {
      if (!data.hasOwnProperty(key)) {
        throw new Error(`الحقل ${key} مطلوب`);
      }
    }
    
    this.databases[dbName].rows.push(data);
    LocalStorage.getInstance().setItem(`db_${dbName}`, this.databases[dbName]);
  }

  /**
   * استعلام البيانات
   * @param dbName اسم قاعدة البيانات
   * @param query استعلام البحث
   * @returns الصفوف المطابقة
   */
  query(dbName: string, query: Record<string, any> = {}): any[] {
    if (!this.databases[dbName]) {
      throw new Error('قاعدة البيانات غير موجودة');
    }
    
    return this.databases[dbName].rows.filter((row: any) => {
      for (const key in query) {
        if (row[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * تحميل قاعدة البيانات من التخزين المحلي
   * @param dbName اسم قاعدة البيانات
   */
  loadDatabase(dbName: string): void {
    const db = LocalStorage.getInstance().getItem(`db_${dbName}`);
    if (db) {
      this.databases[dbName] = db;
    }
  }
}

export default DatabaseEngine;