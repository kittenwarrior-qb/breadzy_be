import User from "../../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../utils/jwt/GenerateAccessToken.js";
import { generateRefreshToken } from "../../utils/jwt/GenerateRefreshToken.js";

// REGISTER
export const register = async (req, res) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Thiếu email hoặc mật khẩu' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Email đã tồn tại' });
        }

        const newUser = new User({ password, email });
        await newUser.save();

        return res.status(StatusCodes.CREATED).json({
            msg: "Đăng ký thành công"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Lỗi phía server', error });
    }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Thiếu email hoặc mật khẩu" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Email không tồn tại" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Sai mật khẩu" });
    }

    // Tạo access token và refresh token
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    // Lưu refreshToken vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
    });

    return res.status(StatusCodes.OK).json({
      msg: "Đăng nhập thành công",
      accessToken,
      refreshToken, // Chỉ cho development
      user: {
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Lỗi server", err });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(StatusCodes.OK).json({ msg: "Đăng xuất thành công" });
};
