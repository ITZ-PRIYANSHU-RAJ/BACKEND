import Message from "../models/Message.js";

const onlineUsers = new Map();

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-online", (userId) => {
      onlineUsers.set(userId.toString(), socket.id);

      console.log("User online:", userId);
      console.log("Online users:", onlineUsers);
    });

    socket.on("send-message", async (data) => {
      try {
        const { senderId, receiverId, text, image } = data;

        // Validate data
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

        // Find receiver's socket
        const receiverSocketId = onlineUsers.get(
          receiverId.toString()
        );

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("new-message", message);
        }

        // Send message back to sender
        socket.emit("new-message", message);

      } catch (error) {
        console.error("Socket Send Message Error:", error.message);
      }
    });


    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);

          console.log("User offline:", userId);
          break;
        }
      }

      console.log("User disconnected:", socket.id);
    });
  });
};

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};