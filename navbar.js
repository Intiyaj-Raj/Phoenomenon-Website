// const currentScriptEl = document.currentScript;
// const scriptSrc = currentScriptEl ? currentScriptEl.src : '';

// function loadNavbar() {
//   const navbarContainer = document.getElementById('navbar-container');

//   if (navbarContainer && scriptSrc) {
//     const rootFolder = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
//     const fetchPath = `${rootFolder}/navbar.html`;
//     const cssPath = `${rootFolder}/navbar.css`;

//     if (!document.querySelector(`link[href="${cssPath}"]`)) {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = cssPath;
//       document.head.appendChild(link);
//     }

//     fetch(fetchPath)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Navbar file nahi mili!");
//         }
//         return response.text();
//       })
//       .then(data => {
//         navbarContainer.innerHTML = data;

//         const navbar = navbarContainer.querySelector('.navbar');

//         // 🛠️ FIX: Insights aur Cases page par shuru se hi permanent white mode lagao
//         const isWhitePage = window.location.pathname.includes('/insights/') ||
//           window.location.pathname.includes('/insights.html') ||
//           window.location.pathname.includes('/cases/') ||
//           window.location.pathname.includes('/cases.html');

//         if (isWhitePage && navbar) {
//           navbarContainer.classList.add('insights-navbar-mode');
//           navbar.classList.add('navbar-white'); // Shuru se hi white rahegi
//         }

//         // IMAGE PATHS AUTO-CORRECTION LOGIC
//         navbarContainer.querySelectorAll('img').forEach(img => {
//           const currentSrc = img.getAttribute('src');
//           if (currentSrc && currentSrc.startsWith('./')) {
//             const cleanPath = currentSrc.substring(2);
//             img.src = `${rootFolder}/${cleanPath}`;
//           }
//         });

//         // ALL INITIALIZATIONS
//         initNavbarHover();
//         initSubMenuTabs();
//         initDynamicButtonTheme();
//       })
//       .catch(error => console.error('Error loading navbar:', error));
//   }
// }
// document.addEventListener('DOMContentLoaded', loadNavbar);


// // 🛠️ MULTI-NAV HOVER WITH INDEPENDENT LAYOUT SWITCHER
// function initNavbarHover() {
//   const navbar = document.querySelector('.navbar');
//   const serviceHover = document.querySelector('.service-hover');
//   const triggers = document.querySelectorAll('.hover-trigger');

//   if (!navbar || !serviceHover || !triggers.length) return;

//   triggers.forEach(trigger => {
//     trigger.addEventListener('mouseenter', () => {
//       const dropdownType = trigger.getAttribute('data-dropdown');

//       serviceHover.style.display = 'flex';
//       navbar.classList.add('navbar-white');

//       const button = document.querySelector('.get-in-touch-btn');
//       if (button) button.setAttribute('data-theme', 'dark-btn');

//       document.querySelectorAll('.mega-dropdown-content').forEach(panel => {
//         panel.classList.remove('panel-active');
//       });

//       const activePanel = document.getElementById(`mega-${dropdownType}`);
//       if (activePanel) {
//         activePanel.classList.add('panel-active');
//       }
//     });
//   });

//   navbar.addEventListener('mouseleave', (e) => {
//     if (!serviceHover.contains(e.relatedTarget)) {
//       hideMenu(navbar, serviceHover);
//     }
//   });

//   serviceHover.addEventListener('mouseleave', (e) => {
//     if (!navbar.contains(e.relatedTarget)) {
//       hideMenu(navbar, serviceHover);
//     }
//   });
// }

// // 🛠️ MOUSE OUT HANDLING WITH FORCE RESOLUTION FOR BUTTON
// function hideMenu(navbar, serviceHover) {
//   if (serviceHover && navbar) {
//     serviceHover.style.display = 'none';

//     // 🛠️ FIX: Agar Insights ya Cases ka page hai, toh hover hatne par bhi navbar ko WHITE hi chhodo
//     const isWhitePage = window.location.pathname.includes('/insights/') ||
//       window.location.pathname.includes('/insights.html') ||
//       window.location.pathname.includes('/cases/') ||
//       window.location.pathname.includes('/cases.html');

//     if (!isWhitePage) {
//       navbar.classList.remove('navbar-white'); // Sirf normal pages par black reset hoga
//     }

//     const button = document.querySelector('.get-in-touch-btn');
//     if (button) {
//       if (window.scrollY < 50) {
//         // Agar permanent white page hai, toh button default mein hamesha dark (black) rahega
//         if (isWhitePage) {
//           button.setAttribute('data-theme', 'dark-btn');
//           return;
//         } else {
//           button.setAttribute('data-theme', 'light-btn');
//           return;
//         }
//       }
//       setTimeout(() => {
//         if (typeof window.forceCheckButtonTheme === 'function') {
//           window.forceCheckButtonTheme();
//         }
//       }, 50);
//     }
//   }
// }


// // 🛠️ INDEPENDENT INNER TABS SWITCHER FOR EACH PANEL
// function initSubMenuTabs() {
//   function setupTabGroup(subMenuSelector) {
//     const subMenus = document.querySelectorAll(subMenuSelector);

//     subMenus.forEach(menu => {
//       menu.addEventListener('mouseenter', function () {
//         const parentPanel = this.closest('.mega-dropdown-content');
//         const targetId = this.getAttribute('data-target');
//         if (!parentPanel || !targetId) return;

//         parentPanel.querySelectorAll(subMenuSelector).forEach(m => m.classList.remove('active'));
//         parentPanel.querySelectorAll('.mega-content').forEach(c => c.classList.remove('active'));

//         this.classList.add('active');
//         const targetContent = document.getElementById(targetId);
//         if (targetContent) targetContent.classList.add('active');
//       });
//     });
//   }

//   setupTabGroup('.s-sub-menu');
//   setupTabGroup('.ind-sub-menu');
// }


// // DYNAMIC BUTTON THEME SWITCHER FUNCTION
// function initDynamicButtonTheme() {
//   const button = document.querySelector('.get-in-touch-btn');
//   const navbar = document.querySelector('.navbar');
//   if (!button) return;

//   function checkBackgroundUnderButton() {
//     if (navbar && navbar.classList.contains('navbar-white')) {
//       // 🛠️ FIX: Normal pages par hover active hone pe button dark hoga, par insights/cases par hamesha initial background coordinate system check hoga jab tak navbar class dynamic na badle
//       const isWhitePage = window.location.pathname.includes('/insights/') ||
//         window.location.pathname.includes('/insights.html') ||
//         window.location.pathname.includes('/cases/') ||
//         window.location.pathname.includes('/cases.html');

//       // Agar hover box khula hai ya page top pe white screen hai, toh direct black button do
//       if (window.scrollY < 50 && isWhitePage) {
//         button.setAttribute('data-theme', 'dark-btn');
//         return;
//       }
//     }

//     const rect = button.getBoundingClientRect();
//     const x = rect.left + rect.width / 2;
//     const y = rect.top + rect.height / 2;

//     button.style.pointerEvents = 'none';
//     button.style.visibility = 'hidden';

//     let elementBehind = document.elementFromPoint(x, y);

//     button.style.pointerEvents = 'auto';
//     button.style.visibility = 'visible';

//     if (!elementBehind) return;

//     let bgColor = window.getComputedStyle(elementBehind).backgroundColor;

//     while ((bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') && elementBehind.parentElement) {
//       elementBehind = elementBehind.parentElement;
//       bgColor = window.getComputedStyle(elementBehind).backgroundColor;
//     }

//     const rgb = bgColor.match(/\d+/g);
//     if (rgb) {
//       const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
//       const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//       if (brightness > 200) {
//         button.setAttribute('data-theme', 'dark-btn');
//       } else {
//         button.setAttribute('data-theme', 'light-btn');
//       }
//     } else {
//       button.setAttribute('data-theme', 'light-btn');
//     }
//   }

//   window.forceCheckButtonTheme = checkBackgroundUnderButton;
//   checkBackgroundUnderButton();
//   window.addEventListener('scroll', checkBackgroundUnderButton, { passive: true });
// }


// console.log("Navbar JS Loaded successfully!");

// document.addEventListener("click", (event) => {
//   const menuIcon = event.target.closest(".menu-icon");

//   if (menuIcon) {
//     console.log("🔥 Icon Clicked Detected!");

//     const mobileMenu = document.getElementById("mobileMenu");
//     if (mobileMenu) {
//       mobileMenu.classList.toggle("open");

//       menuIcon.classList.toggle("menu-icon-active");

//       console.log("Status: Menu toggled via Event Delegation!");
//     } else {
//       console.error("Error: #mobileMenu HTML me nahi mila!");
//     }
//   }
// });



// // Accordion Click Logic
// document.addEventListener("click", (e) => {
//   const header = e.target.closest(".accordion-header");

//   if (header) {
//     const accordionItem = header.parentElement;

//     // Kisi doosre khule hue sub-menu ko auto-close karne ke liye
//     document.querySelectorAll(".menu-item-accordion").forEach((item) => {
//       if (item !== accordionItem) {
//         item.classList.remove("active");
//       }
//     });

//     // Toggle state (Open/Close on click)
//     accordionItem.classList.toggle("active");
//     console.log("Accordion state changed!");
//   }
// });

const currentScriptEl = document.currentScript;
const scriptSrc = currentScriptEl ? currentScriptEl.src : '';

function loadNavbar() {
  const navbarContainer = document.getElementById('navbar-container');

  if (navbarContainer && scriptSrc) {
    const rootFolder = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
    const fetchPath = `${rootFolder}/navbar.html`;
    const cssPath = `${rootFolder}/navbar.css`;

    if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
    }

    fetch(fetchPath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Navbar file nahi mili!");
        }
        return response.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;

        const navbar = navbarContainer.querySelector('.navbar');

        // 🛠️ FIX: Insights aur Cases page par shuru se hi permanent white mode lagao
        const isWhitePage = window.location.pathname.includes('/insights/') ||
          window.location.pathname.includes('/insights.html') ||
          window.location.pathname.includes('/cases/') ||
          window.location.pathname.includes('/cases.html');

        if (isWhitePage && navbar) {
          navbarContainer.classList.add('insights-navbar-mode');
          navbar.classList.add('navbar-white'); // Shuru se hi white rahegi
        }

        // IMAGE PATHS AUTO-CORRECTION LOGIC
        navbarContainer.querySelectorAll('img').forEach(img => {
          const currentSrc = img.getAttribute('src');
          if (currentSrc && currentSrc.startsWith('./')) {
            const cleanPath = currentSrc.substring(2);
            img.src = `${rootFolder}/${cleanPath}`;
          }
        });

        // ALL INITIALIZATIONS
        initNavbarHover();
        initSubMenuTabs();
        initDynamicButtonTheme();
      })
      .catch(error => console.error('Error loading navbar:', error));
  }
}
document.addEventListener('DOMContentLoaded', loadNavbar);


// 🛠️ MULTI-NAV HOVER WITH INDEPENDENT LAYOUT SWITCHER
function initNavbarHover() {
  const navbar = document.querySelector('.navbar');
  const serviceHover = document.querySelector('.service-hover');
  const triggers = document.querySelectorAll('.hover-trigger');

  if (!navbar || !serviceHover || !triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      const dropdownType = trigger.getAttribute('data-dropdown');

      serviceHover.style.display = 'flex';
      navbar.classList.add('navbar-white');

      const button = document.querySelector('.get-in-touch-btn');
      if (button) button.setAttribute('data-theme', 'dark-btn');

      document.querySelectorAll('.mega-dropdown-content').forEach(panel => {
        panel.classList.remove('panel-active');
      });

      const activePanel = document.getElementById(`mega-${dropdownType}`);
      if (activePanel) {
        activePanel.classList.add('panel-active');
      }
    });
  });

  navbar.addEventListener('mouseleave', (e) => {
    if (!serviceHover.contains(e.relatedTarget)) {
      hideMenu(navbar, serviceHover);
    }
  });

  serviceHover.addEventListener('mouseleave', (e) => {
    if (!navbar.contains(e.relatedTarget)) {
      hideMenu(navbar, serviceHover);
    }
  });
}

// 🛠️ MOUSE OUT HANDLING WITH FORCE RESOLUTION FOR BUTTON
function hideMenu(navbar, serviceHover) {
  if (serviceHover && navbar) {
    serviceHover.style.display = 'none';

    // 🛠️ FIX: Agar Insights ya Cases ka page hai, toh hover hatne par bhi navbar ko WHITE hi chhodo
    const isWhitePage = window.location.pathname.includes('/insights/') ||
      window.location.pathname.includes('/insights.html') ||
      window.location.pathname.includes('/cases/') ||
      window.location.pathname.includes('/cases.html');

    if (!isWhitePage) {
      navbar.classList.remove('navbar-white'); // Sirf normal pages par black reset hoga
    }

    const button = document.querySelector('.get-in-touch-btn');
    if (button) {
      if (window.scrollY < 50) {
        // Agar permanent white page hai, toh button default mein hamesha dark (black) rahega
        if (isWhitePage) {
          button.setAttribute('data-theme', 'dark-btn');
          return;
        } else {
          button.setAttribute('data-theme', 'light-btn');
          return;
        }
      }
      setTimeout(() => {
        if (typeof window.forceCheckButtonTheme === 'function') {
          window.forceCheckButtonTheme();
        }
      }, 50);
    }
  }
}


// 🛠️ INDEPENDENT INNER TABS SWITCHER FOR EACH PANEL
function initSubMenuTabs() {
  function setupTabGroup(subMenuSelector) {
    const subMenus = document.querySelectorAll(subMenuSelector);

    subMenus.forEach(menu => {
      menu.addEventListener('mouseenter', function () {
        const parentPanel = this.closest('.mega-dropdown-content');
        const targetId = this.getAttribute('data-target');
        if (!parentPanel || !targetId) return;

        parentPanel.querySelectorAll(subMenuSelector).forEach(m => m.classList.remove('active'));
        parentPanel.querySelectorAll('.mega-content').forEach(c => c.classList.remove('active'));

        this.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  setupTabGroup('.s-sub-menu');
  setupTabGroup('.ind-sub-menu');
}


// DYNAMIC BUTTON THEME SWITCHER FUNCTION
function initDynamicButtonTheme() {
  const button = document.querySelector('.get-in-touch-btn');
  const navbar = document.querySelector('.navbar');
  if (!button) return;

  // Walks the real element behind the button (and its ancestors) looking for
  // either a solid background-color OR a background-image/gradient (used for
  // dark overlays on cards/videos via ::before, which elementFromPoint can't
  // see directly since pseudo-elements aren't real DOM nodes).
  function getEffectiveBackground(startEl) {
    let el = startEl;

    while (el) {
      // Manual escape hatch: any section/card can force the button's theme
      // by adding data-force-btn-theme="dark-btn" or "light-btn".
      const forced = el.getAttribute && el.getAttribute('data-force-btn-theme');
      if (forced === 'dark-btn' || forced === 'light-btn') {
        return { forced };
      }

      const style = window.getComputedStyle(el);
      const beforeStyle = window.getComputedStyle(el, '::before');

      const hasImageOrGradient =
        (style.backgroundImage && style.backgroundImage !== 'none') ||
        (beforeStyle.backgroundImage && beforeStyle.backgroundImage !== 'none' && beforeStyle.content !== 'none');

      if (hasImageOrGradient) {
        // This design uses image/gradient backgrounds specifically to darken
        // cards and video overlays, so treat these zones as dark.
        return { type: 'dark' };
      }

      const bg = style.backgroundColor;
      const beforeBg = beforeStyle.content !== 'none' ? beforeStyle.backgroundColor : null;

      const solidBg = (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') ? bg
        : (beforeBg && beforeBg !== 'rgba(0, 0, 0, 0)' && beforeBg !== 'transparent') ? beforeBg
        : null;

      if (solidBg) {
        return { type: 'color', value: solidBg };
      }

      el = el.parentElement;
    }

    return { type: 'color', value: 'rgb(255, 255, 255)' };
  }

  function checkBackgroundUnderButton() {
    if (navbar && navbar.classList.contains('navbar-white')) {
      const isWhitePage = window.location.pathname.includes('/insights/') ||
        window.location.pathname.includes('/insights.html') ||
        window.location.pathname.includes('/cases/') ||
        window.location.pathname.includes('/cases.html');

      if (window.scrollY < 50 && isWhitePage) {
        button.setAttribute('data-theme', 'dark-btn');
        return;
      }
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    button.style.pointerEvents = 'none';
    button.style.visibility = 'hidden';

    let elementBehind = document.elementFromPoint(x, y);

    button.style.pointerEvents = 'auto';
    button.style.visibility = 'visible';

    if (!elementBehind) return;

    const result = getEffectiveBackground(elementBehind);

    if (result.forced) {
      button.setAttribute('data-theme', result.forced);
      return;
    }

    if (result.type === 'dark') {
      button.setAttribute('data-theme', 'light-btn');
      return;
    }

    const rgb = result.value.match(/\d+/g);
    if (rgb) {
      const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness > 200) {
        button.setAttribute('data-theme', 'dark-btn');
      } else {
        button.setAttribute('data-theme', 'light-btn');
      }
    } else {
      button.setAttribute('data-theme', 'light-btn');
    }
  }

  window.forceCheckButtonTheme = checkBackgroundUnderButton;

  // Runs every animation frame instead of relying on the native 'scroll'
  // event, since smooth-scroll libraries (GSAP ScrollSmoother, Lenis, etc.)
  // often transform a container instead of firing native scroll events,
  // which would otherwise leave this permanently stuck on its first read.
  function loop() {
    checkBackgroundUnderButton();
    requestAnimationFrame(loop);
  }
  loop();

  // Kept as a lightweight backup in case scroll does fire natively too.
  window.addEventListener('scroll', checkBackgroundUnderButton, { passive: true });
}


console.log("Navbar JS Loaded successfully!");

document.addEventListener("click", (event) => {
  const menuIcon = event.target.closest(".menu-icon");

  if (menuIcon) {
    console.log("🔥 Icon Clicked Detected!");

    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("open");

      menuIcon.classList.toggle("menu-icon-active");

      console.log("Status: Menu toggled via Event Delegation!");
    } else {
      console.error("Error: #mobileMenu HTML me nahi mila!");
    }
  }
});



// Accordion Click Logic
document.addEventListener("click", (e) => {
  const header = e.target.closest(".accordion-header");

  if (header) {
    const accordionItem = header.parentElement;

    // Kisi doosre khule hue sub-menu ko auto-close karne ke liye
    document.querySelectorAll(".menu-item-accordion").forEach((item) => {
      if (item !== accordionItem) {
        item.classList.remove("active");
      }
    });

    // Toggle state (Open/Close on click)
    accordionItem.classList.toggle("active");
    console.log("Accordion state changed!");
  }
});