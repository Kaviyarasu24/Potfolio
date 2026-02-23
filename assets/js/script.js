// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const body = document.body;

if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', function(e) {
    body.classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Close mobile nav when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    });
  });
}

// Header scroll effect
const header = document.querySelector('#header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Navigation active state on scroll
const navLinks = document.querySelectorAll('#navbar .scrollto');

function navbarlinksActive() {
  const scrollPosition = window.scrollY;
  const headerOffset = 80; // Adjusted offset for detection
  
  // Find which section is currently in view
  let currentSection = null;
  
  navLinks.forEach(navLink => {
    if (!navLink.hash) return;
    
    const section = document.querySelector(navLink.hash);
    if (!section) return;
    
    const sectionTop = section.offsetTop - headerOffset;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    // Check if current scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = navLink;
    }
  });
  
  // Update active states
  navLinks.forEach(link => link.classList.remove('active'));
  if (currentSection) {
    currentSection.classList.add('active');
  }
}

window.addEventListener('load', navbarlinksActive);
document.addEventListener('scroll', navbarlinksActive);

// Smooth scroll for navigation links
document.querySelectorAll('a.scrollto').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      const target = document.querySelector(hash);
      
      if (target) {
        const headerOffset = 70; // Exact header height
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active state after scroll
        setTimeout(() => {
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }, 100);
      }

      // Close mobile nav if open
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        if (mobileNavToggle) {
          mobileNavToggle.classList.add('bi-list');
          mobileNavToggle.classList.remove('bi-x');
        }
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
