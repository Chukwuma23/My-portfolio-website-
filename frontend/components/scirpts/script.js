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

/*
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




*/


// Smart URL detection with encoding
function getBaseURL() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    return 'https://my-portfolio-message-api-naci.onrender.com';
}

const baseURL = getBaseURL();

// EmailJS Configuration - For BOTH notifications and auto-replies
emailjs.init("jxxiFr1P60U9SAZ2u"); // ← Your EmailJS public key

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
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Sending...' : 'Send message';
    submitBtn.style.opacity = isLoading ? '0.7' : '1';
}

// Function to send notification to YOU
async function sendNotificationToMe(data) {
    try {
        await emailjs.send("service_hlpsyy3", "template_jhx7s7l", {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: "chukstechservice23@gmail.com",
            reply_to: data.email,
            date: new Date().toLocaleString(),
            ip_address: "From Portfolio Website"
        });
        console.log('✅ Notification sent to you via EmailJS');
        return true;
    } catch (error) {
        console.error('❌ Notification failed:', error);
        return false;
    }
}

// Function to send auto-reply to VISITOR
async function sendAutoReply(userEmail, userName, userSubject, userMessage) {
    try {
        await emailjs.send("service_hlpsyy3", "template_409gm3g", {
            to_email: userEmail,
            to_name: userName,
            user_subject: userSubject,
            user_message: userMessage,
            reply_to: "chukstechservice23@gmail.com",
            date: new Date().toLocaleString()
        });
        console.log('✅ Auto-reply sent to:', userEmail);
        return true;
    } catch (error) {
        console.error('❌ Auto-reply failed:', error);
        return false;
    }
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

    // Validation
    if (data.name.length < 2) {
        showAlert('Name must be at least 2 characters long', 'error');
        return;
    }
    if (data.subject.length < 5) {
        showAlert('Subject must be at least 5 characters long', 'error');
        return;
    }
    if (data.message.length < 10) {
        showAlert('Message must be at least 10 characters long', 'error');
        return;
    }

    setLoading(true);

    try {
        // Send BOTH emails simultaneously using EmailJS
        const [notificationResult, autoReplyResult] = await Promise.allSettled([
            sendNotificationToMe(data),
            sendAutoReply(data.email, data.name, data.subject, data.message)
        ]);

        console.log('EmailJS results:', {
            notification: notificationResult.status === 'fulfilled' ? notificationResult.value : false,
            autoReply: autoReplyResult.status === 'fulfilled' ? autoReplyResult.value : false
        });

        // Save to database
        const dbResponse = await fetch(`${baseURL}/api/contact/submit`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (dbResponse.ok) {
            console.log('✅ Database save successful');
            
            // Show appropriate success message
            if (autoReplyResult.status === 'fulfilled' && autoReplyResult.value) {
                showAlert('Thank you for your message! A confirmation has been sent to your email.', 'success');
            } else {
                showAlert('Thank you for your message! I will get back to you soon.', 'success');
            }
            form.reset();
        } else {
            throw new Error('Database save failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        setLoading(false);
    }
});