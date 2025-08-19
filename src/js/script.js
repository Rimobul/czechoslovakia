// Main JavaScript functionality for the Czechoslovak Reunification Initiative website

class CzechoslovakWebsite {
    constructor() {
        this.currentLanguage = 'cs';
        this.currentTheme = 'light';
        
        this.init();
    }
    
    init() {
        this.initTheme();
        this.initLanguage();
        this.initNavigation();
        this.initEventListeners();
        this.initScrollEffects();
        this.updateContent();
    }
    
    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else if (systemPrefersDark) {
            this.currentTheme = 'dark';
        }
        
        this.applyTheme();
        this.updateThemeIcon();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.updateThemeIcon();
    }
    
    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
    
    // Language Management
    initLanguage() {
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language.slice(0, 2);
        
        if (savedLanguage && translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else if (translations[browserLanguage]) {
            this.currentLanguage = browserLanguage;
        }
        
        this.updateLanguageButtons();
    }
    
    setLanguage(language) {
        if (translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('language', language);
            this.updateContent();
            this.updateLanguageButtons();
            document.documentElement.lang = language;
        }
    }
    
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }
    
    updateContent() {
        const elements = document.querySelectorAll('[data-translate]');
        const currentTranslations = translations[this.currentLanguage];
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getNestedTranslation(currentTranslations, key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'email') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update page title
        document.title = currentTranslations.title;
        
        // Update newsletter input placeholder
        const newsletterInput = document.querySelector('.newsletter-input');
        if (newsletterInput) {
            const placeholders = {
                'cs': 'váš@email.cz',
                'sk': 'váš@email.sk',
                'en': 'your@email.com'
            };
            newsletterInput.placeholder = placeholders[this.currentLanguage];
        }
    }
    
    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }
    
    // Navigation Management
    initNavigation() {
        this.updateNavigationLinks();
    }
    
    updateNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Event Listeners
    initEventListeners() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Language selectors
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });
        
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-active');
                mobileMenuToggle.classList.toggle('active');
            });
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit();
            });
        }
        
        // Contact buttons
        const volunteerBtn = document.querySelector('.contact-card .btn-primary');
        const donateBtn = document.querySelector('.contact-card .btn-secondary');
        
        if (volunteerBtn) {
            volunteerBtn.addEventListener('click', () => this.handleVolunteerClick());
        }
        
        if (donateBtn) {
            donateBtn.addEventListener('click', () => this.handleDonateClick());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case 't':
                        e.preventDefault();
                        this.toggleTheme();
                        break;
                }
            }
        });
    }
    
    // Scroll Effects
    initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (navbar) {
                if (currentScrollY > 100) {
                    navbar.style.background = this.currentTheme === 'dark' 
                        ? 'rgba(15, 23, 42, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = this.currentTheme === 'dark'
                        ? 'rgba(15, 23, 42, 0.25)'
                        : 'rgba(255, 255, 255, 0.25)';
                }
                
                // Keep navbar always visible (sticky behavior)
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            
            // Animate cards on scroll
            this.animateOnScroll();
        });
    }
    
    animateOnScroll() {
        const cards = document.querySelectorAll('.feature-card, .event-card, .business-card, .news-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !card.classList.contains('animated')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.classList.add('animated');
                }, 100);
            }
        });
    }
    
    // Form Handlers
    handleNewsletterSubmit() {
        const input = document.querySelector('.newsletter-input');
        const button = document.querySelector('.newsletter-form .btn-primary');
        
        if (input && button) {
            const email = input.value.trim();
            
            if (this.validateEmail(email)) {
                button.textContent = this.currentLanguage === 'cs' ? 'Odesíláno...' :
                                   this.currentLanguage === 'sk' ? 'Odosielam...' : 'Sending...';
                button.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    button.textContent = this.currentLanguage === 'cs' ? 'Úspěch!' :
                                       this.currentLanguage === 'sk' ? 'Úspech!' : 'Success!';
                    input.value = '';
                    
                    setTimeout(() => {
                        button.textContent = translations[this.currentLanguage].contact.newsletter.button;
                        button.disabled = false;
                    }, 2000);
                }, 1500);
            } else {
                this.showNotification(
                    this.currentLanguage === 'cs' ? 'Zadejte platný email' :
                    this.currentLanguage === 'sk' ? 'Zadajte platný email' : 'Please enter a valid email',
                    'error'
                );
            }
        }
    }
    
    handleVolunteerClick() {
        this.showNotification(
            this.currentLanguage === 'cs' ? 'Brzy budeme mít formulář pro dobrovolníky!' :
            this.currentLanguage === 'sk' ? 'Čoskoro budeme mať formulár pre dobrovoľníkov!' :
            'Volunteer form coming soon!',
            'info'
        );
    }
    
    handleDonateClick() {
        this.showNotification(
            this.currentLanguage === 'cs' ? 'Brzy budeme mít možnost darování!' :
            this.currentLanguage === 'sk' ? 'Čoskoro budeme mať možnosť darovania!' :
            'Donation system coming soon!',
            'info'
        );
    }
    
    // Utility Functions
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? 'var(--accent-red)' : 'var(--accent-blue)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Performance optimization
    debounce(func, wait) {
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
}

// Initialize the website after includes are loaded so buttons exist
function bootSite() {
    if (window.website) return; // already booted
    window.website = new CzechoslovakWebsite();
    
    // Add some additional styling for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            padding: 1rem;
            gap: 0.5rem;
            box-shadow: 0 10px 25px var(--shadow-medium);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 1024px) {
            .nav-menu {
                display: none;
            }
            
            .nav-menu.mobile-active {
                display: flex;
            }
        }
        
        .notification {
            font-family: var(--font-body);
            font-weight: 500;
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            :root {
                --border-color: #000000;
                --shadow-light: rgba(0, 0, 0, 0.5);
                --shadow-medium: rgba(0, 0, 0, 0.7);
            }
        }
        
        /* Focus indicators */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible {
            outline: 2px solid var(--accent-blue);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🇨🇿🇸🇰 Československá iniciativa úspěšně načtena / Česko-slovenská iniciatíva úspešne načítaná / Czechoslovak initiative successfully loaded');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.includesLoaded) {
            bootSite();
        } else {
            document.addEventListener('includes:loaded', bootSite, { once: true });
        }
    });
} else {
    if (window.includesLoaded) bootSite();
    else document.addEventListener('includes:loaded', bootSite, { once: true });
}
