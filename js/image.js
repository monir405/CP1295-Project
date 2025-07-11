/**
 * Enables image uploading and rendering support on a note.
 * Allows users to select and attach one or more images to a specific note.
 * @param {HTMLElement} noteElement - The DOM element for the note
 * @param {Note} note - The note object that holds image data
 */
export function setupImageSupport(noteElement, note) {
    const imageBtn = noteElement.querySelector('.image-btn');
    // Ensure the note has an images array to store data URLs
    if (!Array.isArray(note.images)) {
        note.images = [];
    }
    // When image button is clicked, trigger file input to upload images
    imageBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        // Handle selected image files
        fileInput.addEventListener('change', () => {
            const files = Array.from(fileInput.files);
            if (!files.length) return;
            // Read each selected file as a data URL and store it
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataUrl = reader.result;
                    note.images.unshift(dataUrl); 
                    renderImageGallery(noteElement, note);
                };
                reader.readAsDataURL(file);
            });
        });
        // Programmatically open file picker
        fileInput.click();
    });
    // Initial rendering of gallery if images already exist
    renderImageGallery(noteElement, note);
}

/**
 * Renders a gallery of image thumbnails for a given note.
 * Allows selecting and deleting attached images.
 * @param {HTMLElement} noteElement - The DOM element of the note
 * @param {Note} note - The note object containing image data
 */
export function renderImageGallery(noteElement, note) {
    // Remove existing gallery to refresh layout
    let gallery = noteElement.querySelector('.note-image-gallery');
    if (gallery) gallery.remove();
    // Create new gallery container
    gallery = document.createElement('div');
    gallery.className = 'note-image-gallery';
    // Render each image with delete functionality
    note.images.forEach((dataUrl, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-wrapper';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.className = 'note-image';
        img.title = 'Click to select';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'delete-image-btn';
        deleteBtn.title = 'Delete image';
        deleteBtn.style.display = 'none';
        // Toggle selection UI on image click
        img.addEventListener('click', () => {
            const selected = imgWrapper.classList.toggle('selected');
            deleteBtn.style.display = selected ? 'block' : 'none';
        });
        // Delete image from note and re-render gallery
        deleteBtn.addEventListener('click', () => {
            note.images.splice(index, 1);
            renderImageGallery(noteElement, note);
        });
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(deleteBtn);
        gallery.appendChild(imgWrapper);
    });
    // Insert gallery above the note content
    const content = noteElement.querySelector('.note-content');
    noteElement.insertBefore(gallery, content);
}
