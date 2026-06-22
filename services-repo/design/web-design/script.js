gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".design-card");

cards.forEach((card, index) => {
  if (index === 0) return;

  gsap.from(card, {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "top top",
      scrub: 1.5,
    },
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});
