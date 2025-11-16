// ==================== Navigation ==================== 
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle social icons on mobile
    const navSocial = document.querySelector('.nav-social');
    if (window.innerWidth <= 968) {
        navSocial.classList.toggle('mobile-show');
    }
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Hide social icons on mobile
        const navSocial = document.querySelector('.nav-social');
        navSocial.classList.remove('mobile-show');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Typing Animation ====================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Веб-разработчик',
    'Frontend Developer',
    'Digital-волонтер',
    'SEO-специалист',
    'Vibe-кодер'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
}

// Start typing animation
setTimeout(type, 1000);

// ==================== Compact Gallery Navigation ====================
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.compact-gallery-scroll');
    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');

    console.log('Gallery elements:', { galleryContainer, galleryPrevBtn, galleryNextBtn });

    if (galleryContainer && galleryPrevBtn && galleryNextBtn) {
        const scrollAmount = 170; // Width of one item plus gap (160px + 10px)
        
        galleryPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Previous button clicked');
            galleryContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        galleryNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked');
            galleryContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button states based on scroll position
        function updateNavButtons() {
            const { scrollLeft, scrollWidth, clientWidth } = galleryContainer;
            
            galleryPrevBtn.disabled = scrollLeft <= 0;
            galleryNextBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
        }
        
        galleryContainer.addEventListener('scroll', updateNavButtons);
        updateNavButtons(); // Initial state
        
        console.log('Gallery navigation initialized');
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - scroll right
                    galleryContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                } else {
                    // Swipe right - scroll left
                    galleryContainer.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }
    } else {
        console.error('Gallery navigation elements not found');
    }
});

// ==================== Lightbox Gallery ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxDescription = document.querySelector('.lightbox-description');
const lightboxGainedText = document.querySelector('.lightbox-gained-text');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.compact-gallery-item');

// Open lightbox when clicking on gallery item
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption');
        const description = item.getAttribute('data-description');
        const gained = item.getAttribute('data-gained');
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightboxDescription.textContent = description;
        lightboxGainedText.textContent = gained;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ==================== Project Modal (EVA) ====================
const projectModal = document.getElementById('eva-modal');
const modalClose = document.querySelector('.modal-close');
const modalTriggers = document.querySelectorAll('[data-modal="eva-modal"]');

// Open modal
function openProjectModal() {
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click listeners to all modal triggers
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal();
    });
});

// Close button
if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
}

// Close when clicking outside modal content
if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ==================== Stats Counter Animation ====================
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
    
    statsAnimated = true;
}

// ==================== Skills Progress Animation ====================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
    
    skillsAnimated = true;
}

// ==================== Scroll Animations (AOS) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Trigger stats animation
            if (entry.target.closest('.about-stats')) {
                animateStats();
            }
            
            // Trigger skills animation
            if (entry.target.closest('.skills-grid')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => observer.observe(el));

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Cursor Effect ====================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    const speed = 0.2;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .contact-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
    });
});

// ==================== Parallax Effect ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-card');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== 3D Tilt Effect for Cards ====================
const cards = document.querySelectorAll('.project-card, .contact-card, .stat-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== Particle Background ====================
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        this.ctx.fill();
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        
        this.draw();
    }
}

// Initialize particles - run immediately
function initParticles() {
    console.log('=== Starting particle initialization ===');
    
    const bgAnimation = document.querySelector('.bg-animation');
    if (!bgAnimation) {
        console.error('❌ bg-animation element not found!');
        return;
    }
    console.log('✅ bg-animation found:', bgAnimation);

    // Remove old canvas if exists
    const oldCanvas = bgAnimation.querySelector('.particle-canvas');
    if (oldCanvas) {
        oldCanvas.remove();
        console.log('🗑️ Removed old canvas');
    }

    // Create new particle canvas
    const particleCanvas = document.createElement('canvas');
    particleCanvas.classList.add('particle-canvas');
    particleCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    bgAnimation.appendChild(particleCanvas);
    console.log('✅ Canvas created and appended');

    const ctx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    console.log(`📐 Canvas size: ${particleCanvas.width}x${particleCanvas.height}`);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleCanvas));
    }
    console.log(`⭐ Created ${particles.length} particles`);

    let animationFrameId;
    function animateParticles() {
        if (!document.body.contains(particleCanvas)) {
            console.error('❌ Canvas no longer in DOM!');
            return;
        }
        
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(particle => particle.update());
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();
    console.log('🎬 Animation started');
    
    // Immediate style check
    setTimeout(() => {
        const canvasStyles = window.getComputedStyle(particleCanvas);
        const bgStyles = window.getComputedStyle(bgAnimation);
        console.log('🔍 Immediate style check (100ms after creation):', {
            canvas: {
                display: canvasStyles.display,
                visibility: canvasStyles.visibility,
                opacity: canvasStyles.opacity,
                position: canvasStyles.position,
                zIndex: canvasStyles.zIndex,
                width: canvasStyles.width,
                height: canvasStyles.height
            },
            bgAnimation: {
                display: bgStyles.display,
                visibility: bgStyles.visibility,
                opacity: bgStyles.opacity,
                zIndex: bgStyles.zIndex
            }
        });
        console.log('Canvas in DOM:', document.body.contains(particleCanvas));
        console.log('Canvas parent:', particleCanvas.parentElement);
    }, 100);

    // Monitor canvas for removal or style changes
    const canvasObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach((node) => {
                    if (node === particleCanvas || node.contains?.(particleCanvas)) {
                        console.error('🚨 CANVAS WAS REMOVED FROM DOM!', mutation);
                        console.log('Removed by:', mutation.target);
                        console.trace('Stack trace:');
                    }
                });
            }
            if (mutation.type === 'attributes' && mutation.target === particleCanvas) {
                console.warn('⚠️ Canvas attribute changed:', mutation.attributeName);
                const styles = window.getComputedStyle(particleCanvas);
                console.log('New computed styles:', {
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity
                });
            }
        });
    });

    // Observe both bg-animation and body for changes
    canvasObserver.observe(bgAnimation, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    canvasObserver.observe(document.body, {
        childList: true,
        subtree: false
    });
    
    console.log('👁️ Canvas monitoring active');

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
            console.log(`📐 Canvas resized: ${particleCanvas.width}x${particleCanvas.height}`);
            
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(particleCanvas));
            }
        }, 250);
    });
}

// Run immediately - script is at end of body
console.log('🚀 Document ready state:', document.readyState);
initParticles();

// Periodic visibility check using requestAnimationFrame (more reliable than setInterval)
let checkCount = 0;
let lastCheckTime = Date.now();
const startTime = Date.now();

console.log('🔄 Starting periodic visibility checks with RAF...');

function checkCanvasVisibility() {
    try {
        const now = Date.now();
        const elapsed = now - startTime;
        
        // Check every 200ms
        if (now - lastCheckTime >= 200) {
            checkCount++;
            lastCheckTime = now;
            
            console.log(`🔄 Running check #${checkCount} (${elapsed}ms elapsed)...`);
            
            const bgAnimation = document.querySelector('.bg-animation');
            const canvas = bgAnimation ? bgAnimation.querySelector('.particle-canvas') : null;
            
            console.log(`Check #${checkCount} - bgAnimation:`, !!bgAnimation, 'canvas:', !!canvas);
            
            if (!canvas) {
                console.error(`❌ Check #${checkCount}: Canvas NOT FOUND!`);
                console.log('bgAnimation exists:', !!bgAnimation);
                if (bgAnimation) {
                    console.log('bgAnimation children:', bgAnimation.children);
                    console.log('bgAnimation innerHTML:', bgAnimation.innerHTML.substring(0, 200));
                }
                console.log('🔄 Attempting to reinitialize...');
                setTimeout(() => initParticles(), 100);
                return; // Stop checking
            }
            
            if (!document.body.contains(canvas)) {
                console.error(`❌ Check #${checkCount}: Canvas NOT IN DOM!`);
                console.log('🔄 Attempting to reinitialize...');
                setTimeout(() => initParticles(), 100);
                return; // Stop checking
            }
            
            const styles = window.getComputedStyle(canvas);
            const bgStyles = window.getComputedStyle(bgAnimation);
            
            // Check if canvas is actually drawing
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const hasPixels = imageData.data.some(pixel => pixel > 0);
            
            console.log(`✅ Check #${checkCount}: Canvas OK`, {
                canvasDisplay: styles.display,
                canvasVisibility: styles.visibility,
                canvasOpacity: styles.opacity,
                canvasInDOM: document.body.contains(canvas),
                bgDisplay: bgStyles.display,
                bgVisibility: bgStyles.visibility,
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                isDrawing: hasPixels,
                zIndex: styles.zIndex
            });
        }
        
        // Continue checking for 5 seconds
        if (elapsed < 5000) {
            requestAnimationFrame(checkCanvasVisibility);
        } else {
            console.log('✋ Visibility checks complete (5 seconds elapsed)');
        }
    } catch (error) {
        console.error('❌ Error in visibility check:', error);
        console.trace();
    }
}

// Start checking
requestAnimationFrame(checkCanvasVisibility);
console.log('⏰ RAF visibility checker started');

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    console.log('🎉 WINDOW LOAD EVENT FIRED');
    document.body.classList.add('loaded');
    
    // Verify background is still visible after page load
    setTimeout(() => {
        console.log('⏰ Running verification check...');
        const bgAnimation = document.querySelector('.bg-animation');
        const canvas = bgAnimation ? bgAnimation.querySelector('.particle-canvas') : null;
        
        console.log('=== Post-load verification ===');
        console.log('bg-animation exists:', !!bgAnimation);
        console.log('canvas exists:', !!canvas);
        
        if (bgAnimation) {
            const bgStyles = window.getComputedStyle(bgAnimation);
            console.log('bg-animation display:', bgStyles.display);
            console.log('bg-animation visibility:', bgStyles.visibility);
            console.log('bg-animation opacity:', bgStyles.opacity);
        }
        
        if (canvas) {
            const canvasStyles = window.getComputedStyle(canvas);
            console.log('canvas display:', canvasStyles.display);
            console.log('canvas visibility:', canvasStyles.visibility);
            console.log('canvas opacity:', canvasStyles.opacity);
            console.log('canvas in DOM:', document.body.contains(canvas));
        } else {
            console.error('❌ Canvas not found after page load! Reinitializing...');
            initParticles();
        }
    }, 100);
});

// ==================== Console Easter Egg ====================
console.log(
    '%c👋 Привет, разработчик! ',
    'background: linear-gradient(135deg, #00ff88, #0066ff); color: #0a0a0f; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;'
);
console.log(
    '%cЕсли ты читаешь это, значит нам по пути! 🚀',
    'color: #00ff88; font-size: 14px; font-weight: bold;'
);
console.log(
    '%cСвяжись со мной: https://t.me/hard_skil',
    'color: #a0a0a0; font-size: 12px;'
);

// ==================== Performance Optimization ====================
// Debounce function
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

// Throttle function
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

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Scroll-based animations
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== Add Custom Styles for Cursor ====================
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s, border-color 0.2s;
        transform: translate(-50%, -50%);
    }
    
    .cursor-dot {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor.cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: var(--accent-color);
    }
    
    .cursor-dot.cursor-hover {
        transform: translate(-50%, -50%) scale(2);
        background: var(--accent-color);
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 968px) {
        .custom-cursor,
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ==================== Project Links Safety ====================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ==================== Image Lazy Loading ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Service Worker Registration ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

console.log('%c✨ Сайт готов к работе!', 'color: #00ff88; font-size: 16px; font-weight: bold;');
