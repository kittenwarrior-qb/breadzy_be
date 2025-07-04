import express from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   googleLogin,
//   forgotPassword,
//   resetPassword,
//   refreshToken,
//   getUserProfile,
//   updateUserProfile,
//   deleteUser
// } from "../controllers/user/index.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/:id", getUserProfile);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

router.put("/:id", updateUserProfile);

router.delete("/:id", deleteUser);

export default router;
