const btn = document.getElementById("open-close-btn");
const servicesBox = document.querySelector(".f2s3-part2");
const arrow = document.getElementById("footer-arrow");

btn.addEventListener("click", () => {
  servicesBox.classList.toggle("active");

  if (servicesBox.classList.contains("active")) {
    arrow.style.transform = "rotate(180deg)";
  } else {
    arrow.style.transform = "rotate(0deg)";
  }
});
