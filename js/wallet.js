// 钱包页面交互功能
document.addEventListener("DOMContentLoaded", function () {
  // 托管钱包创建按钮
  const createHostedWalletBtn = document.getElementById("create-hosted-wallet");
  if (createHostedWalletBtn) {
    createHostedWalletBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showModal("托管钱包创建", "请填写以下信息创建您的托管钱包", [
        { label: "电子邮箱", type: "email", id: "wallet-email" },
        { label: "密码", type: "password", id: "wallet-password" },
        { label: "确认密码", type: "password", id: "wallet-confirm-password" },
      ]);
    });
  }

  // 连接外部钱包按钮
  const connectExternalWalletBtn = document.getElementById(
    "connect-external-wallet"
  );
  if (connectExternalWalletBtn) {
    connectExternalWalletBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showWalletOptions();
    });
  }

  // 演示钱包按钮
  const demoButtons = {
    deposit: document.getElementById("demo-deposit"),
    withdraw: document.getElementById("demo-withdraw"),
    pay: document.getElementById("demo-pay"),
  };

  if (demoButtons.deposit) {
    demoButtons.deposit.addEventListener("click", function () {
      showModal("充值演示", "请选择充值方式和金额", [
        {
          label: "选择币种",
          type: "select",
          id: "deposit-currency",
          options: ["ETH", "BNB", "USDT", "USDC"],
        },
        { label: "充值金额", type: "number", id: "deposit-amount" },
      ]);
    });
  }

  if (demoButtons.withdraw) {
    demoButtons.withdraw.addEventListener("click", function () {
      showModal("提现演示", "请填写提现信息", [
        {
          label: "选择币种",
          type: "select",
          id: "withdraw-currency",
          options: ["ETH", "BNB", "USDT", "USDC"],
        },
        { label: "提现金额", type: "number", id: "withdraw-amount" },
        { label: "钱包地址", type: "text", id: "withdraw-address" },
      ]);
    });
  }

  if (demoButtons.pay) {
    demoButtons.pay.addEventListener("click", function () {
      showModal("支付演示", "请填写支付信息", [
        {
          label: "选择币种",
          type: "select",
          id: "pay-currency",
          options: ["ETH", "BNB", "USDT", "USDC"],
        },
        { label: "支付金额", type: "number", id: "pay-amount" },
        { label: "收款地址", type: "text", id: "pay-address" },
        { label: "备注", type: "text", id: "pay-memo" },
      ]);
    });
  }
});

// 显示模态框
function showModal(title, message, fields) {
  // 移除已有的模态框
  removeExistingModal();

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "wallet-modal";

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
  modalTitle.textContent = title;

  // 消息
  const modalMessage = document.createElement("p");
  modalMessage.textContent = message;

  // 表单
  const form = document.createElement("form");
  form.id = "modal-form";

  // 添加字段
  fields.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.className = "form-field";

    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      field.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        input.appendChild(optionElement);
      });
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
  submitBtn.textContent = "确认";

  form.appendChild(submitBtn);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // 这里只是演示，实际应用中需要处理表单数据
    showNotification("操作成功", "演示操作已完成");
    document.body.removeChild(modal);
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

// 显示钱包选项
function showWalletOptions() {
  // 移除已有的模态框
  removeExistingModal();

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "wallet-options-modal";

  // 模态框内容
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content wallet-options-content";

  // 关闭按钮
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(modal);
  });

  // 标题
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "选择钱包";

  // 钱包选项
  const walletOptions = [
    { name: "MetaMask", icon: "metamask.svg" },
    { name: "Trust Wallet", icon: "trustwallet.svg" },
    { name: "Binance Wallet", icon: "binancewallet.svg" },
  ];

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "wallet-options-container";

  walletOptions.forEach((wallet) => {
    const option = document.createElement("div");
    option.className = "wallet-option";
    option.innerHTML = `
      <div class="wallet-option-icon">${wallet.name[0]}</div>
      <div class="wallet-option-name">${wallet.name}</div>
    `;
    option.addEventListener("click", function () {
      showNotification("钱包连接", `正在尝试连接到${wallet.name}...`);
      document.body.removeChild(modal);

      // 模拟连接过程
      setTimeout(() => {
        showNotification("连接成功", `已成功连接到${wallet.name}`);
      }, 1500);
    });
    optionsContainer.appendChild(option);
  });

  // 组装模态框
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(optionsContainer);
  modal.appendChild(modalContent);

  // 添加到页面
  document.body.appendChild(modal);

  // 显示模态框
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// 显示通知
function showNotification(title, message) {
  // 移除已有的通知
  const existingNotification = document.getElementById("wallet-notification");
  if (existingNotification) {
    document.body.removeChild(existingNotification);
  }

  // 创建通知
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.id = "wallet-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;

  // 添加到页面
  document.body.appendChild(notification);

  // 显示通知
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 10);

  // 自动关闭
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 500);
  }, 3000);
}

// 移除已有的模态框
function removeExistingModal() {
  const existingModal =
    document.getElementById("wallet-modal") ||
    document.getElementById("wallet-options-modal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }
}
