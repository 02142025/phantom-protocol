/**
 * PHANTOM PROTOCOL - Complete Interactive JavaScript System
 * Educational Platform with Full Interactivity
 * Version 2.0
 */

// ============================================================================
// CORE PHANTOM PROTOCOL SYSTEM
// ============================================================================

class PhantomProtocol {
    constructor() {
        this.version = "2.0";
        this.currentPage = this.detectCurrentPage();
        this.userProgress = this.loadUserProgress();
        this.soundEnabled = true;
        this.animationsEnabled = true;
        
        console.log(`🔥 Phantom Protocol v${this.version} Initialized`);
        this.init();
    }
    
    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '') || 'index';
        return filename;
    }
    
    init() {
        this.setupGlobalEventListeners();
        this.initializePageSpecificFeatures();
        this.startBackgroundAnimations();
        this.setupNavigationEffects();
    }
    
    // Global Event Listeners
    setupGlobalEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.showQuickNavigation();
            }
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Global click tracking
        document.addEventListener('click', (e) => {
            this.trackInteraction(e.target);
        });
        
        // Prevent context menu on special elements
        document.querySelectorAll('.nav-link, .theme-button, .deploy-button').forEach(el => {
            el.addEventListener('contextmenu', e => e.preventDefault());
        });
    }
    
    // Page-specific initialization
    initializePageSpecificFeatures() {
        switch(this.currentPage) {
            case 'index':
                this.initHubPage();
                break;
            case 'incarceration-scroll':
                this.initIncarcerationPage();
                break;
            case 'all-themes':
                this.initAllThemesPage();
                break;
            case 'deployment-checklist':
                this.initDeploymentPage();
                break;
            case 'template-download':
                this.initDownloadPage();
                break;
            case 'protocol-guide':
                this.initProtocolGuidePage();
                break;
        }
    }
    
    // ========================================================================
    // HUB PAGE (index.html) FUNCTIONALITY
    // ========================================================================
    
    initHubPage() {
        console.log("🏠 Initializing Hub Page");
        
        this.setupDashboardCards();
        this.animateStatsCounters();
        this.setupHeroAnimations();
        this.initializeStatusTracking();
    }
    
    setupDashboardCards() {
        const cards = document.querySelectorAll('.dashboard-card');
        
        cards.forEach((card, index) => {
            // Add entrance animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.zIndex = '10';
                
                // Add glow effect
                card.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.4)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.zIndex = '1';
                card.style.boxShadow = 'none';
            });
            
            // Click navigation
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('card-button')) {
                    const button = card.querySelector('.card-button');
                    if (button) {
                        this.animateNavigation(button.href);
                    }
                }
            });
            
            // Add floating animation
            this.addFloatingAnimation(card, index);
        });
    }
    
    animateStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            if (finalValue !== '∞') {
                const numValue = parseInt(finalValue);
                stat.textContent = '0';
                
                setTimeout(() => {
                    this.countUpAnimation(stat, 0, numValue, 2000);
                }, 1000);
            } else {
                // Special animation for infinity
                this.animateInfinity(stat);
            }
        });
    }
    
    countUpAnimation(element, start, end, duration) {
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    animateInfinity(element) {
        const symbols = ['∞', '♦', '∞', '◊', '∞', '⬥'];
        let index = 0;
        
        setInterval(() => {
            element.textContent = symbols[index];
            index = (index + 1) % symbols.length;
        }, 800);
    }
    
    setupHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            // Add typing effect
            this.typeWriter(heroTitle, heroTitle.textContent, 100);
        }
    }
    
    // ========================================================================
    // INCARCERATION PAGE FUNCTIONALITY
    // ========================================================================
    
    initIncarcerationPage() {
        console.log("🔓 Initializing Incarceration Learning Module");
        
        this.setupProgressTracking();
        this.setupBlockCardInteractions();
        this.initializeLearningObjectives();
        this.setupTechnicalDemos();
    }
    
    setupProgressTracking() {
        const progressSteps = document.querySelectorAll('.progress-step');
        
        progressSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                this.completeProgressStep(step, index);
            });
            
            // Add entrance animation
            step.style.opacity = '0';
            step.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    completeProgressStep(step, index) {
        const stepNumber = step.querySelector('.step-number');
        const wasCompleted = stepNumber.classList.contains('completed');
        
        if (!wasCompleted) {
            // Mark as completed
            step.style.borderLeft = '4px solid #ffd700';
            step.style.background = 'rgba(255, 215, 0, 0.1)';
            stepNumber.style.background = '#ffd700';
            stepNumber.classList.add('completed');
            
            // Add checkmark
            stepNumber.innerHTML = '✓';
            
            // Play completion sound
            this.playSound('complete');
            
            // Show success message
            this.showToast(`Step ${index + 1} Completed! 🎉`, 'success');
            
            // Update progress
            this.updateUserProgress('incarceration', 'step_' + index, true);
            
            // Check if all steps completed
            this.checkAllStepsCompleted();
        }
    }
    
    setupBlockCardInteractions() {
        const blockCards = document.querySelectorAll('.block-card');
        
        blockCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.03)';
                card.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 107, 107, 0.2))';
                
                // Highlight corresponding step
                this.highlightRelatedStep(index);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.background = 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 215, 0, 0.1))';
                
                // Remove highlights
                this.removeAllHighlights();
            });
            
            // Add click to expand functionality
            card.addEventListener('click', () => {
                this.expandBlockCard(card, index);
            });
        });
    }
    
    expandBlockCard(card, index) {
        // Create modal with detailed information
        const modal = this.createModal(`Block ${index + 1} Details`, this.getBlockDetails(index));
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
    
    getBlockDetails(index) {
        const details = [
            {
                title: "Identity Foundation",
                content: `
                    <h3>🆔 Technical Implementation</h3>
                    <p>Learn how to create unique identifiers using:</p>
                    <ul>
                        <li>UUID generation algorithms</li>
                        <li>Timestamp encoding techniques</li>
                        <li>Type classification systems</li>
                    </ul>
                    <div class="code-example">
                        <code>
                        import uuid
                        import time
                        
                        def create_identity():
                            uid = str(uuid.uuid4())
                            timestamp = int(time.time())
                            return f"LEARN_{uid}_{timestamp}"
                        </code>
                    </div>
                `
            },
            // Add more block details...
        ];
        
        return details[index] ? details[index].content : "Details coming soon...";
    }
    
    // ========================================================================
    // ALL THEMES PAGE FUNCTIONALITY
    // ========================================================================
    
    initAllThemesPage() {
        console.log("🌟 Initializing All Themes Showcase");
        
        this.setupThemeFiltering();
        this.setupThemeAnimations();
        this.initializeThemeCards();
        this.setupThemeSearch();
    }
    
    setupThemeFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const themeCards = document.querySelectorAll('.theme-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                this.filterThemes(themeCards, filterValue);
                
                // Play filter sound
                this.playSound('filter');
            });
        });
    }
    
    filterThemes(cards, filterValue) {
        cards.forEach((card, index) => {
            const cardDifficulty = card.getAttribute('data-difficulty');
            const shouldShow = filterValue === 'all' || cardDifficulty === filterValue;
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update visible count
        this.updateVisibleThemeCount(filterValue);
    }
    
    updateVisibleThemeCount(filter) {
        const totalCards = document.querySelectorAll('.theme-card').length;
        const visibleCards = document.querySelectorAll('.theme-card[style*="display: block"], .theme-card:not([style*="display: none"])').length;
        
        // Update stats if they exist
        const statCard = document.querySelector('.stat-card .stat-number');
        if (statCard) {
            statCard.textContent = filter === 'all' ? totalCards : visibleCards;
        }
    }
    
    setupThemeAnimations() {
        const themeCards = document.querySelectorAll('.theme-card');
        
        themeCards.forEach((card, index) => {
            // Initial load animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.enhanceThemeCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetThemeCardHover(card);
            });
        });
    }
    
    enhanceThemeCardHover(card) {
        card.style.filter = 'brightness(1.2)';
        card.style.transform = 'translateY(-15px) scale(1.03)';
        
        // Add particle effect
        this.createParticleEffect(card);
    }
    
    resetThemeCardHover(card) {
        card.style.filter = 'brightness(1)';
        card.style.transform = 'translateY(0) scale(1)';
    }
    
    // ========================================================================
    // DEPLOYMENT PAGE FUNCTIONALITY
    // ========================================================================
    
    initDeploymentPage() {
        console.log("✅ Initializing Deployment Checklist");
        
        this.setupChecklistInteractions();
        this.initializeProgressTracking();
        this.setupPhaseAnimations();
        this.loadSavedProgress();
    }
    
    setupChecklistInteractions() {
        const checklistItems = document.querySelectorAll('.checklist-item');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        let completedItems = 0;
        const totalItems = checklistItems.length;
        
        checklistItems.forEach((item, index) => {
            const checkbox = item.querySelector('.checkbox');
            
            item.addEventListener('click', () => {
                this.toggleChecklistItem(checkbox, item, index);
                completedItems = this.updateProgress(progressFill, progressText, totalItems);
                this.saveProgress();
            });
            
            // Add entrance animation
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    toggleChecklistItem(checkbox, item, index) {
        const wasChecked = checkbox.classList.contains('checked');
        
        if (wasChecked) {
            // Uncheck
            checkbox.classList.remove('checked');
            item.classList.remove('completed');
            checkbox.innerHTML = '';
            this.playSound('uncheck');
        } else {
            // Check
            checkbox.classList.add('checked');
            item.classList.add('completed');
            checkbox.innerHTML = '✓';
            
            // Celebration animation
            this.celebrateCompletion(item);
            this.playSound('check');
            
            // Show completion message
            this.showToast(`Item ${index + 1} completed! 🎉`, 'success');
        }
    }
    
    updateProgress(progressFill, progressText, totalItems) {
        const completedItems = document.querySelectorAll('.checkbox.checked').length;
        const percentage = (completedItems / totalItems) * 100;
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${Math.round(percentage)}% Complete (${completedItems}/${totalItems})`;
        
        if (percentage === 100) {
            progressText.innerHTML = '🎉 DEPLOYMENT COMPLETE! 🎉';
            progressText.style.color = '#ffd700';
            this.celebrateFullCompletion();
        }
        
        return completedItems;
    }
    
    celebrateCompletion(item) {
        // Add celebration particles
        for (let i = 0; i < 5; i++) {
            this.createCelebrationParticle(item);
        }
        
        // Pulse animation
        item.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            item.style.animation = '';
        }, 600);
    }
    
    celebrateFullCompletion() {
        // Full screen celebration
        this.showToast('🎉 ALL TASKS COMPLETED! READY FOR DEPLOYMENT! 🎉', 'celebration', 5000);
        
        // Confetti effect
        this.createConfettiEffect();
        
        // Unlock next phase
        this.unlockNextPhase();
    }
    
    // ========================================================================
    // TEMPLATE DOWNLOAD PAGE FUNCTIONALITY
    // ========================================================================
    
    initDownloadPage() {
        console.log("📥 Initializing Download Portal");
        
        this.setupDownloadSimulation();
        this.setupDownloadTracking();
        this.initializeDownloadAnimations();
        this.setupBulkDownloads();
    }
    
    setupDownloadSimulation() {
        const downloadButtons = document.querySelectorAll('.download-button:not(.bulk-button)');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filename = this.getFilenameFromButton(button);
                const filesize = this.getFilesizeFromButton(button);
                this.simulateDownload(filename, filesize);
            });
        });
    }
    
    simulateDownload(filename, filesize) {
        // Show download toast
        const toast = this.createDownloadToast(filename, filesize);
        document.body.appendChild(toast);
        
        // Simulate download progress
        this.animateDownloadProgress(toast, filename, filesize);
        
        // Update download stats
        this.updateDownloadStats();
        
        // Play download sound
        this.playSound('download');
    }
    
    createDownloadToast(filename, filesize) {
        const toast = document.createElement('div');
        toast.className = 'download-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="download-icon">📥</div>
                <div class="download-info">
                    <div class="download-name">${filename}</div>
                    <div class="download-size">${filesize}</div>
                    <div class="download-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-text">0%</div>
                    </div>
                </div>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        return toast;
    }
    
    animateDownloadProgress(toast, filename, filesize) {
        const progressFill = toast.querySelector('.progress-fill');
        const progressText = toast.querySelector('.progress-text');
        const downloadIcon = toast.querySelector('.download-icon');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show completion
                downloadIcon.textContent = '✅';
                progressText.textContent = 'Complete!';
                
                setTimeout(() => {
                    toast.remove();
                }, 2000);
            }
            
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        }, 200);
    }
    
    // ========================================================================
    // PROTOCOL GUIDE PAGE FUNCTIONALITY
    // ========================================================================
    
    initProtocolGuidePage() {
        console.log("📋 Initializing Protocol Guide");
        
        this.setupBlockAnimations();
        this.setupTechSpecsInteractions();
        this.initializeProgressionSystem();
    }
    
    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for web audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different sounds for different actions
        const sounds = {
            'hover': { frequency: 800, duration: 100 },
            'click': { frequency: 1000, duration: 150 },
            'complete': { frequency: 1200, duration: 200 },
            'check': { frequency: 880, duration: 120 },
            'uncheck': { frequency: 440, duration: 80 },
            'filter': { frequency: 660, duration: 100 },
            'download': { frequency: 1100, duration: 300 }
        };
        
        const sound = sounds[type] || sounds.click;
        
        oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + sound.duration / 1000);
    }
    
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#00ff88' : type === 'celebration' ? '#ffd700' : '#da70d6',
            color: '#000',
            padding: '15px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            zIndex: '3000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
    
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'phantom-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Style the modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '5000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        return modal;
    }
    
    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    closeAllModals() {
        document.querySelectorAll('.phantom-modal').forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    createParticleEffect(element) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: '#ffd700',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '1000'
        });
        
        element.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.addEventListener('finish', () => {
            particle.remove();
        });
    }
    
    createConfettiEffect() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfettiPiece();
            }, i * 50);
        }
    }
    
    createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${['#ff0066', '#00ff88', '#ffd700', '#da70d6'][Math.floor(Math.random() * 4)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-in'
        });
        
        animation.addEventListener('finish', () => {
            confetti.remove();
        });
    }
    
    // Progress Management
    loadUserProgress() {
        const saved = localStorage.getItem('phantom-protocol-progress');
        return saved ? JSON.parse(saved) : {};
    }
    
    updateUserProgress(section, key, value) {
        if (!this.userProgress[section]) {
            this.userProgress[section] = {};
        }
        this.userProgress[section][key] = value;
        localStorage.setItem('phantom-protocol-progress', JSON.stringify(this.userProgress));
    }
    
    saveProgress() {
        localStorage.setItem('phantom-protocol-progress', JSON.stringify(this.userProgress));
    }
    
    // Animation utilities
    addFloatingAnimation(element, index) {
        element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    }
    
    typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Navigation helpers
    animateNavigation(href) {
        if (href) {
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        }
    }
    
    startBackgroundAnimations() {
        // Add subtle background animation
        document.body.style.animation = 'backgroundShift 15s ease infinite alternate';
    }
    
    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.1)';
                this.playSound('hover');
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
            });
        });
    }
    
    // Utility getters
    getFilenameFromButton(button) {
        const fileInfo = button.closest('.download-item').querySelector('.file-name');
        return fileInfo ? fileInfo.textContent : 'download.zip';
    }
    
    getFilesizeFromButton(button) {
        const sizeInfo = button.closest('.download-item').querySelector('.file-size');
        return sizeInfo ? sizeInfo.textContent : '1MB';
    }
    
    trackInteraction(element) {
        // Track user interactions for analytics
        console.log('Interaction:', element.className, element.tagName);
    }
}

// ============================================================================
// ADDITIONAL CSS ANIMATIONS (Injected via JavaScript)
// ============================================================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes backgroundShift {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .download-toast {
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(45deg, #da70d6, #ffd700);
            color: #000;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            z-index: 3000;
            min-width: 250px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .download-icon {
            font-size: 1.5em;
        }
        
        .download-info {
            flex: 1;
        }
        
        .download-name {
            font-weight: bold;
            margin-bottom: 2px;
        }
        
        .download-size {
            font-size: 0.8em;
            opacity: 0.8;
        }
        
        .download-progress {
            margin-top: 5px;
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(0,0,0,0.3);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: #00ff88;
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .progress-text {
            font-size: 0.7em;
            margin-top: 2px;
        }
        
        .toast-close {
            background: none;
            border: none;
            font-size: 1.2em;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
        }
        
        .phantom-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
        }
        
        .phantom-modal .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #0a0a0a, #2d1b69);
            border: 2px solid #00ff88;
            border-radius: 15px;
            padding: 0;
            max-width: 80%;
            max-height: 80%;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .phantom-modal .modal-header {
            background: rgba(0,255,136,0.1);
            padding: 20px;
            border-bottom: 1px solid #00ff88;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .phantom-modal .modal-header h2 {
            color: #ffd700;
            margin: 0;
        }
        
        .phantom-modal .modal-close {
            background: none;
            border: none;
            color: #ff0066;
            font-size: 2em;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
        }
        
        .phantom-modal .modal-body {
            padding: 20px;
            color: #00ff88;
            overflow-y: auto;
            max-height: 400px;
        }
        
        .code-example {
            background: #000;
            border: 1px solid #00ff88;
            border-radius: 5px;
            padding: 10px;
            margin: 10px 0;
            overflow-x: auto;
        }
        
        .code-example code {
            color: #00ff88;
            font-family: 'Courier New', monospace;
            white-space: pre;
        }
    `;
    
    document.head.appendChild(style);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    injectAnimationStyles();
    window.PhantomProtocol = new PhantomProtocol();
    
    console.log('🔥 Phantom Protocol Educational Platform Fully Loaded! 🔥');
});

// Expose global functions for HTML onclick handlers
window.simulateDownload = function(filename, filesize) {
    if (window.PhantomProtocol) {
        window.PhantomProtocol.simulateDownload(filename, filesize);
    }
};

// Additional utility exports
window.PhantomUtils = {
    showToast: (message, type, duration) => {
        if (window.PhantomProtocol) {
            window.PhantomProtocol.showToast(message, type, duration);
        }
    },
    
    playSound: (type) => {
        if (window.PhantomProtocol) {
            window.PhantomProtocol.playSound(type);
        }
    },
    
    createParticleEffect: (element) => {
        if (window.PhantomProtocol) {
            window.PhantomProtocol.createParticleEffect(element);
        }
    }
};
