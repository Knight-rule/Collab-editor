<h1 align="center">📝 Real-time Collaborative Editor</h1>

<p align="center">
  <em>Google Docs-style collaborative editing with live cursors, presence, and WebSocket sync</em>
</p>

<p align="center">
  <a href="https://knight-rule.github.io/collab-editor"><img src="https://img.shields.io/badge/demo-live-brightgreen" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/WebSocket-764ABC?style=flat&logo=socket.io&logoColor=white" alt="WebSocket">
</p>

---

## ✨ Features

- [x] **Rich Text Editing** — Format text with bold, italic, headings, and lists
- [x] **Real-time Collaboration** — Multiple users editing simultaneously
- [x] **Multiple Cursors** — See where other users are typing in real-time
- [x] **User Presence** — Know who's online and where they're working
- [x] **Dark/Light Theme** — Toggle between themes for comfort
- [x] **Export** — Save as HTML or plain text
- [x] **Auto-save** — Changes saved automatically to prevent data loss

## 📸 Screenshot

![screenshot](screenshot.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Server runtime |
| Express | HTTP server and static file serving |
| WebSocket | Real-time bidirectional communication |
| ContentEditable | Rich text editing in the browser |

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/knight-rule/collab-editor.git

# Navigate to the project
cd collab-editor

# Install dependencies
npm install

# Start the server
npm start
```

The server will start at `http://localhost:3000`

## 📖 Usage

1. **Open Editor** — Navigate to `http://localhost:3000` in your browser
2. **Share Link** — Send the URL to collaborators
3. **Edit Together** — Start typing — changes sync in real-time
4. **See Cursors** — Other users' cursors appear with their name and color
5. **Format Text** — Use the toolbar for bold, italic, headings, and lists
6. **Export** — Click Export to download as HTML or plain text

```
// Connect via WebSocket
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data);
  switch(type) {
    case 'insert': applyInsert(data);
    case 'delete': applyDelete(data);
    case 'cursor': updateCursor(data);
    case 'presence': updatePresence(data);
  }
};
```

## ⚙️ How It Works

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  User A     │◀──▶│  WebSocket   │◀──▶│  User B     │
│  (Editor)   │    │  Server      │    │  (Editor)   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼──────┐
                   │  Document   │
                   │  State      │
                   └─────────────┘
```

The editor uses Operational Transformation (OT):
1. **Local Edit** — User makes a change, operation is generated
2. **Broadcast** — Operation sent to WebSocket server
3. **Transform** — Server transforms against concurrent operations
4. **Sync** — Transformed operation broadcast to all other clients
5. **Apply** — Clients apply the transformed operation to their local copy

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prashant** — [@knight-rule](https://github.com/knight-rule)

<p align="center">
  Made with ❤️ for seamless collaboration
</p>
