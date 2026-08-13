import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const USER_ID = "6a7573ac1a73103e85683ece";

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // Tell backend this user is online
  socket.emit("user-online", USER_ID);

  console.log("User marked online:", USER_ID);
});

socket.on("new-message", (message) => {
  console.log("📩 New message received:");
  console.log(message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});