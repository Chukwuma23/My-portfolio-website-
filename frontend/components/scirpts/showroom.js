 // typing text animation script
  /*var typed = new 
  Typed(document.querySelector(".typing"), {
       strings: ["<b>welcome to my ShowRoom.</b><br>Here you are going to<br> explore most of my projects<br> both old and new projects.<br>my projects here are to showcase,<br> and highlight projects i have been working on.<br> keep in mind that all projects here<br> are owned by me <br>and it was built from scratch.","I will be updating<br> them as i progress.", "keep exploring! ☺️","Click on the <b>images to view projects.👇🏽"],
      
    typeSpeed: 0,
    backSpeed: 0.5,
    loop: false, 
    onComplete: function(){
        document.querySelector('.todo ').style.display = 'block';
        document.querySelector('.blog ').style.display = 'block';
    }
  });*/
  
  
  
  
  
 /* const documentContainer = document.getElementById('image-container');
  const skipButton = document.getElementById('skip-btn');

var typed = new Typed(document.querySelector(".typing"), {
  strings: [
    `<b>Welcome to my ShowRoom.</b><br>Here you are going to<br> explore my projects<br> both old and new projects.
    <br>my purpose here is to showcase,<br> and highlight projects i have been working on.<br>
     keep in mind that all projects here<br> are owned by me <br>and it was built from scratch.",
    "I will be updating<br> them as i progress.`,
    "keep exploring! ☺️",
    "Click on the <b>images to view projects.👇🏽"
  ],
  typeSpeed: 10,
  backSpeed: 0.5,
  loop: false,
  onComplete: function() {
    documentContainer.style.display = 'flex'; // Show the image container
    skipButton.style.display = 'none';//remove skip btn
    // document.querySelectorAll('a')[0].style.display ='block';
  }
});

// Add event listener to skip button
document.querySelector('.skip-btn').addEventListener('click', function() {
  typed.stop(); // stop the animation
  typed.cursor.remove(); // remove cursor
  document.querySelector('.typing').textContent = typed.strings[typed.strings.length -5]; // show last string
  document.querySelector('.skip-btn ').style.display = 'none';//remove skip btn
  documentContainer.style.display = 'flex'; // Show the image container});
});
*/

 document.addEventListener('DOMContentLoaded', function() {
            // Project gallery data
            const projectGalleries = {
             'blog': {
    title: 'Blog Website Gallery',
    images: [
        {
            src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_25_43 PM.png',
            caption: 'Blog Post Page'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App - Personal - Microsoft​ Edge 10_23_2025 10_50_29 AM.png',
            caption: 'Single Post Page'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App - Personal - Microsoft​ Edge 10_23_2025 1_48_28 PM.png',
            caption: 'Postlist Page'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_42_07 PM.png',
            caption: 'Login Page'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App - Personal - Microsoft​ Edge 10_23_2025 1_57_24 PM.png',
            caption: 'Write a post page'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_41_25 PM.png',
            caption: 'AUTHENTICATION'
        },
        {
            src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_52_55 PM.png',
            caption: 'Comments Section'
        }
    ]
        },
                'Marinetime Union Website': {
                    title: 'Marinetime Union Website Gallery',
                    images: [
                        {
                            src: '/frontend/images/paymentImages/Untitled - Personal - Microsoft​ Edge 11_1_2025 8_33_17 PM.png',
                            caption: 'Homepage'
                        },
                        {
                            src: '/frontend/images/paymentImages/About.png',
                            caption: 'About Section'
                        },
                        {
                            src: '/frontend/images/paymentImages/membersdashboard.jpg',
                            caption: 'Members Dashboard'
                        },
                         {
                            src: '/frontend/images/paymentImages/loginpage.png',
                            caption: 'Members Dashboard'
                        }
                       
                    ]
                },
                'word-game': {
                    title: 'Word Game Gallery',
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1553484771-8e94869b4c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Game Start Screen'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Gameplay Interface'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Leaderboard'
                        }
                    ]
                },
                'ecommerce': {
                    title: 'E-commerce App Gallery',
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Product Listing'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Product Details'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                            caption: 'Shopping Cart'
                        }
                    ]
                }
            };

            // DOM elements
            const modal = document.getElementById('gallery-modal');
            const closeBtn = document.querySelector('.close-btn');
            const gallerySlides = document.querySelector('.gallery-slides');
            const indicators = document.querySelector('.indicators');
            const thumbnails = document.querySelector('.thumbnails');
            const prevBtn = document.querySelector('.btn-prev');
            const nextBtn = document.querySelector('.btn-next');
            const playPauseBtn = document.querySelector('.btn-play-pause');
            const galleryButtons = document.querySelectorAll('.gallery-btn[data-project]');

            // State variables
            let currentSlide = 0;
            let isPlaying = true;
            let slideInterval;
            let currentGallery = null;

            // Initialize event listeners
            function initEventListeners() {
                // Gallery buttons
                galleryButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const projectId = this.getAttribute('data-project');
                        openGallery(projectId);
                    });
                });

                // Close modal
                closeBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });

                // Gallery controls
                prevBtn.addEventListener('click', prevSlide);
                nextBtn.addEventListener('click', nextSlide);
                playPauseBtn.addEventListener('click', togglePlayPause);

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (modal.style.display === 'block') {
                        if (e.key === 'ArrowLeft') prevSlide();
                        if (e.key === 'ArrowRight') nextSlide();
                        if (e.key === 'Escape') closeModal();
                        if (e.key === ' ') {
                            e.preventDefault();
                            togglePlayPause();
                        }
                    }
                });
            }

            // Open gallery modal
            function openGallery(projectId) {
                if (projectGalleries[projectId]) {
                    currentGallery = projectGalleries[projectId];
                    currentSlide = 0;
                    initGallery();
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }

            // Close gallery modal
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                stopSlideShow();
            }

            // Initialize gallery
            function initGallery() {
                // Clear previous content
                gallerySlides.innerHTML = '';
                indicators.innerHTML = '';
                thumbnails.innerHTML = '';

                // Create slides
                currentGallery.images.forEach((item, index) => {
                    // Create slide
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    slide.innerHTML = `
                        <img src="${item.src}" alt="${item.caption}">
                        <div class="slide-caption">${item.caption}</div>
                    `;
                    gallerySlides.appendChild(slide);

                    // Create indicator
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => goToSlide(index));
                    indicators.appendChild(indicator);

                    // Create thumbnail
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'thumbnail';
                    if (index === 0) thumbnail.classList.add('active');
                    thumbnail.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
                    thumbnail.addEventListener('click', () => goToSlide(index));
                    thumbnails.appendChild(thumbnail);
                });

                // Start auto-play
                startSlideShow();
            }

            // Go to specific slide
            function goToSlide(index) {
                currentSlide = index;
                updateGallery();
            }

            // Next slide
            function nextSlide() {
                if (currentGallery) {
                    currentSlide = (currentSlide + 1) % currentGallery.images.length;
                    updateGallery();
                }
            }

            // Previous slide
            function prevSlide() {
                if (currentGallery) {
                    currentSlide = (currentSlide - 1 + currentGallery.images.length) % currentGallery.images.length;
                    updateGallery();
                }
            }

            // Update gallery display
            function updateGallery() {
                // Update slides position
                gallerySlides.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update indicators
                document.querySelectorAll('.indicator').forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
                
                // Update thumbnails
                document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
                    thumbnail.classList.toggle('active', index === currentSlide);
                });
            }

            // Start slideshow
            function startSlideShow() {
                if (currentGallery) {
                    slideInterval = setInterval(nextSlide, 4000);
                    isPlaying = true;
                    playPauseBtn.textContent = '❚❚';
                }
            }

            // Stop slideshow
            function stopSlideShow() {
                clearInterval(slideInterval);
                isPlaying = false;
                playPauseBtn.textContent = '▶';
            }

            // Toggle play/pause
            function togglePlayPause() {
                if (isPlaying) {
                    stopSlideShow();
                } else {
                    startSlideShow();
                }
            }

            // Initialize the application
            initEventListeners();
        });
  
