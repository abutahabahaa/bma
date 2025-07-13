// Typewriter Effect
const typeTarget = document.getElementById('typewriter');
const words = ['Frontend Developer', 'JavaScript Enthusiast', 'Computer Science Student'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const word = words[wordIndex];
  let displayed = word.substring(0, charIndex);
  typeTarget.innerHTML = displayed + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}
type();

// Scroll to Top Button
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll Progress Indicator
const scrollIndicator = document.getElementById("scroll-indicator");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = Math.round((scrollTop / docHeight) * 100);
  scrollIndicator.textContent = `${scrollPercent}%`;
  scrollIndicator.style.background = `conic-gradient(#4f46e5 ${scrollPercent}%, #ccc ${scrollPercent}%)`;
});

// Theme Toggle with LocalStorage
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  }
});

// Parallax Avatar
const avatar = document.getElementById("avatar-img");
document.querySelector(".header").addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = (clientX - centerX) / 30;
  const offsetY = (clientY - centerY) / 30;
  avatar.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});
avatar.addEventListener("mouseleave", () => {
  avatar.style.transform = "translate(0, 0)";
});
avatar.addEventListener("click", () => {
  avatar.classList.add("pop");
  setTimeout(() => avatar.classList.remove("pop"), 300);
});

// Navigation Active Link Highlight
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(id)) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Skills Animation on View
const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".bar");
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => bar.style.width = width, 100);
      });
      skillObserver.unobserve(skillSection);
    }
  });
}, { threshold: 0.4 });
skillObserver.observe(skillSection);

// Read More / Less in About
function toggleBio() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("read-more-btn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    moreText.style.display = "none";
    btnText.innerText = "Read More";
  } else {
    dots.style.display = "none";
    moreText.style.display = "inline";
    btnText.innerText = "Read Less";
  }
}

// Contact Form: Char Counter + Validation + LocalStorage
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("char-counter");

[nameInput, emailInput, messageInput].forEach((field) => {
  field.addEventListener("input", () => {
    localStorage.setItem(field.id, field.value);
  });
});

messageInput.addEventListener("input", () => {
  charCounter.textContent = `${messageInput.value.length} / 500`;
});

window.addEventListener("load", () => {
  [nameInput, emailInput, messageInput].forEach((field) => {
    const saved = localStorage.getItem(field.id);
    if (saved) field.value = saved;
  });
  charCounter.textContent = `${messageInput.value.length} / 500`;
});

// Form Validation
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const nameErr = document.getElementById("name-error");
  const emailErr = document.getElementById("email-error");
  const msgErr = document.getElementById("message-error");

  if (nameInput.value.trim().length < 2) {
    nameErr.textContent = "Please enter a valid name.";
    valid = false;
  } else {
    nameErr.textContent = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailErr.textContent = "Please enter a valid email.";
    valid = false;
  } else {
    emailErr.textContent = "";
  }

  if (messageInput.value.trim().length < 10) {
    msgErr.textContent = "Message must be at least 10 characters.";
    valid = false;
  } else {
    msgErr.textContent = "";
  }

  if (valid) {
    alert("Thank you for your message!");
    form.reset();
    charCounter.textContent = "0 / 500";
    localStorage.clear();
  }
});

// Modal for Projects
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function openModal(id) {
  const content = {
    1: `<h3>Authentication pages for (taha market)</h3><p>Web pages were created for authentication using HTML,CSSwhere a uniform background wa selected with colored gradients for all authentication pages ,<h2>Authentication pages are</h2>
    <ul>
    <li>login:to access users with an account </li>
    <li>forgot password:for users who have forgotten the passwoed </li>
    <li>registir:this page for users who do'nt have an account ,an account is created for them from this page </li>
    </ul> </p>`,
    2: `<h3>A suparmarket web page</h3><p>Created web pages to super market using KTMLand simple CSS inside HTML ,
    The home bage contains a navigation bar that contions a set of links to move like aboutus ,servises,contactus,location .</p>`
  };
  modalBody.innerHTML = content[id] || "Project not found.";
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}

// Auto Year
document.getElementById("year").textContent = new Date().getFullYear();

// 🌟 Testimonial Carousel
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((el, i) => {
    el.classList.remove("active");
    if (i === index) {
      el.classList.add("active");
    }
  });
}

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 4000); // كل 4 ثواني
// 🌟 Manual Testimonial Navigation
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");



prevBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}); 
// 🔝 Back To Top button
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
window.addEventListener("scroll", () => {
  const topBtn = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    topBtn.style.display = "inline-block";
  } else {
    topBtn.style.display = "none";
  }

});

});
