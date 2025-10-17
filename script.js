// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about, .music, .events, .contact');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Album play button functionality
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Simulate play functionality
        const albumCard = this.closest('.album-card');
        const albumTitle = albumCard.querySelector('h3').textContent;
        
        // Create a temporary notification
        showNotification(`"${albumTitle}" is now playing...`);
        
        // Add playing animation
        this.innerHTML = '⏸';
        this.style.animation = 'pulse 1.5s infinite';
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.innerHTML = '▶';
            this.style.animation = '';
        }, 3000);
    });
});

// Contact form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    
    if (name.trim() === '') {
        showNotification('Please enter your name.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification(`Thank you ${name}! Your message has been received.`, 'success');
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

// Add hover sound effect simulation
document.querySelectorAll('.btn, .nav-menu a, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        // Simulate hover sound effect with visual feedback
        this.style.transition = 'all 0.2s ease';
        if (this.classList.contains('btn')) {
            this.style.boxShadow = this.style.boxShadow.replace('rgba(231, 76, 60, 0.4)', 'rgba(231, 76, 60, 0.8)');
        }
    });
    
    element.addEventListener('mouseleave', function() {
        // Reset on mouse leave
        setTimeout(() => {
            this.style.transition = 'all 0.3s ease';
        }, 200);
    });
});

// Add typing effect to hero subtitle and tagline
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.querySelector('.hero-subtitle');
    const tagline = document.querySelector('.hero-tagline');
    
    if (subtitle && tagline) {
        const subtitleText = subtitle.textContent;
        const taglineText = tagline.textContent;
        
        subtitle.textContent = '';
        tagline.textContent = '';
        tagline.style.opacity = '0';
        
        let i = 0;
        const typeSubtitle = () => {
            if (i < subtitleText.length) {
                subtitle.textContent += subtitleText.charAt(i);
                i++;
                setTimeout(typeSubtitle, 80);
            } else {
                // Start tagline typing after subtitle is complete
                setTimeout(typeTagline, 500);
            }
        };
        
        let j = 0;
        const typeTagline = () => {
            tagline.style.opacity = '1';
            if (j < taglineText.length) {
                tagline.textContent += taglineText.charAt(j);
                j++;
                setTimeout(typeTagline, 120);
            } else {
                // Add glitch effect when tagline is complete
                setTimeout(() => {
                    tagline.style.animation = 'distortionPulse 3s ease-in-out infinite, glitchEffect 0.5s ease-in-out';
                }, 300);
            }
        };
        
        // Start typing effect after intro animation completes
        setTimeout(typeSubtitle, 4000);
    }
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎸 Metal Mode Activated! 🤘', 'success');
        
        // Add rainbow animation
        if (!document.querySelector('#easter-egg-styles')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-styles';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        konamiCode = [];
    }
});