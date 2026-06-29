document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".industry-specific-right-card");
    const menuLinks = document.querySelectorAll(".industry-specific-menu a");

    // First menu item active by default
    menuLinks[0].classList.add("active");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    menuLinks.forEach((link) => {
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

    sections.forEach((section) => observer.observe(section));
});