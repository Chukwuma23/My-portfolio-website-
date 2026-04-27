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

// Optimized form submission with better performance
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    name: formData.get('name')?.trim() || '',
    email: formData.get('email')?.trim() || '',
    subject: formData.get('subject')?.trim() || '',
    message: formData.get('message')?.trim() || ''
  };

  // Quick validation
  if (data.name.length < 2) {
    showCustomAlertWithCallback('Name must be at least 2 characters long', null, { title: 'Error', buttonText: 'OK' });
    return;
  }
  if (!data.email.includes('@') || !data.email.includes('.')) {
    showCustomAlertWithCallback('Please enter a valid email address', null, { title: 'Error', buttonText: 'OK' });
    return;
  }
  if (data.subject.length < 5) {
    showCustomAlertWithCallback('Subject must be at least 5 characters long', null, { title: 'Error', buttonText: 'OK' });
    return;
  }
  if (data.message.length < 10) {
    showCustomAlertWithCallback('Message must be at least 10 characters long', null, { title: 'Error', buttonText: 'OK' });
    return;
  }

  setLoading(true);

  // Parallel execution for faster response
  try {
    // Run both email sending and database save in parallel
    const [notificationResult, dbResponse] = await Promise.allSettled([
      sendNotificationToMe(data),
      fetch(`${baseURL}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    ]);

    // Send auto-reply (don't wait for it)
    sendAutoReply(data.email, data.name, data.subject, data.message).catch(console.error);

    if (dbResponse.status === 'fulfilled' && dbResponse.value.ok) {
      showCustomAlertWithCallback('✅ Message sent successfully! I will get back to you soon.', null, {
        title: 'Success',
        buttonText: 'OK'
      });
      form.reset();
    } else {
      throw new Error('Database save failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showCustomAlertWithCallback('Failed to send message. Please try again or email me directly.', null, {
      title: 'Error',
      buttonText: 'OK'
    });
  } finally {
    setLoading(false);
  }
});

// Optimized notification sending
async function sendNotificationToMe(data) {
  try {
    await emailjs.send("service_hlpsyy3", "template_jhx7s7l", {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_email: "chukstechservice23@gmail.com",
      reply_to: data.email,
      date: new Date().toLocaleString()
    });
    return true;
  } catch (error) {
    console.error('Notification failed:', error);
    return false;
  }
}

// Optimized auto-reply
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
    return true;
  } catch (error) {
    console.error('Auto-reply failed:', error);
    return false;
  }
}








// Send visit notification via EmailJS
async function sendVisitNotification() {
  try {
    // Get visitor info (optional)
    const visitorInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || 'Direct visit',
      timestamp: new Date().toLocaleString(),
      page: window.location.href
    };
    
    await emailjs.send("service_hlpsyy3", "template_visit_notification", {
      to_email: "chukstechservice23@gmail.com",
      visitor_info: JSON.stringify(visitorInfo, null, 2),
      visit_date: visitorInfo.timestamp,
      page_visited: visitorInfo.page,
      device_type: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      browser: navigator.userAgent
    });
    
    console.log('✅ Visit notification sent');
  } catch (error) {
    console.error('❌ Failed to send visit notification:', error);
  }
}

// Track unique visits using localStorage
function hasVisitedBefore() {
  const visited = localStorage.getItem('website_visited');
  if (!visited) {
    localStorage.setItem('website_visited', 'true');
    localStorage.setItem('first_visit_date', new Date().toISOString());
    return false;
  }
  return true;
}

// Send notification only for first visit or once per session
if (!hasVisitedBefore()) {
  sendVisitNotification();
}

// Optional: Track page views
let pageViewCount = parseInt(localStorage.getItem('page_view_count') || '0');
pageViewCount++;
localStorage.setItem('page_view_count', pageViewCount);

// Send notification every 10th visit
if (pageViewCount % 10 === 0) {
  sendVisitNotification();
}