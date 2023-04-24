const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'some-key';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isReady = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements, to support DRY
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    photosArray.map((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const image = document.createElement('img');
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        image.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

// Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
        isReady = false;
        getPhotos();
    }
});

// Get photos from Unsplash API
async function getPhotos() {
    imagesLoaded = 0;
    try {
        const response = (await fetch(apiUrl));
        photosArray = await response.json();
        displayPhotos();
        totalImages = photosArray.length;
    } catch (error) {
        // Catch the error here
        console.log(error);
    }
}

// OnLoad
getPhotos();