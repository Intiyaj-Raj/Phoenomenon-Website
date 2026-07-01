gsap.registerPlugin(ScrollTrigger);

const value_cards = gsap.utils.toArray(".value-card");

value_cards.forEach((card, index) => {
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

const cards = gsap.utils.toArray(".story-card-inner");

cards.forEach((card, index) => {
    if (index === 0) return;

    gsap.from(card, {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
            trigger: card.parentElement,
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
        },
    });
});

