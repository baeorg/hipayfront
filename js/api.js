// API文档页面交互功能
document.addEventListener("DOMContentLoaded", function () {
  // 标签页切换功能
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 移除所有标签按钮的active类
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // 移除所有标签内容的active类
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // 添加当前标签按钮的active类
      this.classList.add("active");

      // 获取当前标签的数据属性
      const tabId = this.getAttribute("data-tab");

      // 显示对应的标签内容
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // 获取API密钥按钮
  const getApiKeyBtn = document.getElementById("get-api-key");
  if (getApiKeyBtn) {
    getApiKeyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showApiKeyModal();
    });
  }

  // 代码块高亮效果
  const codeBlocks = document.querySelectorAll(".code-block");
  codeBlocks.forEach((block) => {
    block.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 0 2px #3498db";
    });

    block.addEventListener("mouseleave", function () {
      this.style.boxShadow = "none";
    });
  });
});

// 显示API密钥模态框
function showApiKeyModal() {
  // 移除已有的模态框
  const existingModal = document.getElementById("api-key-modal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "api-key-modal";

  // 模态框内容
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // 关闭按钮
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(modal);
  });

  // 标题
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "获取API密钥";

  // 表单
  const form = document.createElement("form");
  form.id = "api-key-form";

  // 添加字段
  const fields = [
    { label: "应用名称", type: "text", id: "app-name" },
    { label: "应用描述", type: "text", id: "app-description" },
    { label: "回调URL", type: "url", id: "callback-url" },
  ];

  fields.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.className = "form-field";

    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.name = field.id;
    input.required = true;

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    form.appendChild(fieldContainer);
  });

  // 提交按钮
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "modal-submit";
  submitBtn.textContent = "生成API密钥";

  form.appendChild(submitBtn);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 隐藏表单
    form.style.display = "none";

    // 显示生成的API密钥
    const apiKeyContainer = document.createElement("div");
    apiKeyContainer.className = "api-key-container";

    const apiKeyTitle = document.createElement("h3");
    apiKeyTitle.textContent = "您的API密钥";

    const apiKeyBox = document.createElement("div");
    apiKeyBox.className = "api-key-box";

    // 生成随机API密钥
    const apiKey = generateRandomApiKey();
    apiKeyBox.textContent = apiKey;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-button";
    copyBtn.textContent = "复制";
    copyBtn.addEventListener("click", function () {
      copyToClipboard(apiKey);
      this.textContent = "已复制";
      setTimeout(() => {
        this.textContent = "复制";
      }, 2000);
    });

    const warningText = document.createElement("p");
    warningText.className = "warning-text";
    warningText.textContent = "请保存此API密钥，它只会显示一次！";

    apiKeyContainer.appendChild(apiKeyTitle);
    apiKeyContainer.appendChild(apiKeyBox);
    apiKeyContainer.appendChild(copyBtn);
    apiKeyContainer.appendChild(warningText);

    modalContent.appendChild(apiKeyContainer);
  });

  // 组装模态框
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  // 添加到页面
  document.body.appendChild(modal);

  // 显示模态框
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// 生成随机API密钥
function generateRandomApiKey() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";

  // 生成32位随机字符
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `cp_live_${key}`;
}

// 复制文本到剪贴板
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
