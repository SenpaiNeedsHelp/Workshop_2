/* ========================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   ======================================== */

// DOM Elements
const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form-id');
const messageDiv = document.getElementById('form-message');

// ========================================
// NAVIGATION & SCROLL EFFECTS
// ========================================

// Toggle Mobile Menu
function toggleMenu() {
    const isOpen = navLinks.classList.contains('open');
    navLinks.classList.toggle('open', !isOpen);
    menuButton.classList.toggle('active', !isOpen);
    menuButton.setAttribute('aria-expanded', !isOpen);
}

menuButton.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuButton.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// FORM VALIDATION & HANDLING
// ========================================

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form field validation
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';

    if (field.type === 'email') {
        if (!field.value.trim()) {
            errorMessage = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(field.value.trim())) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    } else if (field.type === 'text' && field.id === 'name') {
        if (!field.value.trim()) {
            errorMessage = 'Name is required';
            isValid = false;
        } else if (field.value.trim().length < 2) {
            errorMessage = 'Name must be at least 2 characters';
            isValid = false;
        }
    } else if (field.id === 'message') {
        if (!field.value.trim()) {
            errorMessage = 'Message is required';
            isValid = false;
        } else if (field.value.trim().length < 10) {
            errorMessage = 'Message must be at least 10 characters';
            isValid = false;
        }
    }

    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
            field.style.borderColor = '';
        } else {
            errorElement.classList.add('show');
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#d32f2f';
        }
    }

    return isValid;
}

// Real-time field validation
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

if (nameField) nameField.addEventListener('blur', () => validateField(nameField));
if (emailField) emailField.addEventListener('blur', () => validateField(emailField));
if (messageField) messageField.addEventListener('blur', () => validateField(messageField));

// Form submission handler
if (contactForm && messageDiv) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate all fields
        const isNameValid = validateField(nameField);
        const isEmailValid = validateField(emailField);
        const isMessageValid = validateField(messageField);

        if (isNameValid && isEmailValid && isMessageValid) {
            const nameInput = nameField.value.trim();
            const emailInput = emailField.value.trim();
            const messageInput = messageField.value.trim();

            // Simulate form submission (replace with actual API call)
            messageDiv.textContent = 'Sending your message...';
            messageDiv.className = 'form-message';
            messageDiv.style.display = 'block';

            // Simulate delay
            setTimeout(() => {
                messageDiv.textContent = `Thank you, ${nameInput}! I've received your message and will get back to you shortly.`;
                messageDiv.className = 'form-message success';
                contactForm.reset();
                
                // Clear error messages
                document.getElementById('name-error').classList.remove('show');
                document.getElementById('email-error').classList.remove('show');
                document.getElementById('message-error').classList.remove('show');
                
                // Reset field borders
                nameField.style.borderColor = '';
                emailField.style.borderColor = '';
                messageField.style.borderColor = '';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }, 1000);
        } else {
            messageDiv.textContent = 'Please fix the errors above and try again.';
            messageDiv.className = 'form-message error';
            messageDiv.style.display = 'block';
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and stat boxes
document.querySelectorAll('.project-card, .stat, .skill-category').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

// ========================================
// PERFORMANCE & UTILITY
// ========================================

// Debounce function for scroll events
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

// Log initialization
console.log('Portfolio website loaded successfully!');
