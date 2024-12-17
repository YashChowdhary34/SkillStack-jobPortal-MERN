import { User } from "../models/user.model";
import bycrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (request, response) => {
  try {
    // getting feilds from user
    const { fullname, email, phoneNumber, password, role } = request.body;

    // checking if the fields are empty
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return response.status(400).json({
        message: "Input Field Missing",
        success: false,
      });
    }

    // checking if the user already exists
    const user = await User.findUser({ email });
    if (user) {
      return response.status(400).json({
        message: "Email already taken",
        success: false,
      });
    }

    // encrypting user password
    const hashedPassword = await bycrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return response.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (request, response) => {
  try {
    // getting feilds from user
    const { email, password, role } = request.body;

    // checking if any field is empty
    if (!email || !password || !role) {
      return response.status(400).json({
        message: "Input Field Missing",
        success: false,
      });
    }

    // checking if the user exists
    let user = await User.findUser({ email });
    if (!user) {
      return response.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const doesPasswordMatch = await bycrypt.compare(password, user.password);
    if (!doesPasswordMatch) {
      return response.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check role is correct or not
    if (role !== user.role) {
      return response.status(400).json({
        message: "Wrong role entered",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return response
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 23 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (request, response) => {
  try {
    return response.status(200).cookie(
      "token",
      _,
      { maxAge: 0 },
      json({
        message: "Logged out successfully",
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
