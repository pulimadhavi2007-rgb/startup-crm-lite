import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  console.log("=================================");
  console.log("JWT_SECRET =", process.env.JWT_SECRET);
  console.log("JWT_EXPIRES_IN =", process.env.JWT_EXPIRES_IN);
  console.log("=================================");

  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is missing. Please check your .env file."
    );
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

/**
 * @route POST /api/auth/register
 * @desc Register New User
 * @access Public
 */
export const registerUser = async (req, res) => {
  console.log("✅ registerUser controller called");
  console.log("Request Body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(
        res,
        "All fields are required",
        [],
        400
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(
        res,
        "Email already exists",
        [],
        409
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    return successResponse(
      res,
      "User registered successfully",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
      201
    );
  } catch (error) {
    console.log("====================================");
    console.log("❌ REGISTER ERROR");
    console.error(error);
    console.log("====================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @route POST /api/auth/login
 * @desc Login User
 * @access Public
 */
export const loginUser = async (req, res) => {
  console.log("✅ loginUser controller called");
  console.log("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res,
        "Email and Password are required",
        [],
        400
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(
        res,
        "Invalid email or password",
        [],
        401
      );
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return errorResponse(
        res,
        "Invalid email or password",
        [],
        401
      );
    }

    const token = generateToken(user._id);

    return successResponse(
      res,
      "Login successful",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      }
    );
  } catch (error) {
    console.log("====================================");
    console.log("❌ LOGIN ERROR");
    console.error(error);
    console.log("====================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @route GET /api/auth/profile
 * @desc Get Logged-in User
 * @access Protected
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    return successResponse(
      res,
      "Profile fetched successfully",
      user
    );
  } catch (error) {
    console.log("====================================");
    console.log("❌ PROFILE ERROR");
    console.error(error);
    console.log("====================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};