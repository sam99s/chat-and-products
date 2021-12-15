const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const productos = [];

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    productos
  });
});

app.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title === "" || price === "" || thumbnail === "") {
    return res.redirect("/");
  }

  const producto = { title, price, thumbnail };
  if (productos.length === 0) {
    producto["id"] = 1;
  } else {
    producto["id"] = productos[productos.length - 1].id + 1;
  }

  productos.push(producto);

  res.redirect("/");
});


const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${server.address().port}`);
  });
server.on("error", (error) => console.log(`Error en servidor ${error}`));

const SocketIO = require("socket.io");
const io = SocketIO(server);

// Websockets
io.on("connection", (socket) => {
  console.log("New Connection", socket.id);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    // broadcast antes del emit es para emitir a todos menos a mi
    socket.broadcast.emit("chat:typing", data);
  });
});
