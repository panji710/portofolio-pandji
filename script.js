/**
 * Portfolio Website - Muhammad Pandji
 * JavaScript for interactivity and animations
 */

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typingText');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const certificateModal = document.getElementById('certificateModal');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// ========================================
// Typing Effect
// ========================================
const roles = ['Cloud Engineer', 'Frontend Developer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ========================================
// Navbar Scroll Effect
// ========================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Active Navigation Link
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Smooth Scroll
// ========================================
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        closeMobileMenu();
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Skill Progress Animation
// ========================================
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

// ========================================
// Fade In Animation on Scroll
// ========================================
function fadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.about-card, .skill-category, .certificate-card, .project-card, .contact-card');
    
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ========================================
// Certificate Modal
// ========================================
function openModal(card) {
    const title = card.querySelector('.cert-info h3').textContent;
    const issuer = card.querySelector('.cert-info p').textContent;
    const date = card.querySelector('.cert-date').textContent;
    const imgSrc = card.getAttribute('data-img');
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalIssuer').textContent = issuer;
    document.getElementById('modalDate').textContent = date;
    
    // Update modal image
    const modalImage = document.getElementById('modalImage');
    if (imgSrc) {
        modalImage.innerHTML = `<img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">`;
    } else {
        modalImage.innerHTML = `
            <i class="fas fa-certificate"></i>
            <span id="modalCertName">${title}</span>
        `;
    }
    
    certificateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    certificateModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Contact Form
// ========================================
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show toast notification
    showToast();
    
    // Reset form
    contactForm.reset();
}

function showToast() {
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// Parallax Effect for Hero
// ========================================
function parallaxEffect() {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ========================================
// Profile Image Click Handler
// ========================================
function initProfileImageClick() {
    const profileImageWrapper = document.querySelector('.hero-image');
    
    if (profileImageWrapper) {
        profileImageWrapper.style.cursor = 'pointer';
        profileImageWrapper.addEventListener('click', (e) => {
            e.preventDefault();
            const profileImage = document.getElementById('profileImage');
            const imageSrc = profileImage.src;
            const title = 'Muhammad Pandji';
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalIssuer').textContent = 'Junior Cloud Engineer';
            document.getElementById('modalDate').textContent = new Date().getFullYear();
            
            const modalImage = document.getElementById('modalImage');
            modalImage.innerHTML = `<img src="${imageSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">`;
            
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

// ========================================
// Initialize
// ========================================
function init() {
    // Start typing effect
    typeEffect();
    
    // Initialize profile image click
    initProfileImageClick();
    
    // Set initial styles for fade elements
    const fadeElements = document.querySelectorAll('.about-card, .skill-category, .certificate-card, .project-card, .contact-card');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        animateSkillBars();
        fadeInOnScroll();
        parallaxEffect();
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal on outside click
    certificateModal.addEventListener('click', (e) => {
        if (e.target === certificateModal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Initial calls
    handleNavbarScroll();
    updateActiveNavLink();
    animateSkillBars();
    fadeInOnScroll();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS class for stagger animation
function addStaggerAnimation() {
    const grids = document.querySelectorAll('.certificates-grid, .projects-grid, .about-content');
    
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Initialize stagger animations
document.addEventListener('DOMContentLoaded', addStaggerAnimation);
