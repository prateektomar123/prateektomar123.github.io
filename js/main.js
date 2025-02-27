// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initial visibility for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a nav link on mobile
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';

    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollTop > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Header shadow on scroll
    const header = document.querySelector('.header');
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const tooltip = button.nextElementSibling;
            tooltip.classList.add('show');

            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});

// Projects Carousel Navigation
const projectsCarousel = document.querySelector('.projects-carousel');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
const indicators = document.querySelector('.carousel-indicators');

// Create indicators
function createIndicators() {
    const cards = document.querySelectorAll('.project-card');
    indicators.innerHTML = '';

    cards.forEach((card, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => {
            scrollToCard(index);
        });

        indicators.appendChild(indicator);
    });
}

createIndicators();

// Scroll to specific card
function scrollToCard(index) {
    const cards = document.querySelectorAll('.project-card');
    if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
    projectsCarousel.scrollBy({ left: -450, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    projectsCarousel.scrollBy({ left: 450, behavior: 'smooth' });
});

// Update indicators on scroll
projectsCarousel.addEventListener('scroll', () => {
    const scrollPosition = projectsCarousel.scrollLeft;
    const cardWidth = document.querySelector('.project-card').offsetWidth + 32; // 32 for gap
    const activeIndex = Math.round(scrollPosition / cardWidth);

    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
});

// Touch and drag functionality
let isDown = false;
let startX;
let scrollLeft;

projectsCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    projectsCarousel.style.cursor = 'grabbing';
    startX = e.pageX - projectsCarousel.offsetLeft;
    scrollLeft = projectsCarousel.scrollLeft;
});

projectsCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    projectsCarousel.style.cursor = 'grab';
});

projectsCarousel.addEventListener('mouseup', () => {
    isDown = false;
    projectsCarousel.style.cursor = 'grab';
});

projectsCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectsCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    projectsCarousel.scrollLeft = scrollLeft - walk;
});

// Projects filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Re-create indicators for visible cards
        createIndicators();

        // Scroll to first visible card
        const firstVisibleCard = document.querySelector('.project-card[style="display: block"]');
        if (firstVisibleCard) {
            firstVisibleCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    });
});

// 3D hover effect for hero image
const heroImg = document.querySelector('.hero-img-container');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;

        heroImg.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// Reset transform when mouse leaves
document.addEventListener('mouseleave', () => {
    heroImg.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// Initialize carousel on load
window.addEventListener('load', () => {
    // Set initial cursor style
    projectsCarousel.style.cursor = 'grab';

    // Scroll to first card
    if (document.querySelector('.project-card')) {
        document.querySelector('.project-card').scrollIntoView({ inline: 'center' });
    }

    // Show carousel arrows on desktop only
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.carousel-nav').forEach(nav => {
            nav.style.display = 'none';
        });
    }
});

// Project Modal
const modal = document.querySelector('.modal-overlay');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-image');
const modalDescription = document.querySelector('.modal-description');
const modalTags = document.querySelector('.modal-tags');
const modalStats = document.querySelector('.modal-stats');
const modalActions = document.querySelector('.modal-actions');

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const projectCard = button.closest('.project-card');

        // Get project details
        const title = projectCard.querySelector('.project-title').textContent;
        const image = projectCard.querySelector('.project-image').src;
        const description = projectCard.querySelector('.project-description').textContent;
        const tags = projectCard.querySelector('.project-tags').innerHTML;
        const stats = projectCard.querySelector('.project-stats').innerHTML;
        const actions = projectCard.querySelector('.project-actions').innerHTML;

        // Populate modal
        modalTitle.textContent = title;
        modalImage.src = image;
        modalImage.alt = title;
        modalDescription.textContent = description;
        modalTags.innerHTML = tags;
        modalStats.innerHTML = stats;
        modalActions.innerHTML = actions;

        // Open modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
});