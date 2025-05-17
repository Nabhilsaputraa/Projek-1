document.addEventListener('DOMContentLoaded', function() {
  // Parallax Effect
  initParallax();
  
  // Count-Up Animation
  initCountUp();
  
  // Member Hover Effects
  initMemberHover();
  
  // Animate.css Scroll Triggers
  initAnimateOnScroll();
  
  // Smooth Scrolling
  initSmoothScrolling();
  
  // Navbar Scroll Effect
  initNavbarScroll();
  
  // Service Animations
  initServiceAnimations();
});

function initParallax() {
  const bg = document.querySelector('.parallax-bg');
  if (bg) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      bg.style.transform = `translate3d(0, ${scrollPosition * 0.3}px, 0)`;
    });
  }
}

function initCountUp() {
  const countUp = document.querySelector('.count-up');
  if (countUp) {
    const target = parseInt(countUp.getAttribute('data-count'));
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        countUp.textContent = Math.floor(count) + '+';
        requestAnimationFrame(updateCount);
      } else {
        countUp.textContent = target + '+';
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(countUp);
      }
    }, { threshold: 0.5 });
    
    observer.observe(countUp);
  }
}

function initMemberHover() {
  const memberImages = document.querySelectorAll('.flex.-space-x-2 img');
  memberImages.forEach(img => {
    img.addEventListener('mouseover', () => {
      img.style.transform = 'scale(1.1) translateY(-5px)';
    });
    img.addEventListener('mouseout', () => {
      img.style.transform = '';
    });
  });
}

function initAnimateOnScroll() {
  const animateElements = document.querySelectorAll('.animate__animated');
  if (animateElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.dataset.animate);
          animationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      element.dataset.animate = element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                              element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' :
                              element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' : '';
      animationObserver.observe(element);
    });
  }
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

function initNavbarScroll() {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });
  }
}

function initServiceAnimations() {
  // First row animation (left to right)
  const row1Services = document.querySelectorAll('.service-row-1');
  row1Services.forEach((service, index) => {
    setTimeout(() => {
      service.classList.add('animate');
    }, index * 150);
  });
  
  // Second row animation (right to left)
  const row2Services = document.querySelectorAll('.service-row-2');
  row2Services.forEach((service, index) => {
    setTimeout(() => {
      service.classList.add('animate');
    }, (index * 150) + 300); // Start after first row completes
  });
  
  // Intersection Observer for scroll-triggered animations
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const services = entry.target.querySelectorAll('[class*="service-row-"]');
        services.forEach((service, index) => {
          setTimeout(() => {
            service.classList.add('animate');
          }, index * 150);
        });
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  const servicesContainer = document.querySelector('#services .container');
  if (servicesContainer) {
    serviceObserver.observe(servicesContainer);
  }
}