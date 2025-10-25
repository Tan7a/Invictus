// Chat Application JavaScript
class ChatApp {
    constructor() {
        this.selectedText = '';
        this.contextMenu = document.getElementById('contextMenu');
        this.configPanel = document.getElementById('configPanel');
        this.messageInput = document.getElementById('messageInput');
        this.chatMessages = document.getElementById('chatMessages');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTextSelection();
        this.setupResponsiveBehavior();
        this.loadInitialMessages();
    }

    setupEventListeners() {
        // Send message functionality
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // New chat button
        document.getElementById('newChatBtn').addEventListener('click', () => {
            this.createNewChat();
        });

        // Context menu items
        this.setupContextMenuItems();

        // Configuration panel
        this.setupConfigPanel();

        // Context chips
        this.setupContextChips();

        // Model selector
        this.setupModelSelector();

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.context-menu') && !e.target.closest('.ai-message')) {
                this.hideContextMenu();
            }
            if (!e.target.closest('.config-panel') && !e.target.closest('.context-chip')) {
                this.hideConfigPanel();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideContextMenu();
                this.hideConfigPanel();
            }
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                this.showConfigPanel();
            }
        });
    }

    setupTextSelection() {
        // Handle text selection in AI messages
        this.chatMessages.addEventListener('mouseup', (e) => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText && e.target.closest('.ai-message')) {
                this.selectedText = selectedText;
                this.showContextMenu(e.pageX, e.pageY);
                
                // Highlight selected text
                this.highlightSelectedText(selectedText);
            }
        });

        // Hide context menu when selection is cleared
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (!selection.toString().trim()) {
                this.hideContextMenu();
                this.removeHighlights();
            }
        });
    }

    setupContextMenuItems() {
        const menuItems = this.contextMenu.querySelectorAll('.context-menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.textContent.toLowerCase();
                this.handleContextAction(action);
                this.hideContextMenu();
            });
        });
    }

    setupConfigPanel() {
        // Role selection
        const roleTags = document.querySelectorAll('.role-tag:not(.add-role)');
        roleTags.forEach(tag => {
            tag.addEventListener('click', () => {
                roleTags.forEach(t => t.classList.remove('selected'));
                tag.classList.add('selected');
            });
        });

        // Format selection
        const formatOptions = document.querySelectorAll('.format-option');
        formatOptions.forEach(option => {
            option.addEventListener('click', () => {
                formatOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Output length slider
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                console.log('Output length:', value);
            });
        }

        // Tone graph interaction
        const toneGraph = document.querySelector('.tone-graph');
        if (toneGraph) {
            toneGraph.addEventListener('click', (e) => {
                const rect = toneGraph.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const toneDot = document.querySelector('.tone-dot');
                if (toneDot) {
                    toneDot.style.left = `${x}px`;
                    toneDot.style.top = `${y}px`;
                    toneDot.style.right = 'auto';
                    toneDot.style.bottom = 'auto';
                }
            });
        }
    }

    setupContextChips() {
        const chips = document.querySelectorAll('.context-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip.textContent.includes('Research') || 
                    chip.textContent.includes('Title') || 
                    chip.textContent.includes('DNA')) {
                    this.showConfigPanel();
                }
            });
        });
    }

    setupModelSelector() {
        const modelSelects = document.querySelectorAll('#modelSelect, .config-panel select');
        modelSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                console.log('Selected model:', e.target.value);
            });
        });
    }

    setupResponsiveBehavior() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.adjustLayout();
        });

        // Initial layout adjustment
        this.adjustLayout();
    }

    adjustLayout() {
        const width = window.innerWidth;
        
        if (width <= 480) {
            // Mobile layout adjustments
            document.body.classList.add('mobile-layout');
        } else {
            document.body.classList.remove('mobile-layout');
        }
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';
        
        // Simulate AI response (in a real app, this would be an API call)
        setTimeout(() => {
            this.simulateAIResponse(message);
        }, 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message fade-in`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    simulateAIResponse(userMessage) {
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate realistic response time
        const responseTime = Math.random() * 2000 + 1000; // 1-3 seconds
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            // Enhanced response simulation based on keywords
            let response = this.generateContextualResponse(userMessage);
            this.addMessage(response, 'ai');
        }, responseTime);
    }

    generateContextualResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('financial') || message.includes('document') || message.includes('10-q') || message.includes('transcript')) {
            return "That's exactly where current architectures struggle. For processing financial documents like 10-Q filings and earnings transcripts, I'd recommend several approaches:\n\n" +
                   "1. **Hierarchical Processing**: Break documents into semantic chunks rather than arbitrary text splits. Extract key sections (executive summary, financial highlights, risk factors) first.\n\n" +
                   "2. **Retrieval-Augmented Generation**: Use vector embeddings to find relevant sections, then process only those chunks in detail.\n\n" +
                   "3. **Multi-pass Analysis**: First pass identifies document structure, second pass analyzes specific sections based on your query.\n\n" +
                   "The key is maintaining context across chunks while staying within token limits. Have you tried any of these approaches yet?";
        } else if (message.includes('transformer') || message.includes('ai') || message.includes('model')) {
            return "Great question about AI architectures! While transformers have been dominant since 2017, we're seeing their limitations become more apparent:\n\n" +
                   "**Current Challenges**:\n" +
                   "• Quadratic complexity of self-attention\n" +
                   "• Context window limitations\n" +
                   "• Computational requirements for long sequences\n\n" +
                   "**Emerging Alternatives**:\n" +
                   "• State space models (Mamba, S4)\n" +
                   "• Linear attention variants\n" +
                   "• Hybrid architectures combining different approaches\n\n" +
                   "The core insight of attention—learning which parts of input matter most—is valuable, but dot-product attention might just be one solution in a larger design space. What specific limitations are you encountering?";
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm here to help with your AI and technical questions. Whether you're working on document processing, exploring new architectures, or tackling any other challenges, feel free to ask. What would you like to discuss today?";
        } else {
            return "That's an interesting topic! I'd be happy to help you explore this further. Could you provide more details about your specific use case or what you're trying to achieve? The more context you give me, the better I can assist you.";
        }
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-content';
        contentDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    createNewChat() {
        // Clear current chat
        this.chatMessages.innerHTML = '';
        
        // Add welcome message
        this.addMessage("Hello! I'm here to help. What would you like to discuss today?", 'ai');
        
        console.log('New chat created');
    }

    showContextMenu(x, y) {
        this.contextMenu.style.left = x + 'px';
        this.contextMenu.style.top = y + 'px';
        this.contextMenu.classList.add('show');
    }

    hideContextMenu() {
        this.contextMenu.classList.remove('show');
    }

    showConfigPanel() {
        this.configPanel.classList.add('show');
    }

    hideConfigPanel() {
        this.configPanel.classList.remove('show');
    }

    highlightSelectedText(text) {
        // Remove existing highlights
        this.removeHighlights();
        
        // Find and highlight the selected text in AI messages
        const aiMessages = document.querySelectorAll('.ai-message .message-content');
        aiMessages.forEach(message => {
            const content = message.innerHTML;
            const highlightedContent = content.replace(
                new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                '<span class="highlighted-text">$1</span>'
            );
            if (highlightedContent !== content) {
                message.innerHTML = highlightedContent;
            }
        });
    }

    removeHighlights() {
        const highlights = document.querySelectorAll('.highlighted-text');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    handleContextAction(action) {
        switch (action) {
            case 'expand':
                this.expandSelectedText();
                break;
            case 'improve':
                this.improveSelectedText();
                break;
            case 'find source':
                this.findSourceForText();
                break;
            case 'ask invictus':
                this.askInvictus();
                break;
        }
    }

    expandSelectedText() {
        const expandedText = this.selectedText + " (This is an expanded version of the selected text. In a real application, this would generate more detailed information about the topic.)";
        this.addMessage(`Expand: ${expandedText}`, 'ai');
    }

    improveSelectedText() {
        const improvedText = "Here's an improved version: " + this.selectedText.replace(/is/g, 'represents').replace(/are/g, 'constitute');
        this.addMessage(`Improve: ${improvedText}`, 'ai');
    }

    findSourceForText() {
        this.addMessage(`Source for "${this.selectedText}": This information comes from recent research papers and industry publications. In a real application, this would provide specific citations and references.`, 'ai');
    }

    askInvictus() {
        const question = `Invictus, can you elaborate on: "${this.selectedText}"`;
        this.addMessage(question, 'user');
        setTimeout(() => {
            this.addMessage(`Regarding "${this.selectedText}", let me provide a more detailed analysis...`, 'ai');
        }, 1000);
    }

    loadInitialMessages() {
        // Messages are already in HTML, just ensure they're properly styled
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach((message, index) => {
            setTimeout(() => {
                message.classList.add('fade-in');
            }, index * 100);
        });
    }
}

// Utility functions
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatApp = new ChatApp();
    
    // Make it globally accessible for debugging
    window.chatApp = chatApp;
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            chatApp.hideContextMenu();
            chatApp.hideConfigPanel();
        }
    });
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', debounce(() => {
        setTimeout(() => {
            chatApp.adjustLayout();
        }, 100);
    }, 250));
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
