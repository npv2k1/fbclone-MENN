const chats = require("../model/chats");
const messages = require("../model/messages");
module.exports = (io) => {
  console.log("socket...........");
  io.on("connection", (socket) => {
    console.log("Connecting to socket: " + socket.id);

    socket.on("disconnect", function () {
      console.log("disConnecting to socket: " + socket.id);
    });

    socket.on("chats:connected", () => {
      chats.find({}, { _id: 1, chatName: 1, image: 1 }).then((dt) => {
        // console.log("chats =>>",dt)
        io.emit("chats:connected:res", dt);
      });
    });
    socket.on("chats:create", ({ chatName, image }) => {
      chats.create({ chatName, image }).then((dt) => {
        socket.emit("chats:create:res", dt);
      });
    });

    socket.on("messages:create", (payload) => {
      // console.log(payload);

      messages.create(payload).then((res) => {
        socket.emit("messages:create:res", res);
      });
    });
    socket.on("messages:connected", ({ chatId }) => {
      // console.log('chatId :>> ', chatId);
      messages.find({ chatId: chatId }).then((dt) => {
        io.emit("messages:connected:res", dt);
      });
    });
  });
};
