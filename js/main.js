// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 导航栏交互
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.color = "#3498db";
    });

    link.addEventListener("mouseleave", function () {
      this.style.color = "#fff";
    });
  });

  // 功能卡片交互
  const featureCards = document.querySelectorAll(".card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    });
  });

  // CTA按钮交互
  const ctaButtons = document.querySelectorAll(".cta");

  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f4f4f4";
    });

    button.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#fff";
    });
  });
});
