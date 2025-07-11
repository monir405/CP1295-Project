/**
 * Appends a timestamp to a note showing when it was created.
 * Ensures each note has a consistent and readable creation time.
 * 
 * @param {HTMLElement} noteElement - The DOM element representing the note
 * @param {Note} note - The note object, which may include a `createdAt` property
 */
export function setupTimestamp(noteElement, note) {
    const tsElement = document.createElement('div');
    tsElement.className = 'note-timestamp';
    // If note doesn't already have a creation timestamp, assign current time
    if (!note.createdAt) {
        note.createdAt = new Date().toISOString();
    }
    // Format and set the readable timestamp text
    tsElement.textContent = formatDate(note.createdAt);
    // Insert timestamp just below the note header
    const header = noteElement.querySelector('.note-header');
    header.insertAdjacentElement('afterend', tsElement);
}


/**
 * Converts an ISO timestamp into a readable date and time string.
 * 
 * @param {string} isoString - A date string in ISO 8601 format
 * @returns {string} A formatted date and time string
 */
function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })}, ${date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })}`;
}
