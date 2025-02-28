// 关于我们页面交互功能
document.addEventListener("DOMContentLoaded", function () {
  // 联系表单提交
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 获取表单数据
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // 显示提交成功消息
      showSubmitSuccess(formData);

      // 重置表单
      contactForm.reset();
    });
  }

  // 团队成员卡片交互
  const teamMembers = document.querySelectorAll(".team-member");

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
    });

    member.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
    });
  });

  // 价值观卡片交互
  const valueCards = document.querySelectorAll(".value-card");

  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
    });
  });

  // 时间线动画
  const timelineItems = document.querySelectorAll(".timeline-item");

  // 检查元素是否在视口中
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // 添加动画类
  function addAnimationClass() {
    timelineItems.forEach((item) => {
      if (isElementInViewport(item) && !item.classList.contains("animated")) {
        item.classList.add("animated");
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }
    });
  }

  // 初始化时间线项目样式
  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // 页面加载和滚动时检查
  addAnimationClass();
  window.addEventListener("scroll", addAnimationClass);
});

// 显示提交成功消息
function showSubmitSuccess(formData) {
  // 创建成功消息元素
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.style.position = "fixed";
  successMessage.style.top = "20px";
  successMessage.style.right = "20px";
  successMessage.style.background = "#fff";
  successMessage.style.padding = "1.5rem";
  successMessage.style.borderRadius = "8px";
  successMessage.style.boxShadow = "0 3px 15px rgba(0, 0, 0, 0.2)";
  successMessage.style.borderLeft = "4px solid #3498db";
  successMessage.style.zIndex = "1000";
  successMessage.style.maxWidth = "300px";

  // 消息内容
  successMessage.innerHTML = `
    <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">提交成功</h3>
    <p style="color: #555; margin-bottom: 0.5rem;">感谢您的留言，${formData.name}！</p>
    <p style="color: #555;">我们将尽快回复您。</p>
  `;

  // 添加到页面
  document.body.appendChild(successMessage);

  // 3秒后自动移除
  setTimeout(() => {
    successMessage.style.opacity = "0";
    successMessage.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 500);
  }, 3000);
}
