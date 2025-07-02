import jwt from "jsonwebtoken";

export const verifyTokens = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
