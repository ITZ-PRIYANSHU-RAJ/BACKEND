import Message from "../models/Message.js";

const onlineUsers = new Map();

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // User comes online
socket.on("user-online", (userId) => {
  const id = userId.toString();

  onlineUsers.set(id, socket.id);

  console.log("👤 User online:", id);

  socket.broadcast.emit("user-status", {
    userId: id,
    online: true,
  });
});
    // Send message
    socket.on("send-message", async (data) => {
      try {
        console.log("📨 send-message received:", data);

        const {
          senderId,
          receiverId,
          text,
          image,
        } = data;

        if (!senderId || !receiverId) {
          console.log("❌ Missing senderId or receiverId");
          return;
        }

        if (!text?.trim() && !image) {
          console.log("❌ Empty message");
          return;
        }

        // Save message
        const message = await Message.create({
          sender: senderId,
          receiver: receiverId,
          text: text?.trim() || "",
          image: image || "",
        });

        // Populate sender/receiver
        await message.populate([
          {
            path: "sender",
            select: "-password",
          },
          {
            path: "receiver",
            select: "-password",
          },
        ]);

        console.log("💾 Message saved:", message._id);

        // Find receiver socket
        const receiverSocketId = onlineUsers.get(
          receiverId.toString()
        );

        console.log(
          "🎯 Receiver socket:",
          receiverSocketId
        );

        // Send to receiver
        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "new-message",
            message
          );

          console.log("⚡ Message sent to receiver");
        } else {
          console.log("⚫ Receiver is offline");
        }

        // Send back to sender
        socket.emit("new-message", message);

      } catch (error) {
        console.error(
          "❌ Socket Send Message Error:",
          error
        );
      }
    });
    // User started typing
socket.on("typing-start", ({ senderId, receiverId }) => {
  const receiverSocketId = onlineUsers.get(
    receiverId.toString()
  );

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("user-typing", {
      userId: senderId.toString(),
      typing: true,
    });
  }
});

// User stopped typing
socket.on("typing-stop", ({ senderId, receiverId }) => {
  const receiverSocketId = onlineUsers.get(
    receiverId.toString()
  );

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("user-typing", {
      userId: senderId.toString(),
      typing: false,
    });
  }
});

socket.on("disconnect", () => {
  console.log("🔴 Socket disconnected:", socket.id);

  for (const [userId, socketId] of onlineUsers.entries()) {
    if (socketId === socket.id) {
      onlineUsers.delete(userId);

      socket.broadcast.emit("user-status", {
        userId,
        online: false,
      });

      console.log("👤 User offline:", userId);

      break;
    }
  }
});
  });
};

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};