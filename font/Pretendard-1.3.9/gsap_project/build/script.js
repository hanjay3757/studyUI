$(function () {
  $('.animate').scrolla({
    mobile: true,
    once: false,
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.from('.img', {
  y: -200,
  opacity: 0,
  duration: 1.2,
  ease: 'bounce.out',
});

// 스크롤 트리거: 아래로 스크롤 시 이미지 위로 사라짐
ScrollTrigger.create({
  trigger: '.img',
  start: 'top top', // 화면 상단에 닿으면
  end: 'bottom top', // 화면 위로 사라질 때까지
  onLeave: () => {
    gsap.to('.img', {
      y: -200,
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
    });
  },
  onEnterBack: () => {
    gsap.fromTo(
      '.img',
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'bounce.out',
      }
    );
  },
});

const ani1 = gsap.timeline();
ani1
  .to('#section1 .parallax__item__text', {
    scale: 60,
    duration: 2,
  })
  .to('#section1 .parallax__item__text', {
    autoAlpha: 0,
  });

ScrollTrigger.create({
  animation: ani1,
  trigger: '#section1',
  start: 'top top',
  end: '+=4000',
  scrub: true,
  pin: true,
  anticipatherPin: 1,
  invalidateOnRefresh: true,
  // markers: true,
});

// 시간
const clock = document.getElementById('clock');

function updateKST() {
  const now = new Date();

  const options = {
    timeZone: 'Asia/Seoul',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const kstTime = new Intl.DateTimeFormat('ko-KR', options).format(now);
  clock.textContent = kstTime;
}
updateKST();

setInterval(updateKST, 1000);

// 스크롤시 이미지 크기

gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('.imgboxs img');

images.forEach((img, i) => {
  const triggerElement = img.closest('.imgbox');

  // 다음 이미지가 있다면 그 전까지만 애니메이션 적용
  const nextTrigger = images[i + 1]?.closest('.imgbox');

  gsap.to(img, {
    scale: 1.4,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top center',
      endTrigger: nextTrigger || triggerElement,
      end: nextTrigger ? 'top center' : 'bottom top',
      scrub: true,
      // markers: true,
    },
  });
});

const textBoxes = gsap.utils.toArray('.gap > div'); // .info, .projectgap, .toolsbox

textBoxes.forEach((box, i) => {
  const parentBox = box.closest('.imgbox');

  gsap.from(box, {
    x: 100, // 오른쪽에서 왼쪽으로
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: parentBox,
      start: 'top 80%', // 보이기 시작할 위치
      toggleActions: 'play none none reverse',
    },
    delay: i * 0.1, // 약간의 순차적 효과
  });
});

// section3

const lists = document.querySelectorAll('#scrollingList');

lists.forEach((list) => {
  // 리스트 복제
  list.innerHTML += list.innerHTML;
  // 리스트 복제
  list.innerHTML += list.innerHTML;

  // 모든 <li> 요소들을 다시 가져옴 (복제 이후!)
  const items = list.querySelectorAll('li');

  // 전체 너비 계산
  let totalWidth = 0;
  items.forEach((item) => {
    totalWidth += item.offsetWidth;
  });

  // 애니메이션 적용
  gsap.to(list, {
    x: `-=${totalWidth / 2}`, // 원본 너비만큼만 반복
    duration: 30,
    ease: 'none',
    repeat: -1,
  });
});

// 사이드 탑 버튼
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const goToBtn = document.getElementById('goToBtn');

// 스크롤 시 버튼 show/hide
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (self) => {
    if (self.scroll() > 300) {
      goToBtn.classList.add('active');
    } else {
      goToBtn.classList.remove('active');
    }
  },
});

// 클릭 시 부드럽게 최상단 이동
goToBtn.addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: { y: 0 },
    duration: 1,
    ease: 'power2.out',
  });
});

// contact
(function () {
  emailjs.init('SPISxQpXsQJCH6J3b'); // 예: emailjs.init("D8gKzXXXXXXAbc1");
})();
document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_az3014', 'template_y3f58g9', this).then(
      function () {
        alert('메시지가 성공적으로 전송되었습니다!');
        document.getElementById('contact-form').reset(); // 입력 초기화
      },
      function (error) {
        alert('전송 실패! 오류: ' + JSON.stringify(error));
      }
    );
  });
