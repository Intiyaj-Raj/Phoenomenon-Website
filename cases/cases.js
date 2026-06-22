/* ==========================
   Case Study Filter Buttons
========================== */

const caseButtons = document.querySelectorAll(".case_industry-btn");
const projectSections = document.querySelectorAll(".project");

projectSections.forEach((section) => {
  section.style.display = "none";
});

document.getElementById("project").style.display = "block";

caseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSection = btn.dataset.target;

    caseButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectSections.forEach((section) => {
      section.style.display = "none";
    });

    const selectedSection = document.getElementById(targetSection);

    if (selectedSection) {
      selectedSection.style.display = "block";
    }
  });
});

// heading fade in effect

document.querySelectorAll(".word-reveal").forEach((heading) => {
  const words = heading.textContent.trim().split(" ");

  heading.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");

  const spans = heading.querySelectorAll("span");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.style.opacity = "1";
              span.style.transform = "translateY(0)";
            }, index * 50);
          });
        } else {
          spans.forEach((span) => {
            span.style.opacity = "0";
            span.style.transform = "translateY(40px)";
          });
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(heading);
});
