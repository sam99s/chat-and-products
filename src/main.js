const express = require("express");
const app = express();
const PORT = 8080;

// Settings
app.set('json spaces', 2)
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// routes
app.use(require('./routes/index'))
app.use('/api/productos',require('./routes/products'))



// Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${server.address().port}`);
  });
server.on("error", (error) => console.log(`Error en servidor ${error}`));


// Websockets
const SocketIO = require("socket.io");
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {    
    socket.broadcast.emit("chat:typing", data); /* broadcast antes del emit es para emitir a todos menos a mi */
  });
});
