// Search functionality for project gallery
document.addEventListener('DOMContentLoaded', function() {
    // Project data for search indexing
    const projectData = {
        'Blog Website': {
            id: 'blog',
            title: 'Blog Website',
            description: 'Full-featured blogging platform with authentication, comments, and content management',
            tags: ['Blog', 'Fullstack', 'Authentication', 'CMS', 'React', 'Node.js', 'MongoDB'],
            category: 'Web Application',
            status: 'Live',
            buttonId: 'blog-Website-btn'
        },
        'Marinetime Union Website': {
            id: 'maritime',
            title: 'Maritime Union Website',
            description: 'Membership management platform for maritime workers with news and resources',
            tags: ['Membership', 'Union', 'Dashboard', 'Management', 'Web App'],
            category: 'Web Application',
            status: 'Live',
            buttonId: 'Union-Website-btn'
        },
        'AI Chatbot': {
            id: 'chatbot',
            title: 'Mr Proper AI Chatbot',
            description: 'Intelligent chatbot with knowledgebase management and natural language processing',
            tags: ['AI', 'Chatbot', 'Machine Learning', 'NLP', 'Knowledgebase'],
            category: 'Artificial Intelligence',
            status: 'Live',
            buttonId: 'chatbot-btn'
        },
        'E-commerce App': {
            id: 'ecommerce',
            title: 'E-commerce App',
            description: 'Online shopping platform with product management and payment processing',
            tags: ['E-commerce', 'Shopping', 'Products', 'Cart', 'Payment'],
            category: 'Web Application',
            status: 'Coming Soon',
            buttonId: 'btn'
        },
        'Word Puzzle Game': {
            id: 'word-puzzle',
            title: 'Word Puzzle Game',
            description: 'Bilingual educational word game with English and Igbo language support',
            tags: ['Game', 'Education', 'Bilingual', 'JavaScript', 'HTML5', 'CSS3'],
            category: 'Game',
            status: 'Live',
            buttonId: 'word-puzzy-btn'
        }
    };

    // Get DOM elements
    const searchInput = document.querySelector('.search input');
    const searchIcon = document.querySelector('.search svg');
    const projectCards = document.querySelectorAll('.project-card');
    const imageContainer = document.getElementById('image-container');

    // Create search results counter
    const resultsCounter = document.createElement('div');
    resultsCounter.className = 'search-results text-center text-gray-600 text-sm mt-2 mb-4';
    resultsCounter.innerHTML = `Showing ${projectCards.length} projects`;
    imageContainer.parentNode.insertBefore(resultsCounter, imageContainer);

    // Create no results message
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results text-center py-12 hidden';
    noResultsMessage.innerHTML = `
        <div class="inline-block p-6 rounded-full bg-gray-100 mb-4">
            <i class="fas fa-search text-4xl text-gray-400"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
        <p class="text-gray-500 mb-4">Try different keywords like "blog", "game", or "chatbot"</p>
        <div class="search-tags flex justify-center gap-2 flex-wrap">
            <span class="search-tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition">Blog</span>
            <span class="search-tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition">Game</span>
            <span class="search-tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition">Web App</span>
            <span class="search-tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition">AI</span>
        </div>
    `;
    imageContainer.parentNode.insertBefore(noResultsMessage, imageContainer.nextSibling);

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            transition: all 0.3s ease;
        }
        
        .project-card.hidden {
            display: none;
        }
        
        .project-card.highlight {
            animation: highlightPulse 1.5s ease-in-out;
            border: 2px solid #f59e0b;
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
        
        @keyframes highlightPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            margin-top: 0.5rem;
            display: none;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .search-suggestion-item {
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            align-items: center;
        }
        
        .search-suggestion-item:last-child {
            border-bottom: none;
        }
        
        .search-suggestion-item:hover {
            background-color: #f8fafc;
        }
        
        .search-suggestion-item i {
            margin-right: 0.75rem;
            color: #f59e0b;
        }
    `;
    document.head.appendChild(style);

    // Create search suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    document.querySelector('.search').appendChild(suggestionsContainer);

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Show search suggestions
    function showSuggestions(query) {
        if (!query.trim()) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const queryLower = query.toLowerCase();
        suggestionsContainer.innerHTML = '';
        
        // Find matching projects
        const matchingProjects = Object.values(projectData).filter(project => 
            project.title.toLowerCase().includes(queryLower) ||
            project.description.toLowerCase().includes(queryLower) ||
            project.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
            project.category.toLowerCase().includes(queryLower)
        );
        
        // Find matching tags
        const allTags = [...new Set(Object.values(projectData).flatMap(p => p.tags))];
        const matchingTags = allTags.filter(tag => tag.toLowerCase().includes(queryLower));
        
        if (matchingProjects.length === 0 && matchingTags.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Add project suggestions
        matchingProjects.slice(0, 3).forEach(project => {
            const item = document.createElement('div');
            item.className = 'search-suggestion-item';
            item.innerHTML = `
                <i class="fas fa-project-diagram"></i>
                <div>
                    <strong class="text-gray-800">${project.title}</strong>
                    <div class="text-xs text-gray-500">${project.category} • ${project.status}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                searchInput.value = project.title;
                performSearch(project.title);
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(item);
        });
        
        // Add tag suggestions
        if (matchingProjects.length > 0 && matchingTags.length > 0) {
            const separator = document.createElement('div');
            separator.className = 'px-4 py-2 text-xs text-gray-500 border-t border-gray-100';
            separator.textContent = 'Popular Tags';
            suggestionsContainer.appendChild(separator);
        }
        
        matchingTags.slice(0, 3).forEach(tag => {
            const item = document.createElement('div');
            item.className = 'search-suggestion-item';
            item.innerHTML = `
                <i class="fas fa-tag"></i>
                <span class="text-gray-700">${tag}</span>
            `;
            item.addEventListener('click', () => {
                searchInput.value = tag;
                performSearch(tag);
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(item);
        });
        
        suggestionsContainer.style.display = 'block';
    }

    // Perform search
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        let visibleCount = 0;
        
        if (!searchTerm) {
            // Show all projects
            projectCards.forEach(card => {
                card.classList.remove('hidden');
                card.classList.remove('highlight');
            });
            noResultsMessage.classList.add('hidden');
            resultsCounter.innerHTML = `Showing ${projectCards.length} projects`;
            return;
        }
        
        projectCards.forEach(card => {
            const title = card.querySelector('h2')?.textContent || '';
            const cardTitle = title.toLowerCase();
            
            // Get project data for this card
            const project = projectData[title];
            
            let shouldShow = false;
            
            if (project) {
                // Check against project data
                shouldShow = 
                    project.title.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    project.category.toLowerCase().includes(searchTerm) ||
                    project.status.toLowerCase().includes(searchTerm);
            } else {
                // Fallback: just check title
                shouldShow = cardTitle.includes(searchTerm);
            }
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.classList.add('highlight');
                visibleCount++;
                
                // Remove highlight after animation
                setTimeout(() => {
                    card.classList.remove('highlight');
                }, 1500);
            } else {
                card.classList.add('hidden');
                card.classList.remove('highlight');
            }
        });
        
        // Update results counter
        resultsCounter.innerHTML = `Showing ${visibleCount} of ${projectCards.length} projects`;
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    }

    // Event listeners for search
    searchInput.addEventListener('input', debounce(function(e) {
        const query = e.target.value;
        showSuggestions(query);
        performSearch(query);
    }, 300));

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
            suggestionsContainer.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', function() {
        if (this.value) {
            showSuggestions(this.value);
        }
    });

    // Click search icon to focus input
    searchIcon.addEventListener('click', function() {
        searchInput.focus();
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search')) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Tag click events in no results message
    noResultsMessage.addEventListener('click', function(e) {
        if (e.target.classList.contains('search-tag')) {
            const tag = e.target.textContent;
            searchInput.value = tag;
            performSearch(tag);
        }
    });

    // Add data attributes to project cards for better search
    projectCards.forEach(card => {
        const title = card.querySelector('h2')?.textContent || '';
        const project = projectData[title];
        
        if (project) {
            card.setAttribute('data-project-id', project.id);
            card.setAttribute('data-category', project.category);
            card.setAttribute('data-tags', project.tags.join(','));
            card.setAttribute('data-status', project.status);
        }
    });

    // Add popular tags below search bar
    const popularTagsContainer = document.createElement('div');
    popularTagsContainer.className = 'popular-tags flex justify-center gap-2 mt-4 mb-6 flex-wrap';
    const popularTags = ['All', 'Blog', 'Game', 'Web App', 'AI', 'JavaScript', 'Live'];
    
    popularTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'popular-tag bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-yellow-200 transition';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => {
            if (tag === 'All') {
                searchInput.value = '';
                performSearch('');
            } else {
                searchInput.value = tag;
                performSearch(tag);
            }
            searchInput.focus();
        });
        popularTagsContainer.appendChild(tagElement);
    });

    // Insert popular tags after search
    document.querySelector('.search').parentNode.insertBefore(popularTagsContainer, document.querySelector('.search').nextSibling);

    console.log('Search functionality initialized');
});