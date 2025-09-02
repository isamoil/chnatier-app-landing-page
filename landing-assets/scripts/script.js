

let currentLanguage = 'fr';

// Language switcher functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

function changeLanguage(lang, flag, code) {
    currentLanguage = lang;
    document.getElementById('current-flag').textContent = flag;
    document.getElementById('current-lang').textContent = code;

    // Update active state
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.attributes.getNamedItem('data-lang') === lang) {
            option.classList.add('active');
        }
    });

    // Close dropdown
    document.getElementById('language-dropdown').classList.remove('show');

    // Update all translated elements
    updateTranslations();
}

function updateTranslations() {
    const translations = window.translations;
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher.contains(event.target)) {
        document.getElementById('language-dropdown').classList.remove('show');
    }
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .fade-in-up').forEach(el => {
        observer.observe(el);
    });
});
