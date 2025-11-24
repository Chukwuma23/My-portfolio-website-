$('.navbar .menu li a').click(function() {
    // applying again smooth scroll on menu items click
    $('html').css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $('.menu-btn').click(function() {
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
  });
  
  


document.addEventListener('DOMContentLoaded', function() {
  // sticky navbar on scroll script
  window.addEventListener('scroll', function() {
    if (this.scrollY > 20) {
      document.querySelector('.navbar').classList.add("sticky");
    } else {
      document.querySelector('.navbar').classList.remove("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      document.querySelector('.scroll-up-btn').classList.add("show");
    } else {
      document.querySelector('.scroll-up-btn').classList.remove("show");
    }
  });

  // slide-up script
  document.querySelector('.scroll-up-btn').addEventListener('click', function() {
    document.documentElement.scrollTop = 0;
  });



  // typing text animation script
  var typed = new Typed(".typing", {
    strings: ["Fullstack Web Developer", "web designer", "Freelancer", 'UI/UX designer'],
    typeSpeed: 80,
    backSpeed: 20,
    loop: true
  });

  /*var typed = new Typed(".typing-2", {
    strings: ["fron-end Web Developer",  "Web designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });*/

  // owl carousel script (note: owl carousel requires jQuery, so you'll need to find a vanilla JS alternative)
});



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
                form.classList.add('loading');
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send message';
                form.classList.remove('loading');
            }
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            setLoading(true);

            try {
                const response = await fetch('http://localhost:5000/api/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showAlert(result.message, 'success');
                    form.reset();
                } else {
                    const errorMessage = result.errors ? result.errors.join(', ') : result.message;
                    showAlert(errorMessage, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('Network error. Please check your connection and try again.', 'error');
            } finally {
                setLoading(false);
            }
        });
  