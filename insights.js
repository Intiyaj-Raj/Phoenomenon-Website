const totalPages = 31;

let currentPage = 1;

const match = window.location.pathname.match(/\/page\/(\d+)\//);

if (match) {
  currentPage = parseInt(match[1]);
}

function goToPage(page) {
  if (page === 1) {
    window.location.href = "https://phenomenonstudio.com/blog/";
  } else {
    window.location.href = `https://phenomenonstudio.com/blog/page/${page}/`;
  }
}

// function renderPagination() {
//   const pageList = document.querySelector(".page-list");

//   let html = `
//         <li id="prevBtn" class="pagination-left-btn">
//             <i class="bi bi-arrow-left-short"></i>
//         </li>
//     `;

//   // First 3 pages
//   if (currentPage <= 3) {
//     for (let i = 1; i <= 3; i++) {
//       html += `
//                 <li
//                     class="${i === currentPage ? "active" : ""}"
//                     onclick="goToPage(${i})"
//                 >
//                     ${i}
//                 </li>
//             `;
//     }

//     html += `
//             <li>...</li>
//             <li onclick="goToPage(${totalPages})">${totalPages}</li>
//         `;
//   }

//   // Page 4+
//   else {
//     // for page 4
//     html += `
//             <li onclick="goToPage(1)">1</li>
//             <li>...</li>

//             <li class="active">
//                 ${currentPage}
//             </li>
//         `;

//     // for the page 5
//     if (currentPage < totalPages) {
//       html += `
//                 <li onclick="goToPage(${currentPage + 1})">
//                     ${currentPage + 1}
//                 </li>
//             `;
//     }

//     // for last page
//     html += `
//             <li onclick="goToPage(${totalPages})">
//                 ${totalPages}
//             </li>
//         `;
//   }

//   html += `
//         <li id="nextBtn">
//             <img src="../pictures/arrow-right-dark.svg" alt="">
//         </li>
//     `;

//   pageList.innerHTML = html;

//   // Previous Button
//   document.getElementById("prevBtn").addEventListener("click", () => {
//     if (currentPage > 1) {
//       goToPage(currentPage - 1);
//     }
//   });

//   // Next Button
//   document.getElementById("nextBtn").addEventListener("click", () => {
//     if (currentPage < totalPages) {
//       goToPage(currentPage + 1);
//     }
//   });
// }

// renderPagination();

/*
=============================================
      word reveal(typing calculation animation)
=============================================
*/
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
            }, index * 45);
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
/*
=============================================
      insights btn
=============================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.insights-btn');
  const sections = document.querySelectorAll('.category-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Button se target name extract karo
      const target = btn.getAttribute('data-target').trim().toLowerCase();

      // 2. Active button highlight toggle
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 3. Category Sections Filtering
      sections.forEach(section => {
        const sectionId = section.id.trim().toLowerCase();

        if (target === 'all' || sectionId === target) {
          section.classList.add('active-content'); // Show karega
        } else {
          section.classList.remove('active-content'); // Hide karega
        }
      });
    });
  });
});