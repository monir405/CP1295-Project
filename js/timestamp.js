export function setupTimestamp(noteElement, note) {
    const tsElement = document.createElement('div');
    tsElement.className = 'note-timestamp';
    if (!note.createdAt) {
        note.createdAt = new Date().toISOString();
    }
    tsElement.textContent = formatDate(note.createdAt);
    const header = noteElement.querySelector('.note-header');
    header.insertAdjacentElement('afterend', tsElement);
}

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
