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

  // Add CSS styles to make team grid scrollable horizontally on mobile with arrows
  if (teamGrid) {
    teamGrid.style.scrollSnapType = 'x mandatory';
    document.querySelectorAll('.team-card').forEach(card => {
      card.style.scrollSnapAlign = 'start';
    });
  }
});
