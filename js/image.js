export function setupImageSupport(noteElement, note) {
    const imageBtn = noteElement.querySelector('.image-btn');
    if (!Array.isArray(note.images)) {
        note.images = [];
    }

    imageBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        fileInput.addEventListener('change', () => {
            const files = Array.from(fileInput.files);
            if (!files.length) return;

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
        fileInput.click();
    });
    renderImageGallery(noteElement, note);
}

export function renderImageGallery(noteElement, note) {
    let gallery = noteElement.querySelector('.note-image-gallery');
    if (gallery) gallery.remove();
    gallery = document.createElement('div');
    gallery.className = 'note-image-gallery';

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
        img.addEventListener('click', () => {
            const selected = imgWrapper.classList.toggle('selected');
            deleteBtn.style.display = selected ? 'block' : 'none';
        });
        deleteBtn.addEventListener('click', () => {
            note.images.splice(index, 1);
            renderImageGallery(noteElement, note);
        });
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(deleteBtn);
        gallery.appendChild(imgWrapper);
    });
    const content = noteElement.querySelector('.note-content');
    noteElement.insertBefore(gallery, content);
}
