// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const body = document.body;
const header = document.querySelector('#header');

if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', function(e) {
    header.classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });
}

// Navigation active state on scroll
const navLinks = document.querySelectorAll('#navbar .scrollto');

function navbarlinksActive() {
  let position = window.scrollY + 200;

  navLinks.forEach(navLink => {
    if (!navLink.hash) return;

    let section = document.querySelector(navLink.hash);
    if (!section) return;

    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}

window.addEventListener('load', navbarlinksActive);
document.addEventListener('scroll', navbarlinksActive);

// Smooth scroll for navigation links
document.querySelectorAll('a.scrollto').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;

      document.querySelector(hash).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      if (header.classList.contains('mobile-nav-active')) {
        header.classList.remove('mobile-nav-active');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
      }
    }
  });
});

// Back to top button
const backtotop = document.querySelector('.back-to-top');
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  }
  window.addEventListener('load', toggleBacktotop);
  document.addEventListener('scroll', toggleBacktotop);
}

// Typed effect for hero section
const typed = document.querySelector('.typed');
if (typed) {
  const strings = ['AI & Data Science Student', 'Python Developer', 'Data Analyst', 'Full-Stack Developer'];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentString = strings[stringIndex];
    
    if (isDeleting) {
      typed.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typed.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentString.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Skills progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 100);
  });
}

// Trigger progress bar animation when skills section is in view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillsSection);
}
