// Intro Slides
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const introSlides = document.querySelector('.intro-slides');
    let currentSlide = 0;

    // Show slides for 30 seconds
    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Initial slide
    showSlides();

    // Change slides every 5 seconds
    const slideInterval = setInterval(showSlides, 4500);

    // Hide intro slides after 30 seconds
    setTimeout(() => {
        clearInterval(slideInterval);
        introSlides.classList.add('hidden');
    }, 26500);
});

// Theme Switching
const themeSwitch = document.querySelector('.bulb');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    if (content) {
        content.classList.add('page-transition');
        setTimeout(() => {
            content.classList.add('active');
        }, 100);
    }
});

// Mobile Menu Toggle
const createMobileMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.main-content').prepend(menuButton);
    
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
};

// Create mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-btn');
        if (menuButton) {
            menuButton.remove();
        }
        document.querySelector('.sidebar').classList.remove('active');
    }
});

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switch');
    const bulb = document.querySelector('.bulb');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    // Theme switch click handler
    themeSwitch.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Security: Sanitize user input
    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }

    // Security: Add CSRF protection
    function getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    }

    // Security: Add XSS protection
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Security: Add rate limiting for theme switching
    let lastThemeSwitch = 0;
    const themeSwitchCooldown = 1000; // 1 second cooldown

    themeSwitch.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastThemeSwitch < themeSwitchCooldown) {
            e.preventDefault();
            return;
        }
        lastThemeSwitch = now;
    });

    // Security: Add input validation
    function validateInput(input, type) {
        const validators = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            username: /^[a-zA-Z0-9_]{3,20}$/
        };
        return validators[type]?.test(input) || false;
    }

    // Security: Add session timeout
    let sessionTimeout;
    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

    function resetSessionTimeout() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            // Handle session timeout
            localStorage.removeItem('theme');
            window.location.href = '/login.html';
        }, SESSION_DURATION);
    }

    // Reset timeout on user activity
    document.addEventListener('mousemove', resetSessionTimeout);
    document.addEventListener('keypress', resetSessionTimeout);
    resetSessionTimeout();
});

// Keylogger Demonstration
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startMonitoring');
    const stopButton = document.getElementById('stopMonitoring');
    const clearButton = document.getElementById('clearLog');
    const typingArea = document.getElementById('typingArea');
    const keystrokeLog = document.getElementById('keystrokeLog');
    
    let isMonitoring = false;
    let keystrokes = [];

    // Start monitoring
    startButton.addEventListener('click', function() {
        isMonitoring = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        typingArea.focus();
        keystrokeLog.innerHTML = '<p class="log-entry"><i class="fas fa-info-circle"></i> Monitoring started...</p>';
    });

    // Stop monitoring
    stopButton.addEventListener('click', function() {
        isMonitoring = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        keystrokeLog.innerHTML += '<p class="log-entry"><i class="fas fa-info-circle"></i> Monitoring stopped.</p>';
    });

    // Clear log
    clearButton.addEventListener('click', function() {
        keystrokeLog.innerHTML = '';
        keystrokes = [];
    });

    // Record keystrokes
    typingArea.addEventListener('keydown', function(e) {
        if (!isMonitoring) return;

        const key = e.key;
        const timestamp = new Date().toLocaleTimeString();
        
        // Special keys handling
        let displayKey = key;
        if (key === ' ') displayKey = '[Space]';
        if (key === 'Enter') displayKey = '[Enter]';
        if (key === 'Tab') displayKey = '[Tab]';
        if (key === 'Backspace') displayKey = '[Backspace]';
        if (key === 'Delete') displayKey = '[Delete]';
        if (key === 'Escape') displayKey = '[Escape]';
        if (key === 'Control') displayKey = '[Ctrl]';
        if (key === 'Shift') displayKey = '[Shift]';
        if (key === 'Alt') displayKey = '[Alt]';
        if (key === 'CapsLock') displayKey = '[CapsLock]';

        // Add to log
        const logEntry = document.createElement('p');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<i class="fas fa-key"></i> ${timestamp} - ${displayKey}`;
        keystrokeLog.appendChild(logEntry);
        
        // Scroll to bottom
        keystrokeLog.scrollTop = keystrokeLog.scrollHeight;
        
        // Store keystroke
        keystrokes.push({
            key: key,
            timestamp: timestamp
        });
    });

    // Prevent default behavior for special keys
    typingArea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    });
});

// Steganography Functionality
document.addEventListener('DOMContentLoaded', function() {
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const resultContainer = document.getElementById('resultContainer');
    const resultImage = document.getElementById('resultImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const decodeResult = document.getElementById('decodeResult');
    const decodedMessage = document.getElementById('decodedMessage');
    const secretMessage = document.getElementById('secretMessage');
    const changeImageBtn = document.getElementById('changeImage');

    let currentImage = null;

    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentImage = e.target.result;
                imagePreview.src = currentImage;
                uploadArea.style.display = 'none';
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }

    // Change image button
    changeImageBtn.addEventListener('click', () => {
        uploadArea.style.display = 'flex';
        previewContainer.style.display = 'none';
        currentImage = null;
        resultContainer.style.display = 'none';
        decodeResult.style.display = 'none';
    });

    // Encode message
    encodeBtn.addEventListener('click', () => {
        if (!currentImage) {
            alert('Please upload an image first.');
            return;
        }
        if (!secretMessage.value.trim()) {
            alert('Please enter a message to encode.');
            return;
        }

        // Simulate encoding process
        resultImage.src = currentImage;
        resultContainer.style.display = 'block';
        decodeResult.style.display = 'none';
        
        // Show success message
        alert('Message encoded successfully!');
    });

    // Decode message
    decodeBtn.addEventListener('click', () => {
        if (!currentImage) {
            alert('Please upload an image first.');
            return;
        }

        // Simulate decoding process
        decodedMessage.textContent = 'This is a simulated decoded message. In a real implementation, this would show the hidden message from the image.';
        decodeResult.style.display = 'block';
        resultContainer.style.display = 'none';
    });

    // Download result
    downloadBtn.addEventListener('click', () => {
        if (!resultImage.src) {
            alert('No image to download.');
            return;
        }

        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = 'encoded-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Clear everything
    clearBtn.addEventListener('click', () => {
        currentImage = null;
        secretMessage.value = '';
        uploadArea.style.display = 'flex';
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        decodeResult.style.display = 'none';
    });
}); 