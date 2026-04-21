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
  });


    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    document.addEventListener('mousemove', (e) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        cursorDot.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
      }
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor && cursorDot) {
          cursor.style.transform = 'scale(1.5)';
          cursorDot.style.transform = 'scale(1.5)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursor && cursorDot) {
          cursor.style.transform = 'scale(1)';
          cursorDot.style.transform = 'scale(1)';
        }
      });
    });