import { StatusCodes } from "http-status-codes";
import { verifyTokens } from "../utils/jwt/VerifyTokens.js";

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Bạn không có quyền truy cập (thiếu token)",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyTokens(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
