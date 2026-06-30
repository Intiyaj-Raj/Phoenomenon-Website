document.addEventListener("DOMContentLoaded", () => {
    const industrySections = document.querySelectorAll(".industry-specific-right-card");
    const industryMenuLinks = document.querySelectorAll(".industry-specific-menu a");

    // First menu item active by default
    industryMenuLinks[0].classList.add("active");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    industryMenuLinks.forEach((link) => {
                        link.classList.remove("active");

                        if (link.getAttribute("href") === "#" + entry.target.id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.5 // Card should be 50% visible
        }
    );

    industrySections.forEach((section) => observer.observe(section));
});