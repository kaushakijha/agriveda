const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Access token is required" });
    }

    const accessToken = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Check if the token contains user or seller information
    if (decoded.user) {
      req.userId = decoded.user; // Set user ID in the request object
    } else if (decoded.seller) {
      req.sellerId = decoded.seller; // Set seller ID in the request object
    } else {
      return res
        .status(403)
        .send({ message: "Invalid token, please login again" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token expiration and other errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .send({ message: "Token expired, please login again" });
    }

    return res
      .status(403)
      .send({ message: "Invalid token, please login again" });
  }
};

module.exports = verifyAccessToken;
