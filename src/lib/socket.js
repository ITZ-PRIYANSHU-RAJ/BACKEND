import Message from "../models/Message.js";

const onlineUsers = new Map();

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // =========================
// TYPING START
// =========================

socket.on("typing-start", ({ senderId, receiverId }) => {
  const receiverSocketId = onlineUsers.get(
    receiverId.toString()
  );

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("user-typing", {
      userId: senderId,
    });
  }
});

// =========================
// TYPING STOP
// =========================

socket.on("typing-stop", ({ senderId, receiverId }) => {
  const receiverSocketId = onlineUsers.get(
    receiverId.toString()
  );

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("user-stopped-typing", {
      userId: senderId,
    });
  }
});

    // =========================
    // USER ONLINE
    // =========================

    socket.on("user-online", (userId) => {
      const id = userId.toString();

      onlineUsers.set(id, socket.id);

      console.log("User online:", id);
      console.log("Online users:", onlineUsers);

      // Tell all connected clients
      io.emit("user-status", {
        userId: id,
        online: true,
      });
    });

    // =========================
    // SEND MESSAGE
    // =========================

    socket.on("send-message", async (data) => {
      try {
        const {
          senderId,
          receiverId,
          text,
          image,
        } = data;

        if (!senderId || !receiverId) {
          return;
        }

        if (!text && !image) {
          return;
        }

        const message = await Message.create({
          sender: senderId,
          receiver: receiverId,
          text: text || "",
          image: image || "",
        });

        const receiverSocketId = onlineUsers.get(
          receiverId.toString()
        );

        // Send to receiver
        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "new-message",
            message
          );
        }

        // Send back to sender
        socket.emit("new-message", message);

      } catch (error) {
        console.error(
          "Socket Send Message Error:",
          error.message
        );
      }
    });

    // =========================
    // USER DISCONNECT
    // =========================

    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        console.log(
          "User offline:",
          disconnectedUserId
        );

        // Tell all clients
        io.emit("user-status", {
          userId: disconnectedUserId,
          online: false,
        });
      }

      console.log(
        "User disconnected:",
        socket.id
      );
    });
  });
};

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};