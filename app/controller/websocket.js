const { Controller } = require('egg');

class WebSocketController extends Controller {
  async join() {
    const { ctx } = this;
    ctx.websocket.onmessage = msg => {
      const data = JSON.parse(msg.data);
      const [type, message] = data;
      if (type === 'join') {
        const { roomID, username } = message;
        ctx.websocket.room.join(roomID); // 加入房间
        ctx.websocket.room.sendTo(roomID, JSON.stringify({ roomID, type: 1, data: `用户${username}加入了房间` }));
      }

      if (type === 'chat') {
        const { roomID, userId, username, content, avatar } = message;
        ctx.websocket.room.sendTo(roomID, JSON.stringify({ roomID, type: 2, userId, username, data: content, avatar }));
      }

    };

    ctx.websocket.onerror = err => {
      this.logger.error(err);
      console.log(err);
      this.join();
    };
  }
}

module.exports = WebSocketController;
