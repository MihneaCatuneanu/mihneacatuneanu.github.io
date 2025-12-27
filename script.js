// ========== Typing Effect ==========
const typingTexts = [
    'Systems Programmer',
    'Mobile Developer',
    'Computer Science Student',
    'Problem Solver',
    'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before new text
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ========== Mobile Menu Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ========== Navbar Scroll Effect ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.dataset.progress;
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
            
            // Animate stats
            if (entry.target.classList.contains('stat-card')) {
                const numberElement = entry.target.querySelector('.stat-number');
                const target = parseInt(numberElement.dataset.target);
                animateNumber(numberElement, target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-item, .stat-card, .repo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== Number Animation ==========
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========== GitHub Repositories Fetch ==========
async function fetchGitHubRepos() {
    const username = 'mihneacatuneanu'; // Schimbă cu username-ul tău GitHub
    const reposContainer = document.getElementById('github-repos');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Nu s-au putut încărca repository-urile');
        }
        
        const repos = await response.json();
        
        reposContainer.innerHTML = repos.map(repo => `
            <div class="repo-card" onclick="window.open('${repo.html_url}', '_blank')">
                <div class="repo-header">
                    <i class="fas fa-folder repo-icon"></i>
                    <h3 class="repo-name">${repo.name}</h3>
                </div>
                <p class="repo-description">
                    ${repo.description || 'No description available'}
                </p>
                <div class="repo-stats">
                    <span class="repo-stat">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count}
                    </span>
                    <span class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count}
                    </span>
                    ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                </div>
            </div>
        `).join('');
        
        // Observe new repo cards
        document.querySelectorAll('.repo-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
    } catch (error) {
        reposContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-circle fa-2x"></i>
                <p>Nu s-au putut încărca repository-urile. Verifică username-ul GitHub în script.js</p>
            </div>
        `;
        console.error('Error fetching repos:', error);
    }
}

// ========== Contact Form Handling ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Aici poți adăuga logica pentru trimiterea formularului
    // De exemplu, folosind EmailJS sau un backend
    
    // Pentru demonstrație, arătăm doar un alert
    alert('Mulțumesc pentru mesaj! Voi răspunde în curând.');
    
    // Reset form
    contactForm.reset();
    
    // Exemplu cu EmailJS (necesită configurare):
    /*
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        alert('Mesaj trimis cu succes!');
        contactForm.reset();
    }).catch((error) => {
        alert('A apărut o eroare. Te rog încearcă din nou.');
        console.error(error);
    });
    */
});

// ========== Parallax Effect on Hero ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
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

// ========== Particle Background Effect (Optional) ==========
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
        }
        75% {
            transform: translateY(-30px) translateX(5px);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Fetch GitHub repos
    fetchGitHubRepos();
    
    // Create particles (optional - comment out if too distracting)
    // createParticles();
    
    // Add initial animations
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
});

// ========== Easter Egg: Konami Code ==========
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ========== Performance Optimization: Lazy Loading Images ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Console Easter Egg ==========
console.log('%c👋 Bună! ', 'font-size: 20px; font-weight: bold; color: #64ffda;');
console.log('%cDacă cauți să angajezi un developer, să colaborăm la un proiect sau doar vrei să discutăm despre tehnologie, contactează-mă! 🚀', 'font-size: 14px; color: #8892b0;');
console.log('%c📧 Email: your.email@example.com', 'font-size: 12px; color: #64ffda;');
console.log('%c💼 LinkedIn: linkedin.com/in/mihneacatuneanu', 'font-size: 12px; color: #64ffda;');
