// Toggle Icon Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // Active Navbar Links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            
            // Active Sections for Animation on Scroll
            sec.classList.add('show-animate');
        }
        else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove Toggle Icon and Navbar when Click Navbar Links (Scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Animation Footer on Scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Skills Section Dynamic Progress Bars
function createSkillBars() {
    const skillColumns = document.querySelectorAll('.skills-column');
    
    skillColumns.forEach(column => {
        const progressBars = column.querySelectorAll('.progress .bar span');
        
        progressBars.forEach(bar => {
            const percentage = bar.style.width;
            animateProgressBar(bar, percentage);
        });
    });
}

function animateProgressBar(bar, percentage) {
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.width = percentage;
    }, 500);
}

// Projects Section Filter
function setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projects = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });

            // Active Filter Button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Contact Form Validation
function setupContactForm() {
    const form = document.querySelector('.contact form');
    const nameInput = form.querySelector('input[placeholder="Full Name"]');
    const emailInput = form.querySelector('input[placeholder="Email Address"]');
    const messageInput = form.querySelector('textarea[placeholder="Your Message"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            sendEmail();
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Valid email is required');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        const formGroup = input.parentElement;
        formGroup.appendChild(errorElement);
        
        input.classList.add('error');
        
        setTimeout(() => {
            errorElement.remove();
            input.classList.remove('error');
        }, 3000);
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function sendEmail() {
        // Implement email sending logic or form submission
        alert('Form submitted successfully!');
        form.reset();
    }
}

// Scroll Reveal Animations
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Dark/Light Mode Toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Check Saved Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
}

// Initialize All Functions
function init() {
    createSkillBars();
    setupProjectFilter();
    setupContactForm();
    setupScrollReveal();
    setupThemeToggle();
}

// Run Initialization on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('loaded');
});
