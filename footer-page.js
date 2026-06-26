document.addEventListener("DOMContentLoaded", () => {
  fetch("/footer-page.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Footer HTML file did not load!");
      }
      return response.text();
    })
    .then((htmlContent) => {
      const footerWrapper = document.createElement("div");
      footerWrapper.innerHTML = htmlContent;
      document.body.appendChild(footerWrapper);
      console.log("footer fetched successfully!")
    })
    .catch((error) => console.error("Error loading footer:", error));
});

document.addEventListener("click", (event) => {
  const btn = event.target.closest("#open-close-btn");
  if (btn) {
    const servicesBox = document.querySelector(".f2s3-part2");
    const arrow = document.getElementById("footer-arrow");
    if (servicesBox && arrow) {
      servicesBox.classList.toggle("active");
      arrow.style.transform = servicesBox.classList.contains("active")
        ? "rotate(180deg)"
        : "rotate(0deg)";
    }
  }
});