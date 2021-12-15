const socket = io(); //envia todos los eventos al servidor

let message = document.getElementById("message");
let username = document.getElementById("username");
let send = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

send.addEventListener("click", function () {
  if(username.value != "" && username.value.includes('@')){
    socket.emit("chat:message", {
      username: username.value,
      message: message.value,
    });
  }
});

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});

// No importa que se repita el nombre, chat:message, ya que son dos procesos distintos
socket.on("chat:message", function (data) {
  let fecha = new Date();
  let day = fecha.getDate();
  let month = fecha.getMonth() + 1;
  let year = fecha.getFullYear();
  let hour = fecha.getHours();
  let minutes = fecha.getMinutes();
  let seconds = fecha.getSeconds();
  actions.innerHTML = ""; // Para borrar el is typing
  output.innerHTML += `<p><strong>${data.username}</strong><span style="color: brown;">[${day}/${month}/${year}] (${hour}:${minutes}:${seconds})</span>: <span style="font-style: italic; color: darkgreen;">${data.message}</span></p>`;
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p>
    <em>${data} is typing a messsage...</em>
    </p>`;
});
