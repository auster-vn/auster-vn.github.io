/* ==========================================================================
   PORTFOLIO SCRIPTS - CHAU PHU TRAN
   Features: Automated Typewriter, Project Filtering, Mobile Navigation, Active Link Highlight
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. AUTOMATED TYPEWRITER EFFECT
  const words = ["Data Scientist", "Data Engineer", "AI/ML Enthusiast", "Problem Solver"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  
  function type() {
    if (!typewriterElement) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove characters
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add characters
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Typing speeds
    let typeSpeed = isDeleting ? 40 : 100;
    
    // Check if word is complete
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Move to next word
      typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type(); // Initialize typewriter

  // 3. PROJECT FILTER SYSTEM
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs, add to clicked
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filterValue = tab.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          // Show card with smooth animation
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide card
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. SCROLL HIGHLIGHT (ACTIVE NAV LINK)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Check if current scroll position is within section boundaries
      if (pageYOffset >= (sectionTop - 150)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. EMAIL SUBMISSION HANDLER USING WEB3FORMS (REAL SENDING)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Extract form data
      const formData = new FormData(contactForm);
      
      // Access Key placeholder (users should replace this string in the code with their actual key)
      formData.append('access_key', 'd019e35d-dd3f-47b5-a375-b119e1e6d46e');

      // Fetch Web3Forms Submit API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Thank you! Your message has been sent successfully.');
          contactForm.reset();
        } else {
          alert('Oops! Something went wrong: ' + data.message);
        }
      })
      .catch(error => {
        alert('Connection error! Could not reach the email server.');
      })
      .finally(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      });
    });
  }

});
