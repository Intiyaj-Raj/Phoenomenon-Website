
// Global Function - Direct Onclick Trigger
function scrollToTop() {
  // 1. Direct Body & HTML Scroll (Jo aapki site pe scroll ho raha hai)
  document.body.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // 2. Standard Window Scroll (Backup)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Scroll detection logic (Body scrolling ke liye)
document.body.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollToTopBtn');
  if (!btn) return;

  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

// attach file function to display name
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const fileNameDisplay = document.getElementById('fileNameDisplay');

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        // fetch selected file name
        const fileName = e.target.files[0].name;
        fileNameDisplay.innerText = fileName; // Display text update
      } else {
        fileNameDisplay.innerText = "Attach file"; // Reset if no file
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const whatsappForm = document.getElementById("whatsappForm");

  // Agar iss page par whatsappForm exist karta hai tabhi listener chalega
  if (whatsappForm) {
    let selectedBudget = "Not Selected";

    // Budget buttons selection logic
    const budgetOptions = whatsappForm.querySelectorAll(".budget-option");
    budgetOptions.forEach((option) => {
      option.addEventListener("click", () => {
        budgetOptions.forEach((btn) => btn.classList.remove("active"));
        option.classList.add("active");
        selectedBudget = option.textContent.trim();
      });
    });

    // File Input Name Display Logic
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileNameDisplay");

    if (fileInput && fileNameDisplay) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          fileNameDisplay.textContent = e.target.files[0].name;
        } else {
          fileNameDisplay.textContent = "Attach file";
        }
      });
    }

    // Form Submit Listener
    whatsappForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userName = document.getElementById("userName")?.value.trim() || "";
      const userEmail = document.getElementById("userEmail")?.value.trim() || "";
      const userMessage = document.getElementById("userMessage")?.value.trim() || "";

      // WhatsApp Number (Country code + Number without '+' sign)
      const phoneNumber = "916261406423"; // Aapka WhatsApp Number

      // Message Format
      const textMessage = 
`*New Project Inquiry!*

*Name:* ${userName}
*Email:* ${userEmail}
*Budget:* ${selectedBudget}
*Message:* ${userMessage}`;

      const encodedMessage = encodeURIComponent(textMessage);
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // New tab me WhatsApp redirect karna
      window.open(whatsappURL, "_blank");
    });
  }
});


gsap.registerPlugin(ScrollTrigger);

/*
=========================================
            heading 
=========================================
 */
document.querySelectorAll(".fade-text").forEach((heading) => {
  const words = heading.innerHTML
    .replace(/<br\s*\/?>/gi, "<br>")
    .split(/(\<br\>|\s+)/)
    .filter((item) => item.trim() !== "");

  heading.innerHTML = words
    .map((word) => (word === "<br>" ? "<br>" : `<span>${word}</span>`))
    .join(" ");

  const spans = heading.querySelectorAll("span");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let delay = 0;

          spans.forEach((span) => {
            setTimeout(() => {
              span.style.opacity = "1";
              span.style.transform = "translateY(0)";
            }, delay);

            delay += 40;
          });
        } else {
          spans.forEach((span) => {
            span.style.opacity = "0";
            span.style.transform = "translateY(40px)";
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(heading);
});



if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".p3-card");

  cards.forEach((card, index) => {
    if (index === 0) return;

    // next card move up
    gsap.from(card, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".page3",
        start: () => `top -${window.innerHeight * index}`,
        end: () => `+=${window.innerHeight}`,
        scrub: true,
      },
    });

    // previous card opacity ko hatao + size chhota hota rahe
    gsap.to(cards[index - 1], {
      opacity: 0,
      scale: 0.92,
      transformOrigin: "center",
      ease: "none",
      scrollTrigger: {
        trigger: ".page3",
        start: () => `top -${window.innerHeight * index}`,
        end: () => `+=${window.innerHeight / 2}`,
        scrub: true,
      },
    });
  });
}

/*
=========================================
            page 4
=========================================
 */
const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".p4-right");

const menuObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuItems.forEach((item) => {
          item.classList.remove("active");
        });

        const activeItem = document.querySelector(
          `.menu-item[href="#${entry.target.id}"]`
        );

        if (activeItem) {
          activeItem.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => {
  menuObserver.observe(section);
});
/* =========================
   page 5 scroll card (GSAP)
========================= */
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  const page5Cards = gsap.utils.toArray(".p5-card");

  page5Cards.forEach((card, index) => {
    if (index === 0) return;


    gsap.from(card, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".page5",
        start: () => `top -${window.innerHeight * index}`,
        end: () => `+=${window.innerHeight}`,
        scrub: true,
      },
    });

    gsap.to(page5Cards[index - 1], {
      scale: 0.92,
      transformOrigin: "center",
      ease: "none",
      scrollTrigger: {
        trigger: ".page5",
        start: () => `top -${window.innerHeight * index}`,
        end: () => `+=${window.innerHeight / 2}`,
        scrub: true,
      },
    });
  });
}

/*
=========================================
             page 6
=========================================
 */
const buttons = document.querySelectorAll(".page6-btn button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
  });
});

const p6cards = document.querySelectorAll(".p6-card");
const p6buttons = document.querySelectorAll(".industry-btn");

p6cards.forEach((card, index) => {
  card.style.display = index === 0 ? "flex" : "none";
});

p6buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetCard = btn.dataset.target;

    p6cards.forEach((card) => {
      card.style.display = "none";
    });

    document.getElementById(targetCard).style.display = "flex";

    p6buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

/*
=========================================
            conatct page
=========================================
 */

function toggleVideo(container) {
  const video = container.querySelector(".client-video");

  if (video.paused) {
    video.play();
    container.classList.add("playing");
  } else {
    video.pause();
    container.classList.remove("playing");
  }
}

document.querySelectorAll(".client-video").forEach((video) => {
  video.addEventListener("ended", () => {
    video.parentElement.classList.remove("playing");
  });
});

/*
=========================================
          image / video reveal 
=========================================
 */
const allMedia = document.querySelectorAll(
  "#hero img.reveal-media, #hero video.reveal-media, " + ".reveal-media",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const media = entry.target;

      const isInPage2 = media.closest("#page2");
      const isInPage4 = media.closest("#page4");
      if (isInPage2 || isInPage4) return;

      if (entry.isIntersecting) {
        media.classList.remove("animate");
        void media.offsetWidth;
        media.classList.add("animate");
      } else {
        media.classList.remove("animate");
        media.style.opacity = "0";
      }
    });
  },
  { threshold: 0.0 },
);

if (!("IntersectionObserver" in window)) {
  allMedia.forEach((media) => {
    const isInPage2 = media.closest("#page2");
    const isInPage4 = media.closest("#page4");
    if (isInPage2 || isInPage4) return;
    media.classList.add("animate");
  });
} else {
  allMedia.forEach((media) => {
    const isInPage2 = media.closest("#page2");
    const isInPage4 = media.closest("#page4");
    if (isInPage2 || isInPage4) return;
    observer.observe(media);
  });
}

/*
=======================================================================
        typing effect (calculation type)
=======================================================================
*/

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll(".multi-use-p").forEach((element) => {
  const originalText = element.textContent;

  function scrambleText() {
    let iteration = 0;

    const interval = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";

          if (index < iteration) {
            return originalText[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 7);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrambleText();
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(element);
});



