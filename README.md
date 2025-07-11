# QuickNotes

A browser-based sticky note application that allows users to create, edit, move, and delete virtual sticky notes directly in the browser.

## Purpose

QuickNotes is a compact single-page web app that lets users create, move, edit, and delete virtual sticky notes directly in the browser. The application demonstrates key web development concepts including DOM manipulation, custom objects, browser storage, asynchronous JavaScript, ES modules, and JSON handling.

## Features

- Add colorful notes by typing text or double-clicking on the board
- Edit notes with inline textarea or modal
- Drag and drop notes around the board
- Delete notes with a fade-out effect
- Automatic saving to localStorage
- Fetch random productivity quotes via external API
- Export notes as JSON file
- Add multiple Images and delete them
- Added time stamp (creation date)
- Added sorting based on time stamp (ascending and descending)

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- ES Modules
- localStorage for persistence
- Fetch API for asynchronous operations

## Project Structure

- `index.html`: Main HTML file
- `css/styles.css`: Stylesheet
- `js/main.js`: Entry point for the application
- `js/notes.js`: Note class definition and management
- `js/ui.js`: UI-related functions and event handlers
- `js/storage.js`: Functions for data persistence
- `js/image.js` : Functions to add and delete image to notes
- `js/timestamp.js` : Functions to add time stamp to notes
- `js/sort.js` : Functions to sort the notes based on time stamp (ascending and descending)

## Getting Started

1. Clone this repository
2. Open index.html in your browser
3. Start creating notes!

## Development Timeline

- Week 1: Basic layout, add-note feature, and drag-and-drop functionality
- Week 2: Delete feature, Note class implementation, and localStorage implementation
- Week 3: ES module refactoring and quote fetching with async/await
- Week 4: JSON export, UI polish, documentation, and final submission
