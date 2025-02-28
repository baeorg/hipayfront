// 订阅方案页面交互功能
document.addEventListener("DOMContentLoaded", function () {
  // 付费方式切换
  const billingToggle = document.getElementById("billing-toggle");
  const monthlyPrices = document.querySelectorAll(".price.monthly");
  const annualPrices = document.querySelectorAll(".price.annual");

  if (billingToggle) {
    billingToggle.addEventListener("change", function () {
      if (this.checked) {
        // 显示年付价格
        monthlyPrices.forEach((price) => (price.style.display = "none"));
        annualPrices.forEach((price) => (price.style.display = "inline"));
      } else {
        // 显示月付价格
        monthlyPrices.forEach((price) => (price.style.display = "inline"));
        annualPrices.forEach((price) => (price.style.display = "none"));
      }
    });
  }

  // FAQ折叠展开
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // 关闭其他已打开的FAQ项
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // 切换当前FAQ项的状态
      item.classList.toggle("active");
    });
  });

  // 方案选择按钮
  const planButtons = document.querySelectorAll(".plan-button");

  planButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // 获取方案名称
      const planName =
        this.closest(".pricing-plan").querySelector("h2").textContent;

      // 显示确认模态框
      showPlanConfirmation(planName);
    });
  });

  // 联系销售团队按钮
  const contactSalesBtn = document.getElementById("contact-sales");

  if (contactSalesBtn) {
    contactSalesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showContactForm();
    });
  }
});

// 显示方案确认模态框
function showPlanConfirmation(planName) {
  // 移除已有的模态框
  removeExistingModal();

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "plan-modal";

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
  modalTitle.textContent = `确认选择${planName}方案`;

  // 消息
  const modalMessage = document.createElement("p");
  modalMessage.textContent = `您即将订阅${planName}方案。请填写以下信息完成订阅。`;

  // 表单
  const form = document.createElement("form");
  form.id = "plan-form";

  // 添加字段
  const fields = [
    { label: "公司名称", type: "text", id: "company-name" },
    { label: "联系人", type: "text", id: "contact-name" },
    { label: "电子邮箱", type: "email", id: "contact-email" },
    { label: "电话", type: "tel", id: "contact-phone" },
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

  // 付款方式选择
  const paymentContainer = document.createElement("div");
  paymentContainer.className = "form-field";

  const paymentLabel = document.createElement("label");
  paymentLabel.textContent = "付款方式";

  const paymentOptions = document.createElement("div");
  paymentOptions.className = "payment-options";

  const paymentMethods = [
    { id: "crypto", name: "加密货币支付" },
    { id: "bank", name: "银行转账" },
    { id: "alipay", name: "支付宝" },
    { id: "wechat", name: "微信支付" },
  ];

  paymentMethods.forEach((method) => {
    const option = document.createElement("div");
    option.className = "payment-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "payment-method";
    radio.id = method.id;
    radio.value = method.id;
    if (method.id === "crypto") {
      radio.checked = true;
    }

    const optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", method.id);
    optionLabel.textContent = method.name;

    option.appendChild(radio);
    option.appendChild(optionLabel);
    paymentOptions.appendChild(option);
  });

  paymentContainer.appendChild(paymentLabel);
  paymentContainer.appendChild(paymentOptions);
  form.appendChild(paymentContainer);

  // 提交按钮
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "modal-submit";
  submitBtn.textContent = "确认订阅";

  form.appendChild(submitBtn);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 隐藏表单
    form.style.display = "none";

    // 显示成功消息
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";

    const successIcon = document.createElement("div");
    successIcon.className = "success-icon";
    successIcon.innerHTML = "✓";

    const successTitle = document.createElement("h3");
    successTitle.textContent = "订阅成功！";

    const successText = document.createElement("p");
    successText.textContent = `感谢您订阅${planName}方案。我们已向您的邮箱发送了确认邮件，请查收。`;

    successMessage.appendChild(successIcon);
    successMessage.appendChild(successTitle);
    successMessage.appendChild(successText);

    modalContent.appendChild(successMessage);
  });

  // 组装模态框
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalMessage);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  // 添加到页面
  document.body.appendChild(modal);

  // 显示模态框
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// 显示联系表单
function showContactForm() {
  // 移除已有的模态框
  removeExistingModal();

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "contact-modal";

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
  modalTitle.textContent = "联系销售团队";

  // 消息
  const modalMessage = document.createElement("p");
  modalMessage.textContent = "请填写以下信息，我们的销售团队将尽快与您联系。";

  // 表单
  const form = document.createElement("form");
  form.id = "contact-form";

  // 添加字段
  const fields = [
    { label: "公司名称", type: "text", id: "company-name" },
    { label: "联系人", type: "text", id: "contact-name" },
    { label: "电子邮箱", type: "email", id: "contact-email" },
    { label: "电话", type: "tel", id: "contact-phone" },
    { label: "月交易量估计", type: "text", id: "transaction-volume" },
    { label: "需求描述", type: "textarea", id: "requirements" },
  ];

  fields.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.className = "form-field";

    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
    } else {
      input = document.createElement("input");
      input.type = field.type;
    }

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
  submitBtn.textContent = "提交";

  form.appendChild(submitBtn);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 隐藏表单
    form.style.display = "none";

    // 显示成功消息
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";

    const successIcon = document.createElement("div");
    successIcon.className = "success-icon";
    successIcon.innerHTML = "✓";

    const successTitle = document.createElement("h3");
    successTitle.textContent = "提交成功！";

    const successText = document.createElement("p");
    successText.textContent =
      "感谢您的咨询。我们的销售团队将在24小时内与您联系。";

    successMessage.appendChild(successIcon);
    successMessage.appendChild(successTitle);
    successMessage.appendChild(successText);

    modalContent.appendChild(successMessage);
  });

  // 组装模态框
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalMessage);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  // 添加到页面
  document.body.appendChild(modal);

  // 显示模态框
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// 移除已有的模态框
function removeExistingModal() {
  const existingModal =
    document.getElementById("plan-modal") ||
    document.getElementById("contact-modal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }
}
