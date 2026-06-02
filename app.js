/**
 * Printfix - Premium Custom Design & Printing Services
 * Interactive script for landing page
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Header & Active Navigation Link
  // ==========================================
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    // Toggle sticky class
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Scroll spy for active navigation item
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuSpans = mobileToggle.querySelectorAll('span');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    if (navMenu.classList.contains('active')) {
      menuSpans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      menuSpans[1].style.opacity = '0';
      menuSpans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      menuSpans[0].style.transform = 'none';
      menuSpans[1].style.opacity = '1';
      menuSpans[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuSpans[0].style.transform = 'none';
      menuSpans[1].style.opacity = '1';
      menuSpans[2].style.transform = 'none';
    });
  });

  // ==========================================
  // 3. FAQ Accordion Collapsible
  // ==========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all accordion items first
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-body').style.maxHeight = '0px';
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        // Set height based on content size for a smooth CSS transition
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open the first FAQ item by default
  const firstFaqItem = document.querySelector('.accordion-item');
  if (firstFaqItem) {
    firstFaqItem.classList.add('active');
    const firstBody = firstFaqItem.querySelector('.accordion-body');
    firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // ==========================================
  // 4. Stats Counter Animation
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let countCompleted = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.max(Math.floor(duration / target), 10);
      
      const counter = setInterval(() => {
        // Linear step speed increment
        count += Math.ceil(target / (duration / stepTime));
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(counter);
        } else {
          stat.textContent = count + suffix;
        }
      }, stepTime);
    });
    countCompleted = true;
  };

  // Trigger counters when stats section is in view
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countCompleted) {
          animateStats();
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }

  // ==========================================
  // 5. Testimonial Carousel/Slider
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });

    // Auto rotate slides every 8 seconds
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 8000);
  }

  // ==========================================
  // 6. Team Members Slider (Navigation Control)
  // ==========================================
  const teamPrev = document.querySelector('.team-prev');
  const teamNext = document.querySelector('.team-next');
  const teamGrid = document.querySelector('.team-grid');
  
  if (teamPrev && teamNext && teamGrid) {
    teamNext.addEventListener('click', () => {
      // Smooth scroll the team grid list to the right
      teamGrid.scrollBy({
        left: teamGrid.clientWidth,
        behavior: 'smooth'
      });
    });

    teamPrev.addEventListener('click', () => {
      // Smooth scroll the team grid list to the left
      teamGrid.scrollBy({
        left: -teamGrid.clientWidth,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 6.1 Blog Posts Slider (Navigation Control)
  // ==========================================
  const blogPrev = document.querySelector('.blog-prev');
  const blogNext = document.querySelector('.blog-next');
  const blogGrid = document.querySelector('.blog-grid');
  
  if (blogPrev && blogNext && blogGrid) {
    blogNext.addEventListener('click', () => {
      // Smooth scroll the blog grid list to the right
      blogGrid.scrollBy({
        left: blogGrid.clientWidth,
        behavior: 'smooth'
      });
    });

    blogPrev.addEventListener('click', () => {
      // Smooth scroll the blog grid list to the left
      blogGrid.scrollBy({
        left: -blogGrid.clientWidth,
        behavior: 'smooth'
      });
    });
  }

  // Add CSS styles to make team grid scrollable horizontally on mobile with arrows
  if (teamGrid) {
    teamGrid.style.scrollSnapType = 'x mandatory';
    document.querySelectorAll('.team-card').forEach(card => {
      card.style.scrollSnapAlign = 'start';
    });
  }

  // ==========================================
  // 7. Preloader Screen Fade-Out
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('fade-out');
    });
    // Safety fallback in case window load fires before or takes too long
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 2000);
  }

  // ==========================================
  // 8. Viewport Scroll Reveals (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          // Unobserve to keep element visible once revealed
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // 9. Circular Scroll Progress (Back to Top)
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const progressPath = backToTopBtn ? backToTopBtn.querySelector('path') : null;

  if (backToTopBtn && progressPath) {
    const pathLength = progressPath.getTotalLength();
    
    // Setup initial stroke dash array properties
    progressPath.style.transition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect(); // Trigger DOM reflow
    progressPath.style.transition = 'stroke-dashoffset 10ms linear';
    
    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progressOffset = pathLength - (scroll * pathLength / Math.max(height, 1));
      progressPath.style.strokeDashoffset = progressOffset;
      
      // Toggle button visibility based on vertical scroll offset
      if (scroll > 150) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Run once initially to capture initial position
    updateProgress();
  }

  // ==========================================
  // 10. Testimonial Side Avatar Clicking Navigation
  // ==========================================
  if (slides.length > 0) {
    slides.forEach((slide) => {
      const leftAvatar = slide.querySelector('.testimonial-avatar-left');
      const rightAvatar = slide.querySelector('.testimonial-avatar-right');
      
      if (leftAvatar) {
        leftAvatar.addEventListener('click', () => {
          showSlide(currentSlide - 1);
        });
      }
      
      if (rightAvatar) {
        rightAvatar.addEventListener('click', () => {
          showSlide(currentSlide + 1);
        });
      }
    });
  }

  // ==========================================
  // 11. Portfolio Expanding Cards Click Logic
  // ==========================================
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (portfolioCards.length > 0) {
    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all portfolio cards
        portfolioCards.forEach(c => c.classList.remove('active'));
        // Add active class to the clicked card
        card.classList.add('active');
      });
    });
  }
});

