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
    strings: ["Frontend Web Developer", "Back-end web developer", "web designer", "Freelancer", 'UI/UX designer', "App development"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: ["fron-end Web Developer",  "Web designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  // owl carousel script (note: owl carousel requires jQuery, so you'll need to find a vanilla JS alternative)
});
