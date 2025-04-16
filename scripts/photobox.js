
// Gallery configurations with folder paths
const galleries = [
    {
        id: '1',
        folder: 'cgh',
        images: ['cgh1.webp', 'cgh2.webp', 'cgh3.webp', 'cgh4.webp', 'cgh5.webp',
            'cgh6.webp']
    },
    {
        id: '2',
        folder: 'lh',
        images: ['lh1.webp', 'lh2.webp', 'lh3.webp', 'lh4.webp', 'lh5.webp',
            'lh6.webp', 'lh7.webp', 'lh8.webp', 'lh9.webp', 'lh10.webp',
            'lh11.webp', 'lh12.webp', 'lh13.webp', 'lh14.webp']
    },
    {
        id: '3',
        folder: 'yogashri',
        images: ['yg1.webp', 'yg2.webp', 'yg3.webp', 'yg4.webp', 'yg5.webp',
            'yg6.webp', 'yg7.webp', 'yg8.webp', 'yg9.webp', 'yg10.webp',
            'yg11.webp', 'yg12.webp', 'yg13.webp', 'yg14.webp', 'yg15.webp' ,
            'yg16.webp' , 'yg17.webp']
    }
];

// Initialize all galleries
document.addEventListener('DOMContentLoaded', () => {
    galleries.forEach(config => {
        initGallery(config);
    });
});

function initGallery(config) {
    const id = config.id;
    let currentIndex = 0;
    let isPlaying = true;
    let slideshowInterval;

    // Get DOM elements with ID suffix
    const mainImage = document.getElementById(`mainImage${id}`);
    const thumbnails = document.getElementById(`thumbnails${id}`);
    const playPause = document.getElementById(`playPause${id}`);
    const prevBtn = document.getElementById(`prev${id}`);
    const nextBtn = document.getElementById(`next${id}`);

    // Create thumbnails with folder path
    config.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = `../assets/images/projects/${config.folder}/${img}`;  // Updated path
        thumb.className = 'pb-thumb';
        thumb.dataset.index = index;
        thumb.addEventListener('click', () => showImage(index));
        thumbnails.appendChild(thumb);
    });

    // Start slideshow
    showImage(0);
    startSlideshow();

    // Event listeners
    playPause.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    function showImage(index) {
        currentIndex = index;
        mainImage.src = `../assets/images/projects/${config.folder}/${config.images[index]}`;  // Updated path
        updateThumbnails();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % config.images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + config.images.length) % config.images.length;
        showImage(currentIndex);
    }

    function startSlideshow() {
        slideshowInterval = setInterval(nextImage, 3000);
        isPlaying = true;
        playPause.textContent = '⏸';
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        isPlaying = false;
        playPause.textContent = '⏵';
    }

    function togglePlayPause() {
        if (isPlaying) stopSlideshow();
        else startSlideshow();
    }

    function updateThumbnails() {
        thumbnails.querySelectorAll('.pb-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }
}