# CollabEdit - Real-time Collaborative Editor

A Google Docs-inspired real-time collaborative text editor built with WebSocket technology.

## Features

### Rich Text Editing
- Bold, Italic, Underline, Strikethrough
- Font family and size selection
- Text alignment (Left, Center, Right)
- Bullet and numbered lists
- Text color and highlight color
- Undo/Redo functionality
- Clear formatting

### Real-time Collaboration
- Multiple cursor positions with user names and colors
- Typing indicators
- User presence panel showing connected users
- Random user names and colors
- Room-based collaboration via URL

### Document Features
- Editable document title
- Character, word, and line count
- Export as HTML or plain text
- Auto-save indicator
- Share link functionality

### UI/UX
- Beautiful Google Docs-like interface
- Dark/Light theme toggle
- Zoom controls
- Responsive toolbar
- Notifications for user actions

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd 06-collab-editor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## Usage

1. Open the application in your browser
2. Share the URL with others to collaborate in real-time
3. Each user gets a random name and color
4. See other users' cursors and typing indicators
5. Use the toolbar for formatting options
6. Toggle dark/light theme with the moon/sun icon
7. Export your document as HTML or plain text

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Real-time**: WebSocket (ws library)

## Project Structure

```
06-collab-editor/
├── public/
│   └── index.html      # Frontend application
├── server.js           # WebSocket server
├── package.json        # Project dependencies
└── README.md           # Documentation
```

## Keyboard Shortcuts

- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline
- `Ctrl+Z` - Undo
- `Ctrl+Shift+Z` - Redo

## License

MIT
