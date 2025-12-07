const socket = new WebSocket("ws://localhost:3000", {});

socket.addEventListener("message", (event) => {
  console.log(event.data);
}); // message is received

socket.addEventListener("open", (event) => {
  socket.send("Hello server!");
}); // socket opened

socket.addEventListener("close", (event) => {}); // socket closed

socket.addEventListener("error", (event) => {}); // error handler
