import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) return next(createError(401, "You are not authenticated!"));

    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token exists
    if (!token) return next(createError(401, "You are not authenticated!"));

    // Verify the token
    const decode = await jwt.verify(token, process.env.JWT);

    // Attach user to the request object
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);

    // Return 403 for token verification failures
    res.status(403).json({ error: "Invalid or expired token. Please log in again." });
  }
};
