const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

const rooms = new Map();

const adjectives = ['Happy', 'Clever', 'Brave', 'Swift', 'Bright', 'Calm', 'Eager', 'Fair', 'Kind', 'Proud'];
const nouns = ['Tiger', 'Eagle', 'Panda', 'Wolf', 'Bear', 'Hawk', 'Fox', 'Deer', 'Lion', 'Owl'];
const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D01', '#46BDC6', '#7B1FA2', '#C2185B', '#00796B', '#F57C00'];

function generateUser() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return {
    name: `${adj} ${noun}`,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

wss.on('connection', (ws) => {
  let currentRoom = null;
  let userInfo = null;

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'join':
          currentRoom = message.room;
          userInfo = generateUser();
          userInfo.id = message.userId || Date.now().toString();

          if (!rooms.has(currentRoom)) {
            rooms.set(currentRoom, {
              content: '',
              users: new Map(),
              title: 'Untitled Document'
            });
          }

          const room = rooms.get(currentRoom);
          room.users.set(userInfo.id, { ...userInfo, ws, cursor: null });

          ws.send(JSON.stringify({
            type: 'init',
            content: room.content,
            title: room.title,
            user: userInfo,
            users: Array.from(room.users.values()).map(u => ({
              id: u.id,
              name: u.name,
              color: u.color,
              cursor: u.cursor
            }))
          }));

          broadcastToRoom(currentRoom, {
            type: 'user_joined',
            user: { id: userInfo.id, name: userInfo.name, color: userInfo.color }
          }, ws);
          break;

        case 'content':
          if (currentRoom && rooms.has(currentRoom)) {
            rooms.get(currentRoom).content = message.content;
            broadcastToRoom(currentRoom, {
              type: 'content_update',
              content: message.content,
              userId: userInfo.id
            }, ws);
          }
          break;

        case 'title':
          if (currentRoom && rooms.has(currentRoom)) {
            rooms.get(currentRoom).title = message.title;
            broadcastToRoom(currentRoom, {
              type: 'title_update',
              title: message.title,
              userId: userInfo.id
            }, ws);
          }
          break;

        case 'cursor':
          if (currentRoom && rooms.has(currentRoom)) {
            const user = rooms.get(currentRoom).users.get(userInfo.id);
            if (user) {
              user.cursor = message.cursor;
            }
            broadcastToRoom(currentRoom, {
              type: 'cursor_update',
              userId: userInfo.id,
              userName: userInfo.name,
              userColor: userInfo.color,
              cursor: message.cursor
            }, ws);
          }
          break;

        case 'typing':
          if (currentRoom && rooms.has(currentRoom)) {
            broadcastToRoom(currentRoom, {
              type: 'typing_indicator',
              userId: userInfo.id,
              userName: userInfo.name,
              isTyping: message.isTyping
            }, ws);
          }
          break;
      }
    } catch (e) {
      console.error('Message parse error:', e);
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      const room = rooms.get(currentRoom);
      room.users.delete(userInfo.id);

      broadcastToRoom(currentRoom, {
        type: 'user_left',
        userId: userInfo.id
      });

      if (room.users.size === 0) {
        rooms.delete(currentRoom);
      }
    }
  });
});

function broadcastToRoom(roomId, message, excludeWs = null) {
  const room = rooms.get(roomId);
  if (!room) return;

  const data = JSON.stringify(message);
  room.users.forEach((user) => {
    if (user.ws !== excludeWs && user.ws.readyState === WebSocket.OPEN) {
      user.ws.send(data);
    }
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
