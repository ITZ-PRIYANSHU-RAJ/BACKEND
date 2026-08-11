import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    // decoded contains the payload
    req.user =user;

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default protectRoute;