// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateTo(targetSection);
        });
    });

    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'intro';
        navigateTo(hash, false);
    });

    // Check initial hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        navigateTo(initialHash, false);
    }

    // Add scroll animations
    addScrollAnimations();
});

// Navigate to a specific section
function navigateTo(sectionId, updateHash = true) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Update active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });

    // Update URL hash
    if (updateHash) {
        history.pushState(null, null, `#${sectionId}`);
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add intersection observer for scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe cards
    document.querySelectorAll('.intro-card, .security-card, .practice-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .timeline-item,
    .intro-card,
    .security-card,
    .practice-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .timeline-item.animate-in,
    .intro-card.animate-in,
    .security-card.animate-in,
    .practice-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hover effects for interactive elements */
    .timeline-item:hover .timeline-marker {
        transform: scale(1.1);
        background-color: var(--accent-blue);
        color: white;
    }

    .timeline-marker {
        transition: all 0.3s ease;
    }

    .tdd-step:hover {
        transform: translateY(-4px);
        transition: transform 0.3s ease;
    }

    .tip-item:hover {
        transform: translateX(8px);
        transition: transform 0.3s ease;
    }

    .tip-item:hover .tip-number {
        opacity: 1;
    }

    /* Code snippet hover effect */
    .code-snippet:hover {
        background-color: var(--bg-primary);
    }

    /* Review actions hover */
    .review-actions span:hover {
        transform: scale(1.1);
    }

    /* Permission item hover */
    .permission-item:hover {
        transform: translateX(4px);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(animationStyles);

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button if needed
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.onclick = toggleMobileMenu;
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 200;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 0.5rem 0.75rem;
                border-radius: 8px;
                font-size: 1.25rem;
                cursor: pointer;
            `;
            document.body.appendChild(menuBtn);
        }
    }
}

// Check on load and resize
window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = ['intro', 'pasos', 'seguridad', 'practicas'];
    const currentSection = document.querySelector('.section.active').id;
    const currentIndex = sections.indexOf(currentSection);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex < sections.length - 1) {
            navigateTo(sections[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
            navigateTo(sections[currentIndex - 1]);
        }
    }
});

console.log('🚀 Guía de Vibe Coding cargada correctamente');
