/* Minimalist JavaScript untuk Website Guru IT SMP YPS Singkole */

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functions
  initializeScrollEffects();
  initializeScrollReveal();
  initializeSearch();
  initializeContactForm();
  initTypingEffect(); // Initialize typing effect
});

// Scroll reveal animation
function initializeScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Observe scroll reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-card').forEach(el => {
    observer.observe(el);
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Search functionality for materials
function searchMaterials() {
  const searchTerm = document.getElementById("searchInput")?.value.toLowerCase();
  if (!searchTerm) return;

  const cards = document.querySelectorAll(".bg-white.rounded-2xl");

  cards.forEach((card) => {
    const title = card.querySelector("h4")?.textContent.toLowerCase() || "";
    const description = card.querySelector("p")?.textContent.toLowerCase() || "";

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.3s ease-out";
    } else {
      card.style.display = "none";
    }
  });
}

// Contact form handling
function handleContactForm(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Mengirim...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Simulate form submission (replace with actual backend)
  setTimeout(() => {
    // Show success message
    if (successMessage) {
      successMessage.classList.remove('hidden');
      successMessage.style.animation = 'fadeIn 0.5s ease-out';
    }

    // Reset form
    form.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMessage) {
        successMessage.classList.add('hidden');
      }
    }, 5000);

    // Log form data (for demonstration)
    console.log('Form submitted:', data);

  }, 1500);
}

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(searchMaterials, 300));
  }
}

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
}

// Scroll effects
function initializeScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }

    lastScroll = currentScroll;
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // ESC key to close mobile menu or reset search
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
      searchInput.value = '';
      searchMaterials();
    }
  }

  // Ctrl+K or Cmd+K for search focus
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Typing effect function
function initTypingEffect() {
  const text = "Digital Learning Platform for SMP YPS Singkole students";
  const typingElement = document.getElementById('typing-text');

  if (typingElement) {
    let index = 0;
    let currentText = '';

    function type() {
      if (index < text.length) {
        currentText += text.charAt(index);
        typingElement.textContent = currentText;
        index++;
        setTimeout(type, 100); // Adjust typing speed here
      } else {
        setTimeout(() => {
          // Restart typing animation after completion
          index = 0;
          currentText = '';
          typingElement.textContent = '';
          setTimeout(type, 2000); // Pause before restarting
        }, 2000);
      }
    }

    // Start typing after page load
    setTimeout(type, 1000);
  }
}

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.searchMaterials = searchMaterials;
window.handleContactForm = handleContactForm;