import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

export const requestsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many  requests, please try again later.",
});
export const generateToken = (user_id: string, expiresIn: string = "1d") => {
  return jwt.sign({ user_id }, process.env.TOKEN_KEY as string, {
    expiresIn,
  });
};
