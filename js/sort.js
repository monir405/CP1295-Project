import { setupNoteEventListeners } from './ui.js';

/**
 * Setup separate ascending and descending sort buttons.
 * Each button sorts notes by createdAt and renders the visual layout.
 * 
 * @param {NoteManager} noteManager - Note manager with all notes
 */
export function setupSortButton(noteManager) {
    const ascBtn = document.getElementById('asc-btn');
    const descBtn = document.getElementById('desc-btn');

    if (!ascBtn || !descBtn) return;

    ascBtn.addEventListener('click', () => {
        const sorted = [...noteManager.getAllNotes()].sort((a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );
        renderSortedNotes(sorted, noteManager);
    });

    descBtn.addEventListener('click', () => {
        const sorted = [...noteManager.getAllNotes()].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        renderSortedNotes(sorted, noteManager);
    });
}

/**
 * Renders sorted notes without saving new positions (non-destructive).
 * 
 * @param {Note[]} sortedNotes - Sorted array of notes
 * @param {NoteManager} noteManager - The note manager instance
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
