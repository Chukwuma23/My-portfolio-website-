// ===================== CUSTOM ALERT MODAL =====================

// Create custom alert modal HTML
const customAlertHTML = `
<div id="custom-alert-overlay" class="custom-alert-overlay">
  <div class="custom-alert-modal">
    <div class="custom-alert-header">
      <i class="fas fa-exclamation-circle"></i>
      <span class="custom-alert-title">Alert</span>
    </div>
    <div class="custom-alert-body">
      <p class="custom-alert-message">Your message here</p>
    </div>
    <div class="custom-alert-footer">
      <button class="custom-alert-btn custom-alert-btn-primary">OK</button>
    </div>
  </div>
</div>
`;

// Add custom alert modal to DOM
document.body.insertAdjacentHTML('beforeend', customAlertHTML);


// Add this function alongside your existing showCustomConfirm function
function showCustomConfirmWithCallback(message, callback, options = {}) {
  const overlay = document.getElementById('custom-alert-overlay');
  const modal = overlay.querySelector('.custom-alert-modal');
  const messageElement = overlay.querySelector('.custom-alert-message');
  const titleElement = overlay.querySelector('.custom-alert-title');
  const footer = overlay.querySelector('.custom-alert-footer');
 
  // Set message content
  messageElement.textContent = message;
  
  // Set title if provided
  if (options.title) {
    titleElement.textContent = options.title;
  } else {
    titleElement.textContent = 'Confirm';
  }
  
  // Create confirm buttons
  footer.innerHTML = '';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'custom-alert-btn custom-alert-btn-secondary';
  cancelBtn.textContent = options.cancelText || ('Cancel');
  
  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'custom-alert-btn custom-alert-btn-primary';
  confirmBtn.textContent = options.confirmText || ('Confirm');
  
  footer.appendChild(cancelBtn);
  footer.appendChild(confirmBtn);
  
  // Apply theme styles
  applyAlertTheme();
  
  // Show the modal
  overlay.style.display = 'flex';
   pauseTimer() ;
  
  // Add animation
  modal.classList.remove('custom-alert-animate-out');
  modal.classList.add('custom-alert-animate-in');
  
  // Event handlers
  const handleClose = (result) => {
    modal.classList.remove('custom-alert-animate-in');
    modal.classList.add('custom-alert-animate-out');
    resumeTimer() ;
    setTimeout(() => {
      overlay.style.display = 'none';
      modal.classList.remove('custom-alert-animate-out');
      
      // Call the callback with the result
      if (typeof callback === 'function') {
        callback(result);
      }
    }, 300);
  };
  
  // Only confirm button resolves with true
  confirmBtn.onclick = () => handleClose(true);
  
  // Cancel button and all other close methods resolve with false
  cancelBtn.onclick = () => handleClose(false);
  
  // Close on overlay click - resolves with false (cancel action)
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      handleClose(false);
      resumeTimer() ;
    }
  };
  
  // Close on Escape key - resolves with false (cancel action)
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleEscape);
      handleClose(false);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
}

// Also update your showCustomAlert to have a callback version
function showCustomAlertWithCallback(message, callback, options = {}) {
  const overlay = document.getElementById('custom-alert-overlay');
  const modal = overlay.querySelector('.custom-alert-modal');
  const messageElement = overlay.querySelector('.custom-alert-message');
  const titleElement = overlay.querySelector('.custom-alert-title');
  const okBtn = overlay.querySelector('.custom-alert-btn-primary');
  
  // Set message content
  messageElement.textContent = message;
  
  // Set title if provided
  if (options.title) {
    titleElement.textContent = options.title;
  } else {
    titleElement.textContent = 'chuksTech  says';
  }
  
  // Set button text based on language
  if (options.buttonText) {
    okBtn.textContent = options.buttonText;
  } else {
    //okBtn.textContent = gameState.language === 'english' ? 'OK' : 'ỌDỊ MMA';
  }
  
  // Apply theme styles
  applyAlertTheme();
  
  // Show the modal
  overlay.style.display = 'flex';
  
  // Add animation
  modal.classList.remove('custom-alert-animate-out');
  modal.classList.add('custom-alert-animate-in');
  
  // Event handlers
  const handleClose = (result) => {
    modal.classList.remove('custom-alert-animate-in');
    modal.classList.add('custom-alert-animate-out');
    
    setTimeout(() => {
      overlay.style.display = 'none';
      modal.classList.remove('custom-alert-animate-out');
      
      // Call the callback with the result
      if (typeof callback === 'function') {
        callback(result);
      }
    }, 300);
  };
  
  // Only OK button resolves with true
  okBtn.onclick = () => handleClose(true);
  
  // Close on overlay click - resolves with false (cancel action)
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      handleClose(false);
    }
  };
  
  // Close on Escape key - resolves with false (cancel action)
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleEscape);
      handleClose(false);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
}



// Apply theme to custom alert
function applyAlertTheme() {
  const overlay = document.getElementById('custom-alert-overlay');
  const modal = overlay.querySelector('.custom-alert-modal');
  const isDarkMode = document.body.classList.contains('dark-theme');
  
  if (isDarkMode) {
    overlay.classList.add('dark-theme');
    modal.classList.add('dark-theme');
  } else {
    overlay.classList.remove('dark-theme');
    modal.classList.remove('dark-theme');
  }
}

// Replace all built-in alert calls
function replaceBuiltInAlerts() {
  // Override window.alert
  window.alert = async function(message) {
    await showCustomAlert(message);
  };
  
  // Override window.confirm
  window.confirm = async function(message) {
    return await showCustomConfirm(message);
  };
  
  // Also replace any direct confirm calls in your code
  // You'll need to update your existing code to use these async functions
}

// Initialize the custom alert system
function initCustomAlerts() {
  replaceBuiltInAlerts();
  
  // Listen for theme changes to update alert styling
  const observer = new MutationObserver(() => {
    applyAlertTheme();
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Add CSS for custom alerts
const customAlertCSS = `
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.custom-alert-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: scale(0.9);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.custom-alert-modal.dark-theme {
  background: #2d3748;
  color: #e2e8f0;
}

.custom-alert-overlay.dark-theme {
  background-color: rgba(0, 0, 0, 0.7);
}

.custom-alert-animate-in {
  transform: scale(1);
  opacity: 1;
}

.custom-alert-animate-out {
  transform: scale(0.9);
  opacity: 0;
}

.custom-alert-header {
  display: flex;
  align-items: center;
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e5e7eb;
}

.custom-alert-modal.dark-theme .custom-alert-header {
  border-bottom-color: #4a5568;
}

.custom-alert-header i {
  font-size: 24px;
  color: #F39905;
  margin-right: 10px;
}

.custom-alert-modal.dark-theme .custom-alert-header i {
  color: #F39905;
}

.custom-alert-title {
  font-size: 18px;
  font-weight: 600;
  flex-grow: 1;
  color: #111827;
}

.custom-alert-body {
  padding: 20px;
  font-size: 16px;
  line-height: 1.5;
}

.custom-alert-message {
  margin: 0;
  color: #374151;
}

.custom-alert-modal.dark-theme .custom-alert-message {
  color: #e2e8f0;
}

.custom-alert-footer {
  padding: 15px 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
}

.custom-alert-modal.dark-theme .custom-alert-footer {
  border-top-color: #4a5568;
}

.custom-alert-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}

.custom-alert-btn-primary {
  background-color: #F39905;
  color: white;
}

.custom-alert-btn-primary:hover {
  background-color: #F39905;
  transform: translateY(-1px);
}

.custom-alert-btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.custom-alert-btn-secondary:hover {
  background-color: #d1d5db;
  transform: translateY(-1px);
}

.custom-alert-modal.dark-theme .custom-alert-btn-secondary {
  background-color: #4a5568;
  color: #e2e8f0;
}

.custom-alert-modal.dark-theme .custom-alert-btn-secondary:hover {
  background-color: #5a6578;
}

@media (max-width: 480px) {
  .custom-alert-modal {
    width: 95%;
    margin: 10px;
  }
  
  .custom-alert-footer {
    flex-direction: column;
  }
  
  .custom-alert-btn {
    width: 100%;
  }
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = customAlertCSS;
document.head.appendChild(styleSheet);

// Add this to your setupEventListeners function
function setupEventListeners() {
  // Your existing event listeners...
  
  // Update the reset button listener to handle the cancel action
  const clearChatHistory = document.getElementById('clear-chat-history');
  if (clearChatHistory) {
    clearChatHistory.addEventListener('click', async () => {
      // Show confirmation dialog
      const shouldReset = await showCustomConfirm('english' 
          ? 'Are you sure you want to clear all chat history?' 
          : 'Ị ji n"aka na ịchọrọ ihichapụ akụkọ mkparịta ụka niile?'
      );
      
      // Only reset if user clicked "Confirm"
      if (shouldReset) {
        resetGame();
      }
      // If user clicked "Cancel" or closed the dialog, do nothing
    });
  }
}