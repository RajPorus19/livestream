const http = require("http");
const server = http.createServer();
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "http://127.0.0.1:8000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("sentMessage", () => {
    io.emit("fetchMessage");
    console.log("sentMessage");
  });
  socket.on("username", (username) => {
    console.log(username);
  });
});
function fetchMessages() {}
server.listen(9000, () => console.log("I am listenning"));
