// ====== DOM Elements ======
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const workerSignupForm = document.getElementById('workerSignupForm');
const businessSignupForm = document.getElementById('businessSignupForm');
const billingToggle = document.getElementById('billingToggle');
const locationFilter = document.getElementById('location');
const categoryFilter = document.getElementById('category');
const jobCards = document.querySelectorAll('.job-card');

// ====== Mobile Menu Toggle ======
mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// ====== Form Validation ======
if (workerSignupForm) {
    workerSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        if (!fullName || !email || !phone) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showAlert('Please enter a valid SA phone number (e.g., 0712345678)', 'error');
            return;
        }
        
        // Form submission logic would go here
        showAlert('Registration successful! We\'ll contact you shortly.', 'success');
        workerSignupForm.reset();
    });
}

if (businessSignupForm) {
    businessSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const businessName = document.getElementById('businessName').value;
        const businessEmail = document.getElementById('businessEmail').value;
        
        if (!businessName || !businessEmail) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        if (!validateEmail(businessEmail)) {
            showAlert('Please enter a valid business email', 'error');
            return;
        }
        
        // Form submission logic would go here
        showAlert('Thank you for registering your business!', 'success');
        businessSignupForm.reset();
    });
}

// ====== Job Filtering ======
function filterJobs() {
    const locationValue = locationFilter.value;
    const categoryValue = categoryFilter.value;
    
    jobCards.forEach(card => {
        const cardLocation = card.dataset.location;
        const cardCategory = card.dataset.category;
        
        const locationMatch = locationValue === 'all' || cardLocation === locationValue;
        const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
        
        if (locationMatch && categoryMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if (locationFilter && categoryFilter) {
    locationFilter.addEventListener('change', filterJobs);
    categoryFilter.addEventListener('change', filterJobs);
}

// ====== Pricing Toggle ======
if (billingToggle) {
    billingToggle.addEventListener('change', function() {
        const prices = document.querySelectorAll('.price');
        const isAnnual = this.checked;
        
        prices.forEach(priceElement => {
            const monthlyPrice = priceElement.dataset.monthly;
            const annualPrice = priceElement.dataset.annual;
            
            if (isAnnual) {
                priceElement.innerHTML = `R${annualPrice}<span>/year</span>`;
            } else {
                priceElement.innerHTML = `R${monthlyPrice}<span>/month</span>`;
            }
        });
    });
}

// ====== Testimonial Slider ======
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

testimonialDots?.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ====== Smooth Scrolling ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ====== Helper Functions ======
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^0[0-9]{9}$/;
    return re.test(phone);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.appendChild(document.createTextNode(message));
    
    const container = document.querySelector('.container') || document.body;
    container.prepend(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// ====== Initialize ======
document.addEventListener('DOMContentLoaded', function() {
    // Show first testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // Set pricing data attributes
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const monthlyPrice = price.textContent.match(/\d+/)[0];
        const annualPrice = Math.floor(monthlyPrice * 12 * 0.8); // 20% discount
        price.dataset.monthly = monthlyPrice;
        price.dataset.annual = annualPrice;
    });
});s