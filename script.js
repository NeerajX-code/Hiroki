let menu = document.querySelector(".menu");
let btn = document.querySelector(".menu-button");
let flex = document.querySelector(".flex-nav");
let isfalse = true;

btn.addEventListener("click", () => {
  if (isfalse) {
    btn.innerHTML = `<img src="public/menu.svg" alt="">`;
    menu.style.top = "13px";
    menu.style.left = "87.2%";
    flex.style.display = "none";
  } else {
    btn.innerHTML = `❌`;
    menu.style.top = "15px";
    menu.style.left = "90%";
    flex.style.display = "flex";
  }
  isfalse = !isfalse;
});

gsap.registerPlugin(ScrollTrigger);

// init Lenis
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false,
});

// RAF loop for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// update ScrollTrigger on scroll
lenis.on("scroll", () => {
  ScrollTrigger.update();
});

// Tell ScrollTrigger to use Lenis as the scroller
// use body as scroller for Lenis
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value);
    } else {
      return window.scrollY;
    }
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? "transform" : "fixed",
});

ScrollTrigger.create({
  trigger: ".section-3",
  start: "top top",
  end: "bottom bottom",
  pin: ".sec3-left",
  pinSpacing: false, // remove extra space if needed
  scroller: document.body, // Lenis scroller
});
ScrollTrigger.create({
  trigger: ".section-5",
  start: "top top",
  end: "bottom bottom",
  pin: ".sec5-left",
  pinSpacing: false,
  scroller: document.body, // Lenis scroller
});
// refresh triggers after setup
ScrollTrigger.addEventListener("refresh", () => {
  lenis.raf(performance.now());
});
ScrollTrigger.refresh();

// ----------------------------
// ✨ Example Animations
// ----------------------------

// Hero text
gsap.from(".section-1 h1, .section-1 .sec1-p p", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power3.out",
});

// Section 2 cards fade up
gsap.from(".section-2 .card", {
  scrollTrigger: {
    trigger: ".section-2",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});

// Section 3 text + cards
gsap.from(".section-3 .sec3-right h1, .section-3 .sec3-card", {
  scrollTrigger: {
    trigger: ".section-3",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.3,
  duration: 1.2,
  ease: "power3.out",
});

// Section 5 images grid
gsap.from(".sec5-right-img div", {
  scrollTrigger: {
    trigger: ".section-5",
    start: "top 75%",
  },
  scale: 0.9,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out",
});

// refresh
ScrollTrigger.addEventListener("refresh", () => {
  lenis.raf(performance.now());
});
ScrollTrigger.refresh();
