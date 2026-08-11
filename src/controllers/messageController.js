import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, image } = req.body;
    const senderId = req.user._id;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    // Message must contain text or image
    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Create message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text: text || "",
      image: image || "",
    });

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

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Send Message Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Check other user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get conversation between current user and selected user
    const messages = await Message.find({
      $or: [
        {
          sender: currentUserId,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: currentUserId,
        },
      ],
    })
      .populate("sender", "-password")
      .populate("receiver", "-password")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};