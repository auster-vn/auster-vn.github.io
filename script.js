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
      typeSpeed = 1500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();

  // 3. FEATURED JOBRADAR PROJECT
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && !document.querySelector('[data-project="jobradar"]')) {
    const jobRadarCard = document.createElement('div');
    jobRadarCard.className = 'project-card glass-card';
    jobRadarCard.dataset.category = 'de ml';
    jobRadarCard.dataset.project = 'jobradar';
    jobRadarCard.innerHTML = `
      <div class="project-badge">Data Engineering & ML Platform</div>
      <div class="project-content">
        <h3 class="project-title">JobRadar VN 📡</h3>
        <h4 class="project-subtitle">Vietnamese Tech Job-Market Intelligence, Matching & Salary Analytics</h4>
        <p class="project-desc">
          A production-ready Vietnamese technology job-market intelligence platform that collects permitted public job postings and converts them into traceable, normalized market data. It delivers multi-filter job discovery, bilingual title and skill normalization, hiring-trend and salary analytics, encrypted CV extraction with pgvector semantic matching, deterministic skill-gap analysis, gated XGBoost salary prediction, and scheduled email or Telegram alerts. The system runs as independently executable web, API, worker, analytics, and ML processes with CI/CD, observability, security scanning, backups, and private HTTPS deployment.
        </p>
        <div class="project-tech">
          <span>Next.js 16</span>
          <span>React 19</span>
          <span>TypeScript 5</span>
          <span>FastAPI</span>
          <span>PostgreSQL 16</span>
          <span>pgvector</span>
          <span>Redis 7</span>
          <span>Celery</span>
          <span>dbt</span>
          <span>XGBoost</span>
          <span>Sentence Transformers</span>
          <span>MLflow</span>
          <span>Docker</span>
          <span>GitHub Actions</span>
        </div>
        <div class="project-actions">
          <a href="https://github.com/auster-vn/JobRadar" target="_blank" rel="noopener noreferrer" class="project-btn btn-code">
            <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.4 6,9.5 6.63,8.8C6.53,8.55 6.18,7.52 6.73,6.15C6.73,6.15 7.58,5.88 9.5,7.17C10.3,6.95 11.18,6.84 12,6.84C12.82,6.84 13.7,6.95 14.5,7.17C16.42,5.88 17.27,6.15 17.27,6.15C17.82,7.52 17.47,8.55 17.37,8.8C18,9.5 18.38,10.4 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>
            Source Code
          </a>
        </div>
      </div>
    `;
    projectsGrid.prepend(jobRadarCard);
  }

  // 4. PROJECT FILTER SYSTEM
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filterValue = tab.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const categories = category ? category.split(' ') : [];
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. SCROLL HIGHLIGHT (ACTIVE NAV LINK)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
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

  // 6. EMAIL SUBMISSION HANDLER USING WEB3FORMS
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      formData.append('access_key', 'd019e35d-dd3f-47b5-a375-b119e1e6d46e');

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
      .catch(() => {
        alert('Connection error! Could not reach the email server.');
      })
      .finally(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      });
    });
  }
});
