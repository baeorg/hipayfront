/**
 * 国际化工具
 * 用于处理多语言支持、语言切换和文本翻译
 */

// 当前语言
let currentLang = "zh"; // 默认为中文

// 语言数据
let translations = {
  zh: null,
  en: null,
};

// 初始化国际化
async function initI18n() {
  try {
    // 尝试从localStorage获取用户之前选择的语言
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      currentLang = savedLang;
    } else {
      // 如果没有保存的语言偏好，尝试检测浏览器语言
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith("en")) {
        currentLang = "en";
      }
    }

    // 加载当前语言的翻译文件
    await loadLanguage(currentLang);

    // 添加语言切换按钮
    addLanguageSwitcher();

    // 应用翻译
    applyTranslations();

    // 监听DOM变化，为动态添加的元素应用翻译
    observeDOMChanges();

    console.log(
      `Internationalization initialized with language: ${currentLang}`
    );
  } catch (error) {
    console.error("Failed to initialize internationalization:", error);
  }
}

// 加载语言文件
async function loadLanguage(lang) {
  if (translations[lang]) {
    return translations[lang];
  }

  try {
    const response = await fetch(`/i18n/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${response.status}`);
    }
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error(`Error loading language file for ${lang}:`, error);
    // 如果加载失败，尝试使用另一种语言
    if (lang === "en" && !translations.zh) {
      return loadLanguage("zh");
    } else if (lang === "zh" && !translations.en) {
      return loadLanguage("en");
    }
    return null;
  }
}

// 切换语言
async function switchLanguage(lang) {
  if (lang !== "zh" && lang !== "en") {
    console.error("Unsupported language:", lang);
    return;
  }

  if (lang === currentLang) {
    return;
  }

  try {
    // 加载新语言
    await loadLanguage(lang);

    // 更新当前语言
    currentLang = lang;

    // 保存语言偏好
    localStorage.setItem("preferredLanguage", lang);

    // 应用翻译
    applyTranslations();

    // 更新语言切换按钮状态
    updateLanguageSwitcherState();

    console.log(`Language switched to: ${lang}`);
  } catch (error) {
    console.error("Failed to switch language:", error);
  }
}

// 获取翻译文本
function getTranslation(key) {
  if (!translations[currentLang]) {
    return key;
  }

  // 支持嵌套键，如 "global.nav.home"
  const keys = key.split(".");
  let value = translations[currentLang];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value;
}

// 应用翻译到页面
function applyTranslations() {
  if (!translations[currentLang]) {
    console.error("No translations available for current language");
    return;
  }

  // 翻译所有带有 data-i18n 属性的元素
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = getTranslation(key);

    if (translation && typeof translation === "string") {
      // 检查元素是否有特定属性需要翻译
      const attr = element.getAttribute("data-i18n-attr");
      if (attr) {
        element.setAttribute(attr, translation);
      } else {
        // 默认翻译元素内容
        element.textContent = translation;
      }
    }
  });

  // 翻译所有带有 data-i18n-placeholder 属性的元素
  const placeholderElements = document.querySelectorAll(
    "[data-i18n-placeholder]"
  );
  placeholderElements.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation = getTranslation(key);

    if (translation && typeof translation === "string") {
      element.setAttribute("placeholder", translation);
    }
  });

  // 更新HTML语言属性
  document.documentElement.lang = currentLang;
}

// 添加语言切换按钮
function addLanguageSwitcher() {
  // 检查是否已存在语言切换器
  if (document.getElementById("language-switcher")) {
    return;
  }

  // 创建语言切换器容器
  const switcher = document.createElement("div");
  switcher.id = "language-switcher";
  switcher.className = "language-switcher";

  // 创建中文按钮
  const zhButton = document.createElement("button");
  zhButton.className = "lang-btn" + (currentLang === "zh" ? " active" : "");
  zhButton.setAttribute("data-lang", "zh");
  zhButton.textContent = "中文";
  zhButton.addEventListener("click", () => switchLanguage("zh"));

  // 创建英文按钮
  const enButton = document.createElement("button");
  enButton.className = "lang-btn" + (currentLang === "en" ? " active" : "");
  enButton.setAttribute("data-lang", "en");
  enButton.textContent = "English";
  enButton.addEventListener("click", () => switchLanguage("en"));

  // 添加按钮到切换器
  switcher.appendChild(zhButton);
  switcher.appendChild(enButton);

  // 将切换器添加到导航栏
  const nav = document.querySelector("nav");
  if (nav) {
    nav.appendChild(switcher);
  } else {
    // 如果没有导航栏，添加到body
    document.body.insertBefore(switcher, document.body.firstChild);
  }

  // 添加语言切换器样式
  addLanguageSwitcherStyles();
}

// 更新语言切换按钮状态
function updateLanguageSwitcherState() {
  const buttons = document.querySelectorAll(".lang-btn");
  buttons.forEach((button) => {
    const lang = button.getAttribute("data-lang");
    if (lang === currentLang) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// 添加语言切换器样式
function addLanguageSwitcherStyles() {
  // 检查是否已存在样式
  if (document.getElementById("language-switcher-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "language-switcher-styles";
  style.textContent = `
    .language-switcher {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    
    .lang-btn {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 5px 8px;
      margin: 0 5px;
      font-size: 14px;
      border-radius: 3px;
      transition: background-color 0.3s ease;
    }
    
    .lang-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .lang-btn.active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
    
    @media (max-width: 768px) {
      .language-switcher {
        margin-top: 10px;
        margin-left: 0;
      }
    }
  `;

  document.head.appendChild(style);
}

// 监听DOM变化，为动态添加的元素应用翻译
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    let shouldTranslate = false;

    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 检查新添加的元素或其子元素是否有需要翻译的属性
            if (
              node.hasAttribute &&
              (node.hasAttribute("data-i18n") ||
                node.hasAttribute("data-i18n-placeholder") ||
                node.querySelector("[data-i18n], [data-i18n-placeholder]"))
            ) {
              shouldTranslate = true;
            }
          }
        });
      }
    });

    if (shouldTranslate) {
      applyTranslations();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 在页面加载完成后初始化国际化
document.addEventListener("DOMContentLoaded", initI18n);
