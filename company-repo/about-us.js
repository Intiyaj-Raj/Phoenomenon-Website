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






// 1. Aapki Main Team Data List (Dono tabs isi list se chalenge)
const teamMembers = [
  { name: "Polina C.", role: "(co-founder)", img: "./team-pics/pc-profile.webp", vid: "./team-pics/video_polina-1.mp4" },
  { name: "Valerii F.", role: "(co-founder)", img: "./team-pics/valerii-profile.webp", vid: "./team-pics/valerii-video.mp4" },
  { name: " Yuliia A.", role: "(CEO)", img: "./team-pics/yullia-profile.webp", vid: "./team-pics/yullia-video.mp4" },
  { name: "Ruslan V.", role: "(head of design)", img: "./team-pics/ruslaan-profile.webp", vid: "./team-pics/ruslaan-video.mov" },
  { name: "Alina S.", role: "(operations director)", img: "./team-pics/alina-profile.webp", vid: "./team-pics/video_polina-1.mp4" },
  { name: "Anatoliy S.", role: "(head of development)", img: "./team-pics/anatoily-profile.webp", vid: "./team-pics/valerii-video.mp4" },
  { name: "Denis R.", role: "(head of IT engineering)", img: "./team-pics/denis-r-profile.webp", vid: "./team-pics/yullia-video.mp4" },
  { name: "Dmitriy K.", role: "(head of art)", img: "./team-pics/dmitrit-profile.webp", vid: "./team-pics/ruslaan-video.mov" },
  { name: "Alena O.", role: "(promo team lead)", img: "./team-pics/alena-profiel.webp", vid: "./team-pics/video_polina-1.mp4" },
  { name: "Artem i.", role: "(product team lead)", img: "./team-pics/artem-profile.webp", vid: "./team-pics/valerii-video.mp4" },
  { name: "Anastasia D.", role: "(account executive)", img: "./team-pics/anastasia-profile.webp", vid: "./team-pics/yullia-video.mp4" },
  { name: "Ksenia S.", role: "(account executive)", img: "./team-pics/ksenia-profile.webp", vid: "./team-pics/ruslaan-video.mov" },
  { name: "Oleksandr K.", role: "(marketing manager)", img: "./team-pics/oleksandr.webp", vid: "./team-pics/video_polina-1.mp4" },
  { name: "Iryna R.", role: "(PM lead)", img: "./team-pics/iryna.webp", vid: "./team-pics/valerii-video.mp4" },
  { name: "Vadym S.", role: "(lead front-end engineer)", img: "./team-pics/vadym-profile.webp", vid: "./team-pics/yullia-video.mp4" },
  { name: "Anna Ch..", role: "(HR manager)", img: "./team-pics/anna-ch.webp", vid: "./team-pics/ruslaan-video.mov" },
  { name: "Denys M.", role: "(solution architect)", img: "./team-pics/denys-m-profile.webp", vid: "./team-pics/video_polina-1.mp4" },
  { name: "Denys Z.", role: "(recruiter)", img: "./team-pics/denys.webp", vid: "./team-pics/valerii-video.mp4" },
  { name: "Daria  L.", role: "(product designer)", img: "./team-pics/daria-profile.webp", vid: "./team-pics/yullia-video.mp4" },
  { name: "Katerina K.", role: "(product designer)", img: "./team-pics/kterina-profile.webp", vid: "./team-pics/ruslaan-video.mov" }
];

function generateTeamCards(membersList, targetGridId) {
  const gridContainer = document.getElementById(targetGridId);
  if (!gridContainer) return;

  membersList.forEach(member => {
    const item = document.createElement('div');
    item.className = 'team-item';

    item.innerHTML = `
      <div class="media-container">
        <img src="${member.img}" alt="${member.name}" class="member-img">
        <video src="${member.vid}" class="member-vid" muted loop playsinline></video>
      </div>
      <div class="member-info">
        <img src="./team-pics/mic-off-icon.svg" alt="" class="mic-img">
        <p class="member-name">${member.name} <span class="member-role">${member.role}</span></p>
      </div>
    `;
    gridContainer.appendChild(item);
  });
}

generateTeamCards(teamMembers, 'leadership-team-grid');
generateTeamCards(teamMembers, 'talented-team-grid');


document.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.team-item');
  if (card) {
    const video = card.querySelector('.member-vid');
    if (video && video.paused) {
      video.currentTime = 0;
      video.play().catch(err => console.log("Autoplay context:", err));
    }
  }
});

document.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.team-item');
  if (card) {
    const video = card.querySelector('.member-vid');
    if (video && !video.paused) {
      video.pause();
    }
  }
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
        }, 150);
      });
    });

    wrapper.addEventListener("mouseleave", () => {
      wrapper.querySelector(".award-item.active")?.classList.remove("active");
      image.classList.remove("show");
      image.style.opacity = 0;
      setTimeout(() => { image.src = ""; }, 300); 
    });
  });
