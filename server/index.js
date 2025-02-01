// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const io = new Server(httpServer, {});

// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   // Handle joining a room
//   socket.on("joinRoom", (room) => {
//     console.log(`${socket.id} joined room: ${room}`);
//     socket.join(room);
//   });

//   // Listen for messages from the client
//   socket.on("client", ({ room, message }) => {
//     console.log(`Message from ${socket.id} in room ${room}: ${message}`);

//     // Emit the message to the specified room (excluding the sender)
//     socket.to(room).emit("server", { id: socket.id, message });
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

// httpServer.listen(3001, () => {
//   console.log("Server is running on http://localhost:3001");
// });
