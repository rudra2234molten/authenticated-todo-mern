import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists With This Username or Email.",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    userExists = await User.create({
      username,
      email,
      password: hasedPassword,
    });

    sendCookie(userExists, res, "Registered Successfully.", 200);
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let userExists = await User.findOne({ email }).select("+password");
  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email.",
    });
  }

  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Password.",
    });
  }

  sendCookie(userExists, res, "Welcome To Home Page.", 200);
};

export const getProfile = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  res.status(200).clearCookie("token").json({
    success: true,
    message: "Logout Successs.",
    user: req.user,
  });
};
