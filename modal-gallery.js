/**
 * Modal Gallery JavaScript
 * Common functionality for image and video galleries across project pages
 * Supports multiple media items with navigation, keyboard controls, and smooth animations
 */

// Global variables for modal state
let currentImages = [];
let currentImageIndex = 0;
let currentDescriptions = [];
let currentTitles = [];

/**
 * Opens the modal with the specified media and descriptions
 * @param {string} imageSrc - Primary image/video source
 * @param {string} title - Modal title
 * @param {string} description - Primary description
 * @param {Array} additionalImages - Array of additional image/video sources
 * @param {Array} additionalDescriptions - Array of additional descriptions
 * @param {Array} additionalTitles - Array of additional titles for each item
 */
function openModal(imageSrc, title, description, additionalImages = [], additionalDescriptions = [], additionalTitles = []) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    
    // Set up images array
    currentImages = [imageSrc, ...additionalImages];
    currentImageIndex = 0;
    
    // Set up descriptions array
    currentDescriptions = [description, ...additionalDescriptions];
    
    // Set up titles array
    currentTitles = [title, ...additionalTitles];
    
    // Update modal content
    updateModalImage();
    updateModalDescription();
    updateModalTitle();
    
    // Update counter and dots
    updateImageCounter();
    updateDotsIndicator();
    
    // Show/hide navigation based on number of images
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const navBtns = document.querySelectorAll('.modal-nav-btn');
    
    if (currentImages.length > 1) {
        navBtns.forEach(btn => btn.style.display = 'block');
    } else {
        navBtns.forEach(btn => btn.style.display = 'none');
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 10);
}

/**
 * Updates the modal to show the current image or video
 */
function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const currentSrc = currentImages[currentImageIndex];
    
    // Check if the current item is a video
    const isVideo = currentSrc.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i);
    
    if (isVideo) {
        // Show video, hide image
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = currentSrc;
    } else {
        // Show image, hide video
        modalVideo.style.display = 'none';
        modalImage.style.display = 'block';
        modalImage.src = currentSrc;
    }
}

/**
 * Updates the modal title based on current image index
 */
function updateModalTitle() {
    const modalTitle = document.getElementById('modalTitle');
    
    // Update title based on current image
    if (currentTitles[currentImageIndex]) {
        modalTitle.textContent = currentTitles[currentImageIndex];
    }
}

/**
 * Updates the modal description based on current image index
 */
function updateModalDescription() {
    const modalText = document.getElementById('modalText');
    
    // Update description based on current image
    if (currentDescriptions[currentImageIndex]) {
        modalText.textContent = currentDescriptions[currentImageIndex];
    }
}

/**
 * Updates the image counter display
 */
function updateImageCounter() {
    document.getElementById('currentImageIndex').textContent = currentImageIndex + 1;
    document.getElementById('totalImages').textContent = currentImages.length;
}

/**
 * Updates the dots indicator for navigation
 */
function updateDotsIndicator() {
    const dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < currentImages.length; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === currentImageIndex ? 'active' : ''}`;
        dot.onclick = () => goToImage(i);
        dotsContainer.appendChild(dot);
    }
}

/**
 * Changes to the next or previous image
 * @param {number} direction - Direction to move (-1 for previous, 1 for next)
 */
function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
    updateModalImage();
    updateModalDescription();
    updateModalTitle();
    updateImageCounter();
    updateDotsIndicator();
}

/**
 * Goes directly to a specific image index
 * @param {number} index - Index of the image to show
 */
function goToImage(index) {
    currentImageIndex = index;
    updateModalImage();
    updateModalDescription();
    updateModalTitle();
    updateImageCounter();
    updateDotsIndicator();
}

/**
 * Closes the modal with smooth animation
 */
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('modal-active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentImages = [];
        currentImageIndex = 0;
        currentDescriptions = [];
        currentTitles = [];
    }, 300);
}

// Event listeners for keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // Arrow key navigation
    if (event.key === 'ArrowLeft') {
        if (currentImages.length > 1) changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        if (currentImages.length > 1) changeImage(1);
    }
});
