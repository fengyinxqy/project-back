const { Controller } = require('egg');

class WebSocketController extends Controller {
  async join() {
    const { ctx } = this;
    ctx.websocket.onmessage = msg => {
      const data = JSON.parse(msg.data);
      const [ type, message ] = data;
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
    // const { roomID } = ctx.socket.packet[1]; // 假设客户端发送的数据包格式为["join", { roomID: "123" }]
    // const socket = ctx.websocket;
    // const id = socket.id;

    // socket.room.join(roomID); // 加入房间
    // console.log(`用户${id}加入了房间${roomID}`);

    // // 向房间内的所有成员广播
    // socket.room.sendTo(roomID, `用户${id}加入了房间`);
  }
}

module.exports = WebSocketController;
