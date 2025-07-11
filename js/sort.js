import { setupNoteEventListeners } from './ui.js';

let ascending = true;
export function setupSortButton(noteManager) {
    const sortBtn = document.getElementById('sort-btn');
    if (!sortBtn) return;
    sortBtn.addEventListener('click', () => {
        const sorted = [...noteManager.getAllNotes()].sort((a, b) => {
            const timeA = new Date(a.createdAt);
            const timeB = new Date(b.createdAt);
            return ascending ? timeA - timeB : timeB - timeA;
        });
        sortBtn.textContent = ascending ? 'Sort ↓' : 'Sort ↑';
        ascending = !ascending;
        renderSortedNotes(sorted, noteManager);
    });
}

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

