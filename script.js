// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// ===== Set Current Year =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ===== Active Section Highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===== Navbar Background on Scroll =====
function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
}

// ===== Scroll to Top Button =====
function toggleScrollTopButton() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Event Listener =====
window.addEventListener('scroll', () => {
    highlightNavOnScroll();
    updateNavbarOnScroll();
    toggleScrollTopButton();
});

// ===== Form Validation =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(inputId) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    ['name', 'email', 'message'].forEach(id => clearError(id));
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        if (!name) {
            showError('name', 'Please enter your name');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            showError('message', 'Please enter a message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Show success message (no backend, just front-end demo)
            const successMessage = document.getElementById('formSuccess');
            successMessage.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });

    // Real-time validation on input
    ['name', 'email', 'message'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => clearError(id));
        }
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    highlightNavOnScroll();
    updateNavbarOnScroll();
    toggleScrollTopButton();
});
