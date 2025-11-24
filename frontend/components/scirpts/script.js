$('.navbar .menu li a').click(function() {
    $('html').css("scrollBehavior", "smooth");
});

$('.menu-btn').click(function() {
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
});

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        if (this.scrollY > 20) {
            document.querySelector('.navbar').classList.add("sticky");
        } else {
            document.querySelector('.navbar').classList.remove("sticky");
        }

        if (this.scrollY > 500) {
            document.querySelector('.scroll-up-btn').classList.add("show");
        } else {
            document.querySelector('.scroll-up-btn').classList.remove("show");
        }
    });

    document.querySelector('.scroll-up-btn').addEventListener('click', function() {
        document.documentElement.scrollTop = 0;
    });

    var typed = new Typed(".typing", {
        strings: ["Fullstack Web Developer", "web designer", "Freelancer", 'UI/UX designer'],
        typeSpeed: 80,
        backSpeed: 20,
        loop: true
    });
});

// Contact form handling - IMPROVED VERSION
// Smart URL detection for development/production
function getBaseURL() {
    // If we're on localhost, use localhost backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    // Otherwise use the production backend
    return 'https://my-portfolio-message-api-naci.onrender.com';
}

const baseURL = getBaseURL();
console.log('Using backend URL:', baseURL); // Debug log

const form = document.getElementById('contactForm');
const alertDiv = document.getElementById('alert');
const submitBtn = document.getElementById('submitBtn');

function showAlert(message, type) {
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;
    alertDiv.style.display = 'block';
    
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        submitBtn.style.opacity = '1';
    }
}

// Frontend validation
function validateFormData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
        name: formData.get('name')?.trim() || '',
        email: formData.get('email')?.trim() || '',
        subject: formData.get('subject')?.trim() || '',
        message: formData.get('message')?.trim() || ''
    };

    console.log('Sending data to:', `${baseURL}/api/contact/submit`); // Debug log
    console.log('Form data:', data); // Debug log

    // Frontend validation
    const frontendErrors = validateFormData(data);
    if (frontendErrors.length > 0) {
        showAlert(frontendErrors.join(', '), 'error');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch(`${baseURL}/api/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status); // Debug log

        const result = await response.json();
        console.log('Server response:', result); // Debug log

        if (result.success) {
            showAlert(result.message, 'success');
            form.reset();
        } else {
            let errorMessage = result.message || 'Failed to send message';
            if (result.errors && Array.isArray(result.errors)) {
                errorMessage = result.errors.join(', ');
            }
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Network error:', error);
        showAlert('Network error. Please check your connection and try again.', 'error');
    } finally {
        setLoading(false);
    }
});