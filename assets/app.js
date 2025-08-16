// CTA Date-based switching
const PRE_ORDER_DATE = new Date('2025-08-29T18:00:00+01:00'); // Dublin time
const LAUNCH_DATE = new Date('2025-11-07T18:00:00+00:00'); // GMT

function updateCTAButtons() {
    const now = new Date();
    const mainCTA = document.getElementById('main-cta');
    const finalCTA = document.getElementById('final-cta');
    const isJapanese = window.location.pathname.includes('/ja/');
    
    let ctaText = '';
    let ctaLink = '';
    
    if (now < PRE_ORDER_DATE) {
        // Before pre-order
        if (isJapanese) {
            ctaText = 'ウェイトリストに参加';
        } else {
            ctaText = 'Join Waitlist';
        }
        ctaLink = './purchase.html';
    } else if (now >= PRE_ORDER_DATE && now < LAUNCH_DATE) {
        // During pre-order
        if (isJapanese) {
            ctaText = '今すぐ予約注文';
        } else {
            ctaText = 'Pre-order now';
        }
        ctaLink = './purchase.html';
    } else {
        // After launch
        if (isJapanese) {
            ctaText = '購入 / コンシェルジュ';
        } else {
            ctaText = 'Purchase / Concierge';
        }
        ctaLink = './purchase.html';
    }
    
    if (mainCTA) {
        mainCTA.textContent = ctaText;
        mainCTA.href = ctaLink;
    }
    
    if (finalCTA) {
        finalCTA.textContent = ctaText;
        finalCTA.href = ctaLink;
    }
}

// Form handling
const FORM_ENDPOINT = ''; // Set your endpoint here
let lastSubmitTime = 0;
const RATE_LIMIT = 60000; // 60 seconds

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Check honeypot
    if (formData.get('website')) {
        console.log('Bot detected');
        return false;
    }
    
    // Check rate limit
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT) {
        const remainingTime = Math.ceil((RATE_LIMIT - (now - lastSubmitTime)) / 1000);
        alert(`Please wait ${remainingTime} seconds before submitting again.`);
        return false;
    }
    
    // Prepare data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        address: formData.get('address'),
        finish: formData.get('finish'),
        notes: formData.get('notes'),
        agreeProduction: formData.get('agree-production') ? true : false,
        agreeCurrency: formData.get('agree-currency') ? true : false,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language
    };
    
    // If endpoint is not set, show success message and log
    if (!FORM_ENDPOINT) {
        console.log('Form submission (no endpoint configured):', data);
        showFormSuccess();
        lastSubmitTime = now;
        return false;
    }
    
    // Submit to endpoint
    fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess();
            lastSubmitTime = now;
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showFormError();
    });
    
    return false;
}

function showFormSuccess() {
    const form = document.getElementById('purchase-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (form) form.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showFormError() {
    const errorMessage = document.getElementById('form-error');
    if (errorMessage) {
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Update year in footer
function updateYear() {
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Scroll effects
function handleScroll() {
    const header = document.querySelector('header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect for hero
    const hero = document.querySelector('.hero img');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    // Fade in elements on scroll
    const elements = document.querySelectorAll('.card, .step, .gallery img');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !el.classList.contains('visible')) {
            el.classList.add('visible');
        }
    });
}

// Magnetic button effect
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Number animation
function animateNumbers() {
    const animateValue = (element, start, end, duration) => {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const match = text.match(/\$?([\d,]+)/);
                if (match) {
                    const num = parseInt(match[1].replace(/,/g, ''));
                    const prefix = text.includes('$') ? '$' : '';
                    entry.target.textContent = prefix + '0';
                    setTimeout(() => {
                        animateValue(entry.target, 0, num, 2000);
                    }, 200);
                }
            }
        });
    });
    
    document.querySelectorAll('.price, .chips span').forEach(el => {
        if (el.textContent.includes('3,000') || el.textContent.includes('6,000')) {
            observer.observe(el);
        }
    });
}

// Enhanced image loading with fade effect
function enhanceImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        // Handle image load success
        const handleLoad = () => {
            img.style.opacity = '1';
        };
        
        // Handle image load error
        const handleError = () => {
            console.warn('Failed to load image:', img.src);
            img.style.opacity = '1';
            // You could set a fallback image here if needed
        };
        
        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener('load', handleLoad);
            img.addEventListener('error', handleError);
        }
    });
}

// Add CSS animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .card, .step, .gallery img {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.visible, .step.visible, .gallery img.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .card:nth-child(1) { transition-delay: 0.1s; }
        .card:nth-child(2) { transition-delay: 0.2s; }
        .card:nth-child(3) { transition-delay: 0.3s; }
        
        .step:nth-child(1) { transition-delay: 0.1s; }
        .step:nth-child(2) { transition-delay: 0.2s; }
        .step:nth-child(3) { transition-delay: 0.3s; }
        
        .gallery img:nth-child(1) { transition-delay: 0.1s; }
        .gallery img:nth-child(2) { transition-delay: 0.2s; }
        .gallery img:nth-child(3) { transition-delay: 0.3s; }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Language dropdown functionality
function initLanguageDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    const btn = document.querySelector('.lang-dropdown-btn');
    const menu = document.querySelector('.lang-dropdown-menu');
    
    if (!dropdown || !btn || !menu) return;
    
    // Toggle dropdown
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });
    
    // Prevent menu clicks from closing dropdown immediately
    menu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Gallery Slideshow functionality
let currentSlideIndex = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    // Handle wrap around
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Add active class to new slide and indicator
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Set new slide index (convert from 1-based to 0-based)
    currentSlideIndex = slideIndex - 1;
    
    // Add active class to new slide and indicator
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Auto-advance slideshow
function initAutoSlideshow() {
    const slideshow = document.querySelector('.gallery-slideshow');
    if (!slideshow) return;
    
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Update CTAs based on date
    updateCTAButtons();
    
    // Update year
    updateYear();
    
    // Initialize language dropdown
    initLanguageDropdown();
    
    // Initialize slideshow auto-advance
    initAutoSlideshow();
    
    // Attach form handler
    const form = document.getElementById('purchase-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced interactions
    addAnimationStyles();
    addMagneticEffect();
    animateNumbers();
    enhanceImageLoading();
    
    // Scroll effects
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Update CTA every minute in case user keeps page open
setInterval(updateCTAButtons, 60000);