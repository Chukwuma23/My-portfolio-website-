// Complete showroom.js with view and like tracking

// Function to get base URL
function getBaseURL() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  return 'https://my-portfolio-message-api-naci.onrender.com';
}

// Get visitor IP
async function getVisitorIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return null;
  }
}

// Track view
async function trackView(projectId, projectName) {
  try {
    const visitorIp = await getVisitorIP();
    const response = await fetch(`${getBaseURL()}/api/stats/track-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        projectId, 
        projectName, 
        visitorIp 
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('View tracked:', data);
    return data;
  } catch (error) {
    console.error('Error tracking view:', error);
    return null;
  }
}

// Track like
async function trackLike(projectId, element) {
  try {
    // Check if already liked
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '{}');
    if (likedProjects[projectId]) {
      showCustomAlertWithCallback('You already liked this project! ❤️', null, {
        title: 'Already Liked',
        buttonText: 'OK'
      });
      return;
    }

    console.log('Tracking like for project:', projectId);
    
    const response = await fetch(`${getBaseURL()}/api/stats/track-like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ projectId })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Like tracked:', data);
    
    if (data.success) {
      likedProjects[projectId] = true;
      localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
      
      // Animate like button
      if (element) {
        element.classList.add('heart-beat');
        setTimeout(() => element.classList.remove('heart-beat'), 300);
      }
      
      // Update UI
      updateLikeCount(projectId, data.likes);
      
      showCustomAlertWithCallback('❤️ Thank you for loving this project!', null, {
        title: 'Thanks!',
        buttonText: 'OK'
      });
    }
  } catch (error) {
    console.error('Error tracking like:', error);
    showCustomAlertWithCallback(`Failed to like: ${error.message}`, null, {
      title: 'Error',
      buttonText: 'OK'
    });
  }
}

// Update like count in UI
function updateLikeCount(projectId, likes) {
  const likeSpan = document.querySelector(`[data-project-id="${projectId}"] .like-count`);
  if (likeSpan) {
    likeSpan.textContent = likes;
  }
}

// Load all project stats
async function loadAllProjectStats() {
  try {
    const response = await fetch(`${getBaseURL()}/api/stats/all-stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.stats;
    }
    return [];
  } catch (error) {
    console.error('Error loading stats:', error);
    return [];
  }
}

// Load specific project stats
async function loadProjectStats(projectId) {
  try {
    const response = await fetch(`${getBaseURL()}/api/stats/stats/${encodeURIComponent(projectId)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading project stats:', error);
    return { views: 0, likes: 0 };
  }
}

// Add like button and stats to project cards
function addProjectStats() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const h2 = card.querySelector('h2');
    if (!h2) return;
    
    const projectName = h2.textContent;
    let projectId = '';
    
    // Map project names to IDs
    const projectIdMap = {
      'Blog Website': 'blog',
      'Marinetime Union Website': 'Marinetime Union Website',
      'AI Chatbot': 'chatbot',
      'E-commerce App': 'ecommerce',
      'Word Puzzle Game': 'Word puzzy',
      'chuks AI': 'chuks AI'
    };
    
    projectId = projectIdMap[projectName] || projectName.toLowerCase().replace(/\s+/g, '-');
    
    // Set data attribute on card
    card.setAttribute('data-project-id', projectId);
    card.setAttribute('data-project-name', projectName);
    
    // Find card footer
    const footer = card.querySelector('.card-footer');
    if (footer && !footer.querySelector('.project-stats')) {
      // Create stats container
      const statsHTML = `
        <div class="project-stats" style="display: flex; gap: 1rem; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.1);">
          <div class="stat" style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem;">
            <i class="fas fa-eye"></i>
            <span class="view-count">0</span>
            <span>views</span>
          </div>
          <div class="stat like-btn" data-like-project="${projectId}" style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; cursor: pointer;">
            <i class="fas fa-heart" style="color: #F39905;"></i>
            <span class="like-count">0</span>
            <span>likes</span>
          </div>
        </div>
      `;
      footer.insertAdjacentHTML('beforeend', statsHTML);
      
      // Load stats for this project
      loadProjectStats(projectId).then(stats => {
        const viewSpan = card.querySelector('.view-count');
        const likeSpan = card.querySelector('.like-count');
        if (viewSpan) viewSpan.textContent = stats.views || 0;
        if (likeSpan) likeSpan.textContent = stats.likes || 0;
      });
    }
  });
  
  // Add event listeners to like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-like-project');
      await trackLike(projectId, btn);
    });
  });
}

// Track views when project buttons are clicked
function setupViewTracking() {
  // Track views for view project buttons
  const viewButtons = [
    { id: 'blog-Website-btn', projectId: 'blog', projectName: 'Blog Website' },
    { id: 'Union-Website-btn', projectId: 'Marinetime Union Website', projectName: 'Marinetime Union Website' },
    { id: 'chatbot-btn', projectId: 'chatbot', projectName: 'AI Chatbot' },
    { id: 'btn', projectId: 'ecommerce', projectName: 'E-commerce App' },
    { id: 'word-puzzy-btn', projectId: 'Word puzzy', projectName: 'Word Puzzle Game' },
    { id: 'chuks-ai-btn', projectId: 'chuks AI', projectName: 'chuks AI' }
  ];
  
  viewButtons.forEach(button => {
    const element = document.getElementById(button.id);
    if (element) {
      element.addEventListener('click', async (e) => {
        // Don't track for e-commerce as it's not available
        if (button.projectId !== 'ecommerce') {
          await trackView(button.projectId, button.projectName);
        }
      });
    }
  });
  
  // Track views for gallery buttons
  const galleryBtns = document.querySelectorAll('.gallery-btn[data-project]');
  galleryBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const projectId = btn.getAttribute('data-project');
      const card = btn.closest('.project-card');
      const projectName = card?.querySelector('h2')?.textContent || projectId;
      await trackView(projectId, projectName);
    });
  });
}

// Document ready - Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Project gallery data
  const projectGalleries = {
    'blog': {
      title: 'Blog Website Gallery',
      images: [
        { src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_25_43 PM.png', caption: 'Blog Post Page' },
        { src: '/frontend/images/blogImages/blog pages.png', caption: 'Post Page' },
        { src: '/frontend/images/blogImages/Chuks Blog App - Personal - Microsoft​ Edge 10_23_2025 10_50_29 AM.png', caption: 'Single Post Page' },
        { src: '/frontend/images/blogImages/bloghomepage.png', caption: 'Postlist Page' },
        { src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_42_07 PM.png', caption: 'Login Page' },
        { src: '/frontend/images/blogImages/Chuks Blog App - Personal - Microsoft​ Edge 10_23_2025 1_57_24 PM.png', caption: 'Write a post page' },
        { src: '/frontend/images/blogImages/Chuks Blog App 10_23_2025 2_41_25 PM.png', caption: 'AUTHENTICATION' },
        { src: '/frontend/images/video-ai/blogImages/Chuks Blog App 10_23_2025 2_52_55 PM.png', caption: 'Comments Section' }
      ]
    },
    'Marinetime Union Website': {
      title: 'Marinetime Union Website Gallery',
      images: [
        { src: '/frontend/images/paymentImages/pagemainmenu.png', caption: 'Homepage' },
        { src: '/frontend/images/paymentImages/about page.png', caption: 'About Section' },
        { src: '/frontend/images/paymentImages/members poters.png', caption: 'Members Dashboard' },
        { src: '/frontend/images/paymentImages/news management porter.png', caption: 'News Dashboard' },
        { src: '/frontend/images/paymentImages/admin dashboard.png', caption: 'Admin Dashboard' },
        { src: '/frontend/images/paymentImages/news management.png', caption: 'news management Dashboard' }
      ]
    },
    'chatbot': {
      title: 'mr proper AI Chatbot Gallery',
      images: [
        { src: '/frontend/images/chatbot Image/Gemini_Generated_Image_9eu7ok9eu7ok9eu7.png', caption: 'chatbot mobile view' },
        { src: '/frontend/images/chatbot Image/knowlegebase management.png', caption: 'Knowledgebase Management' },
        { src: '/frontend/images/chatbot Image/Gemini_Generated_Image_y1nsn4y1nsn4y1ns.png', caption: 'adding new knowledge' },
        { src: '/frontend/images/chatbot Image/destop login.png', caption: 'Desktop Login Page' },
        { src: '/frontend/images/chatbot Image/Edit knowlegebase.png', caption: 'Edit Knowledgebase' },
        { src: '/frontend/images/chatbot Image/Gemini_Generated_Image_yuqzvyuqzvyuqzvy.png', caption: 'chatbot desktop view' },
        { src: '/frontend/images/chatbot Image/Gemini_Generated_Image_9eu7ok9eu7ok9eu7.png', caption: 'mobile login page and signup page' }
      ]
    },
    'ecommerce': {
      title: 'E-commerce App Gallery',
      images: [
        { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Product Listing' },
        { src: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Product Details' },
        { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Shopping Cart' }
      ]
    },
    'Word puzzy': {
      title: 'Word Puzzy Game Gallery',
      images: [
        { src: '/frontend/images/word puzzy/a developer portfoli.png', caption: 'Light and dark theme' },
        { src: '/frontend/images/word puzzy/Word Puzzle Game - Personal - Microsoft​ Edge 12_3_2025 4_00_13 PM.png', caption: 'Igbo Language Section' },
        { src: '/frontend/images/word puzzy/level selection.png', caption: 'Level Selection Page' },
        { src: '/frontend/images/word puzzy/Word Puzzle Game and 1 more page - Personal - Microsoft​ Edge 12_3_2025 3_40_16 PM.png', caption: 'Refill heart page' },
        { src: '/frontend/images/word puzzy/Word Puzzle Game - Personal - Microsoft​ Edge 12_3_2025 5_20_46 PM.png', caption: 'Game Play Page' }
      ]
    },
    'chuks AI': {
      title: 'chuks AI Gallery',
      images: [
        { src: '/frontend/images/video-ai/homepage.png', caption: 'Homepage' },
        { src: '/frontend/images/video-ai/frequently ask questions page.png', caption: 'Frequently ask questions page' },
        { src: '/frontend/images/video-ai/price page.png', caption: 'Price list Page' },
        { src: '/frontend/images/video-ai/review page.png', caption: 'Review page' },
        { src: '/frontend/images/video-ai/footer 1.png', caption: 'Navigation page' }
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

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval;
  let currentGallery = null;

  // Gallery functions
  function initEventListeners() {
    galleryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        openGallery(projectId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);

    document.addEventListener('keydown', (e) => {
      if (modal && modal.style.display === 'block') {
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

  function openGallery(projectId) {
    if (projectGalleries[projectId]) {
      currentGallery = projectGalleries[projectId];
      currentSlide = 0;
      initGallery();
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      stopSlideShow();
    }
  }

  function initGallery() {
    if (!gallerySlides || !indicators || !thumbnails) return;
    
    gallerySlides.innerHTML = '';
    indicators.innerHTML = '';
    thumbnails.innerHTML = '';

    currentGallery.images.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `<img src="${item.src}" alt="${item.caption}"><div class="slide-caption">${item.caption}</div>`;
      gallerySlides.appendChild(slide);

      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(indicator);

      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      if (index === 0) thumbnail.classList.add('active');
      thumbnail.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
      thumbnail.addEventListener('click', () => goToSlide(index));
      thumbnails.appendChild(thumbnail);
    });

    startSlideShow();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateGallery();
  }

  function nextSlide() {
    if (currentGallery) {
      currentSlide = (currentSlide + 1) % currentGallery.images.length;
      updateGallery();
    }
  }

  function prevSlide() {
    if (currentGallery) {
      currentSlide = (currentSlide - 1 + currentGallery.images.length) % currentGallery.images.length;
      updateGallery();
    }
  }

  function updateGallery() {
    if (gallerySlides) {
      gallerySlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
    
    document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
      thumbnail.classList.toggle('active', index === currentSlide);
    });
  }

  function startSlideShow() {
    if (currentGallery) {
      slideInterval = setInterval(nextSlide, 4000);
      isPlaying = true;
      if (playPauseBtn) playPauseBtn.textContent = '❚❚';
    }
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.textContent = '▶';
  }

  function togglePlayPause() {
    if (isPlaying) {
      stopSlideShow();
    } else {
      startSlideShow();
    }
  }

  // Initialize gallery
  initEventListeners();

  // Add stats and tracking
  setTimeout(() => {
    addProjectStats();
    setupViewTracking();
  }, 500);
});

// Button event listeners
document.addEventListener('DOMContentLoaded', function() {
  // E-commerce App button
  const ecommerceBtn = document.getElementById('btn');
  if (ecommerceBtn) {
    ecommerceBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback('This project is currently not available!', null, {
        title: 'Not Available',
        buttonText: 'OK'
      });
    });
  }

  // Word Puzzy Game button
  const wordPuzzyBtn = document.getElementById('word-puzzy-btn');
  if (wordPuzzyBtn) {
    wordPuzzyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback(
        `Word Puzzle Game - A bilingual educational game with Igbo and English languages. Complete with levels, scoring, and heart system to enhance learning experience.`,
        function(confirmed) {
          if (confirmed) {
            const gameUrl = this.getAttribute('data-href');
            window.open(gameUrl, '_blank');
          }
        }.bind(this),
        { title: 'Launch Game', buttonText: 'Play Now' }
      );
    });
  }

  // AI Chatbot button
  const chatbotBtn = document.getElementById('chatbot-btn');
  if (chatbotBtn) {
    chatbotBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback(
        `Mr Property Nigeria Limited AI Chatbot - An intelligent chatbot designed to assist users with inquiries, provide information, and enhance user experience through natural language processing.\n\nNote: This Project is still under development.`,
        function(confirmed) {
          if (confirmed) {
            const gameUrl = this.getAttribute('data-href');
            window.open(gameUrl, '_blank');
          }
        }.bind(this),
        { title: 'Mr Property AI Chatbot', buttonText: 'Visit Now' }
      );
    });
  }

  // Marinetime Union Website button
  const unionBtn = document.getElementById('Union-Website-btn');
  if (unionBtn) {
    unionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback(
        `Marinetime Union Website - A comprehensive platform for maritime workers to access resources, manage memberships, news, and stay connected within the maritime community.`,
        function(confirmed) {
          if (confirmed) {
            const gameUrl = this.getAttribute('data-href');
            window.open(gameUrl, '_blank');
          }
        }.bind(this),
        { title: 'Marinetime Union Website', buttonText: 'Visit Now' }
      );
    });
  }

  // Blog Website button
  const blogBtn = document.getElementById('blog-Website-btn');
  if (blogBtn) {
    blogBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback(
        `Blog Website - A dynamic blogging platform that allows users to create, share, and engage with content across various topics.\n\nFeatures include user authentication, post creation, commenting, and responsive design.`,
        function(confirmed) {
          if (confirmed) {
            const gameUrl = this.getAttribute('data-href');
            window.open(gameUrl, '_blank');
          }
        }.bind(this),
        { title: 'Blog Website', buttonText: 'Visit Now' }
      );
    });
  }

  // Chuks AI button
  const chuksAiBtn = document.getElementById('chuks-ai-btn');
  if (chuksAiBtn) {
    chuksAiBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showCustomAlertWithCallback(
        `Chuks AI - A platform for creating AI videos. Note: This Project is still under development.`,
        function(confirmed) {
          if (confirmed) {
            const gameUrl = this.getAttribute('data-href');
            window.open(gameUrl, '_blank');
          }
        }.bind(this),
        { title: 'Chuks AI', buttonText: 'Visit Now' }
      );
    });
  }
});

// Add CSS for heart beat animation
const style = document.createElement('style');
style.textContent = `
  .heart-beat {
    animation: heartBeat 0.3s ease;
  }
  
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .like-btn {
    transition: all 0.2s ease;
  }
  
  .like-btn:hover {
    transform: scale(1.05);
  }
  
  .project-stats {
    font-size: 0.85rem;
  }
  
  .stat i {
    margin-right: 3px;
  }
`;
document.head.appendChild(style);