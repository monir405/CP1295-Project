import { setupNoteEventListeners } from './ui.js';
// Track the current sort order (ascending vs descending)
let ascending = true;
/**
 * Sets up the sort button functionality.
 * Toggles between ascending and descending sort by creation time when clicked.
 * 
 * @param {NoteManager} noteManager - The manager containing all notes
 */
export function setupSortButton(noteManager) {
    const sortBtn = document.getElementById('sort-btn');
    if (!sortBtn) return;
    sortBtn.addEventListener('click', () => {
        // Copy and sort notes based on creation date
        const sorted = [...noteManager.getAllNotes()].sort((a, b) => {
            const timeA = new Date(a.createdAt);
            const timeB = new Date(b.createdAt);
            return ascending ? timeA - timeB : timeB - timeA;
        });
        // Update button text and toggle sorting order
        sortBtn.textContent = ascending ? 'Sort ↓' : 'Sort ↑';
        ascending = !ascending;
        // Render the sorted notes visually
        renderSortedNotes(sorted, noteManager);
    });
}

/**
 * Renders notes in sorted order on the board without saving new positions.
 * This ensures sorting is non-destructive (doesn't affect permanent layout).
 * 
 * @param {Note[]} sortedNotes - The notes sorted by date
 * @param {NoteManager} noteManager - Note manager instance for event handling
 */
export function renderSortedNotes(sortedNotes, noteManager) {
    const noteBoard = document.getElementById('note-board');
    if (!noteBoard) return;
    noteBoard.innerHTML = '';
    let topOffset = 20; 
    const leftOffset = 20; 
    sortedNotes.forEach(note => {
        note.x = leftOffset;
        note.y = topOffset;
        topOffset += 220; 
        const noteElement = note.createElement();
        note.updatePosition(note.x, note.y); 
        setupNoteEventListeners(noteElement, note, noteManager);
        noteBoard.appendChild(noteElement);
    });
}

