// 语言切换功能
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.init();
  }

  init() {
    // 设置初始语言
    document.documentElement.lang = this.currentLang;
    this.updateContent();
    
    // 绑定切换按钮事件
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
      this.updateButtonText();
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('language', this.currentLang);
    document.documentElement.lang = this.currentLang;
    this.updateContent();
    this.updateButtonText();
  }

  updateButtonText() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = this.currentLang === 'en' ? '中文' : 'English';
    }
  }

  updateContent() {
    // 更新所有带有 data-en 和 data-zh 属性的元素
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
      const text = this.currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-zh');
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });

    // 更新带有 data-html-en 和 data-html-zh 属性的元素（用于包含HTML标签的内容）
    const htmlElements = document.querySelectorAll('[data-html-en][data-html-zh]');
    htmlElements.forEach(element => {
      const html = this.currentLang === 'en' ? element.getAttribute('data-html-en') : element.getAttribute('data-html-zh');
      element.innerHTML = html;
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
});

