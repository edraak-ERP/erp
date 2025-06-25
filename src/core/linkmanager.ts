import LocalStorage from '../storage/LocalStorage';

/**
 * مدير الروابط الداخلية بين الملاحظات
 * مشابه لنظام Obsidian للروابط الداخلية
 */
class LinkManager {
  private static instance: LinkManager;
  private links: Record<string, string[]> = {};

  private constructor() {}

  public static getInstance(): LinkManager {
    if (!LinkManager.instance) {
      LinkManager.instance = new LinkManager();
    }
    return LinkManager.instance;
  }

  /**
   * إنشاء رابط بين ملاحظتين
   * @param source المصدر
   * @param target الهدف
   */
  createLink(source: string, target: string): void {
    if (!this.links[source]) {
      this.links[source] = [];
    }
    
    if (!this.links[source].includes(target)) {
      this.links[source].push(target);
      this.saveLinks();
    }
  }

  /**
   * الحصول على جميع الروابط من ملاحظة معينة
   * @param noteName اسم الملاحظة
   * @returns قائمة بالملاحظات المرتبطة
   */
  getLinksFrom(noteName: string): string[] {
    return this.links[noteName] || [];
  }

  /**
   * الحصول على جميع الروابط إلى ملاحظة معينة
   * @param noteName اسم الملاحظة
   * @returns قائمة بالملاحظات المرتبطة
   */
  getLinksTo(noteName: string): string[] {
    const result: string[] = [];
    
    for (const source in this.links) {
      if (this.links[source].includes(noteName)) {
        result.push(source);
      }
    }
    
    return result;
  }

  /**
   * توليد الرسم البياني للروابط
   * @returns بيانات الرسم البياني
   */
  generateGraphData(): { nodes: any[], links: any[] } {
    const nodes: any[] = [];
    const links: any[] = [];
    const nodeSet = new Set<string>();
    
    // جمع جميع العقد
    for (const source in this.links) {
      nodeSet.add(source);
      this.links[source].forEach(target => nodeSet.add(target));
    }
    
    // إنشاء العقد
    nodeSet.forEach(node => {
      nodes.push({ id: node, name: node });
    });
    
    // إنشاء الروابط
    for (const source in this.links) {
      this.links[source].forEach(target => {
        links.push({ source, target });
      });
    }
    
    return { nodes, links };
  }

  private saveLinks(): void {
    LocalStorage.getInstance().setItem('note_links', this.links);
  }

  public loadLinks(): void {
    const savedLinks = LocalStorage.getInstance().getItem('note_links');
    if (savedLinks) {
      this.links = savedLinks;
    }
  }
}

export default LinkManager;