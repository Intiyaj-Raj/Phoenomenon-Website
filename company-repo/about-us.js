const audio = document.getElementById('vf-audio-element');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const seekSlider = document.getElementById('seek-slider');
const timeRemainingDisplay = document.getElementById('time-remaining');

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `-${returnedMinutes}:${returnedSeconds}`;
}

audio.addEventListener('loadedmetadata', () => {
  seekSlider.max = Math.floor(audio.duration);
  timeRemainingDisplay.textContent = formatTime(audio.duration);
});

// Play / Pause Toggle Logic
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    audio.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
});

audio.addEventListener('timeupdate', () => {
  seekSlider.value = Math.floor(audio.currentTime);

  const remainingTime = audio.duration - audio.currentTime;
  if (!isNaN(remainingTime)) {
    timeRemainingDisplay.textContent = formatTime(remainingTime);
  }
});

seekSlider.addEventListener('input', () => {
  audio.currentTime = seekSlider.value;
  const remainingTime = audio.duration - audio.currentTime;
  if (!isNaN(remainingTime)) {
    timeRemainingDisplay.textContent = formatTime(remainingTime);
  }
});

audio.addEventListener('ended', () => {
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  seekSlider.value = 0;
  timeRemainingDisplay.textContent = formatTime(audio.duration);
});







window.addEventListener('scroll', () => {
  const section = document.querySelector('.agency-in-numbers-inner-part');
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const sectionHeight = rect.height;

  // Jab section screen me enter karega tabhi animation shuru hogi
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {

    // Calculate progress (0 se 1 ke beech me)
    let totalScrollable = sectionHeight - window.innerHeight;
    let currentScroll = Math.abs(rect.top);
    let progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

    // 1. Numbers Counter Logic (04 -> 78, etc.)
    let team = Math.floor(4 + (78 - 4) * progress);
    let projects = Math.floor(1 + (601 - 1) * progress);
    let clients = Math.floor(1 + (298 - 1) * progress);
    let awards = Math.floor(0 + (46 - 0) * progress);

    document.querySelector(".agency-numbers span:nth-child(1) h1").innerText = String(team).padStart(2, '0');
    document.querySelector(".agency-numbers span:nth-child(2) h1").innerText = String(projects).padStart(3, '0');
    document.querySelector(".agency-numbers span:nth-child(3) h1").innerText = String(clients).padStart(3, '0');
    document.querySelector(".agency-numbers span:nth-child(4) h1").innerText = String(awards).padStart(2, '0');

    // 2. Text Change aur Card Show karne ka Logic (Based on progress)
    const pText = document.querySelector(".vf-right-text");
    const card = document.querySelector(".vf-card");

    if (progress > 0.5) {
      // 50% scroll hone ke baad content change aur card show
      pText.innerHTML = `Step by step, these first projects turned into long-term collaborations, and today our portfolio spans hundreds of products for companies around the world.`;
      card.classList.add('show-card');
    } else {
      // Wapas upar jaane par purana state
      pText.innerHTML = `We started working with our first few startups on products they needed to bring to market quickly. Many of those early clients are still with us today, as we’ve grown side by side and watched each other evolve.`;
      card.classList.remove('show-card');
    }
  }
});






// 1. Clean data array with only images (no videos)
// const teamMembers = [
//   { name: "Avinash Gour", role: "(Founder & CEO)", img: "../infotive/Avinash-sir-2.jpeg" },
//   { name: "Ritendra Gour", role: "(Performance Marketing Specialist)", img: "../infotive/our-team/ritendr-sir.jpeg" },
//   { name: " Sudha Patidar", role: "( Business Development Specialist)", img: "../infotive/our-team/sudha.jpeg" },
//   { name: "Akshay Patel", role: "(Technical Delivery Manager)", img: "../infotive/our-team/akshay.jpeg" },
//   { name: "Jagruti Hiwase", role: "(Human Resources Manager)", img: "../infotive/our-team/Jagruti Hiwase.jpeg" },
//   { name: "Deepanshu Rode", role: "(Growth Marketing Manager)", img: "../infotive/our-team/dipanshu-sir.jpeg" },
//  { name: "Anurag Gour", role: "(Head of Sales)", img: "../infotive/our-team/anurag-gour .jpeg" },
//   { name: "Saloni Jaiswal", role: "(Social Media Marketing Specialist)", img: "../infotive/our-team/saloni-ma'am.jpeg" },
//   { name: "Nishant Gour", role: "(Video Production Specialist)", img: "../infotive/our-team/nishant.jpeg" },
//   { name: "Risabh Raguwanshi", role: "(Operations Manager)", img: "../infotive/our-team/rishab-sir.jpeg" },
//    { name: "Srinivas Rao", role: "(Software Engineer (MERN Stack))", img: "../infotive/our-team/raw.png" },
//    { name: "Vishal Prajapati", role: "(Frontend Engineer)", img: "../infotive/our-team/vishal.jpeg" },
//    { name: "Intiyaj Ansari", role: "(E-commerce Developer)", img: "../infotive/our-team/Intiyaz Ansari.jpeg" },
  
//   // { name: "Vadym S.", role: "(lead front-end engineer)", img: "./team-pics/vadym-profile.webp" },
//   // { name: "Anna Ch..", role: "(HR manager)", img: "./team-pics/anna-ch.webp" },
//   // { name: "Denys M.", role: "(solution architect)", img: "./team-pics/denys-m-profile.webp" },
//   // { name: "Denys Z.", role: "(recruiter)", img: "./team-pics/denys.webp" },
//   // { name: "Daria  L.", role: "(product designer)", img: "./team-pics/daria-profile.webp" },
//   // { name: "Katerina K.", role: "(product designer)", img: "./team-pics/kterina-profile.webp" }
// ];

// 2. Pure dynamic card generation layout function
// function generateTeamCards(membersList, targetGridId) {
//   const gridContainer = document.getElementById(targetGridId);
//   if (!gridContainer) return;

//   gridContainer.innerHTML = ''; // Prevent layout duplicates

//   membersList.forEach(member => {
//     const item = document.createElement('div');
//     item.className = 'team-item';

//     item.innerHTML = `
//       <div class="media-container">
//         <img src="${member.img}" alt="${member.name}" class="member-img">
//       </div>
//       <div class="member-info">
//         <img src="./team-pics/mic-off-icon.svg" alt="" class="mic-img">
//         <p class="member-name">${member.name} <span class="member-role">${member.role}</span></p>
//       </div>
//     `;
//     gridContainer.appendChild(item);
//   });
// }
const teamMembers = [
  { name: "Avinash Gour", role: "(Founder & CEO)", img: "../infotive/our-team/Avinash sir - Copy.jpeg" },
  { name: "Ritendra Gour", role: "(Performance Marketing Specialist)", img: "../infotive/our-team/ritendr-sir.jpeg" },
  { name: " Sudha Patidar", role: "( Business Development Specialist)", img: "../infotive/our-team/sudha.jpeg" },
  { name: "Akshay Patel", role: "(Technical Delivery Manager)", img: "../infotive/our-team/akshay.jpeg" },
  { name: "Jagruti Hiwase", role: "(Human Resources Manager)", img: "../infotive/our-team/Jagruti Hiwase.jpeg" },
  { name: "Deepanshu Rode", role: "(Growth Marketing Manager)", img: "../infotive/our-team/dipanshu-sir.jpeg" },
 { name: "Anurag Gour", role: "(Head of Sales)", img: "../infotive/our-team/anurag-gour .jpeg" },
  { name: "Saloni Jaiswal", role: "(Social Media Marketing Specialist)", img: "../infotive/our-team/saloni-ma'am.jpeg" },
  { name: "Nishant Gour", role: "(Video Production Specialist)", img: "../infotive/our-team/nishant.jpeg" },
  { name: "Risabh Raguwanshi", role: "(Operations Manager)", img: "../infotive/our-team/rishab-sir.jpeg" },
   { name: "Srinivas Rao", role: "(Software Engineer (MERN Stack))", img: "../infotive/our-team/raw.png" },
   { name: "Vishal Prajapati", role: "(Frontend Engineer)", img: "../infotive/our-team/vishal.jpeg" },
   { name: "Intiyaj Ansari", role: "(E-commerce Developer)", img: "../infotive/our-team/intiyaz.jpeg" },
  
  // { name: "Vadym S.", role: "(lead front-end engineer)", img: "./team-pics/vadym-profile.webp" },
  // { name: "Anna Ch..", role: "(HR manager)", img: "./team-pics/anna-ch.webp" },
  // { name: "Denys M.", role: "(solution architect)", img: "./team-pics/denys-m-profile.webp" },
  // { name: "Denys Z.", role: "(recruiter)", img: "./team-pics/denys.webp" },
  // { name: "Daria  L.", role: "(product designer)", img: "./team-pics/daria-profile.webp" },
  // { name: "Katerina K.", role: "(product designer)", img: "./team-pics/kterina-profile.webp" }
];

// 2. Pure dynamic card generation layout function
function generateTeamCards(membersList, targetGridId) {
  const gridContainer = document.getElementById(targetGridId);
  if (!gridContainer) return;

  gridContainer.innerHTML = ''; // Prevent layout duplicates

  membersList.forEach(member => {
    const item = document.createElement('div');
    item.className = 'team-item';

    item.innerHTML = `
      <div class="media-container">
        <img src="${member.img}" alt="${member.name}" class="member-img">
      </div>
      <div class="member-info">
        <img src="./team-pics/mic-off-icon.svg" alt="" class="mic-img">
        <p class="member-name">${member.name} <span class="member-role">${member.role}</span></p>
      </div>
    `;
    gridContainer.appendChild(item);
  });
}


// 3. Setup dynamic click tabs behavior engine matching your exact CSS selectors
function initTeamTabs() {
  // Target any button elements directly inside your button wrapper layout
  const tabButtons = document.querySelectorAll('.team-page-btn button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      
      // 1. Clear .active from all sister buttons to trigger circle scale down (0) animation
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 2. Remove display styles from content panels
      document.querySelectorAll('.p6-card').forEach(card => card.classList.remove('active-content'));
      
      // 3. Add .active to the clicked tab button to scale up (4) the black background circle
      button.classList.add('active');
      
      // 4. Activate chosen content grid panel
      const activeCard = document.getElementById(targetId);
      if (activeCard) {
        activeCard.classList.add('active-content');
      }
    });
  });
}

// Run engine safely on DOM mount
document.addEventListener('DOMContentLoaded', () => {
  generateTeamCards(teamMembers, 'leadership-team-grid');
  generateTeamCards(teamMembers, 'talented-team-grid');
  initTeamTabs();
});




// awards-hover-part
const awardWrappers = document.querySelectorAll(".award-wrapper");

awardWrappers.forEach(wrapper => {
  const items = wrapper.querySelectorAll(".award-item");
  const image = wrapper.querySelector(".award-img-element");

  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      wrapper.querySelector(".award-item.active")?.classList.remove("active");

      item.classList.add("active");

      image.style.opacity = 0;

      setTimeout(() => {
        image.src = item.dataset.img;
        image.classList.add("show");
        image.style.opacity = 1;
      }, 50);
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.querySelector(".award-item.active")?.classList.remove("active");

    image.classList.remove("show");

    setTimeout(() => {
      image.removeAttribute("src");
    }, 50);
  });
});
