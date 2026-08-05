import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ─── helpers ─────────────────────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

const setCookie = (res, token) =>
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  sellerInfo: user.sellerInfo,
});

// ─── POST /api/auth/register ──────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password, role, storeName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "buyer",
    };

    if (role === "seller") {
      if (!storeName) {
        return res.status(400).json({
          success: false,
          message: "Store name is required for seller accounts.",
        });
      }
      userData.sellerInfo = { storeName };
    }

    const user = await userModel.create(userData);

    const token = signToken(user);
    setCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: safeUser(user),
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error: error.message });
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = signToken(user);
    setCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: safeUser(user),
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// ─── GET /api/auth/getme ──────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, user: safeUser(user) });
  } catch (error) {
    console.error("GetMe error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
export const logout = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
};
