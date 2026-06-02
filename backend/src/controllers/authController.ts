import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { z } from "zod/v4";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import passport from "passport";

// --------------- Validation Schemas ---------------

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const verifySchema = z.object({
  email: z.email("Invalid email address"),
  code: z.string().length(6, "Verification code must be 6 digits"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// --------------- Helpers ---------------

const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const signToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as SignOptions);
};

const setCookie = (res: Response, token: string): void => {
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
  });
};

// --------------- Controllers ---------------

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already registered." });
      return;
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    await User.create({
      name,
      email,
      password,
      verificationCode,
      verificationExpires,
    });

    // Send verification email
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? "loaded" : "missing");

    await sendEmail({
      to: email,
      subject: "Verify your Quiz App account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6c63ff;">Welcome to Quiz App! 🎮</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your verification code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #6c63ff;">${verificationCode}</span>
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    });

    res.status(201).json({
      message: "Registration successful. Please check your email for the verification code.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = verifySchema.parse(req.body);

    const user = await User.findOne({ email }).select(
      "+verificationCode +verificationExpires"
    );

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "Email already verified." });
      return;
    }

    if (user.verificationCode !== code) {
      res.status(400).json({ message: "Invalid verification code." });
      return;
    }

    if (!user.verificationExpires || user.verificationExpires < new Date()) {
      res.status(400).json({ message: "Verification code has expired." });
      return;
    }

    // Mark as verified and clear code
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Verify error:", error);
    res.status(500).json({ message: "Server error during verification." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user with password field included
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    if (!user.isVerified) {
      res.status(403).json({ message: "Please verify your email before logging in." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Sign token and set cookie
    const token = signToken((user._id as unknown) as string);
    setCookie(res, token);

    // Return user without password
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    res.json({
      message: "Login successful.",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
      return;
    }
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
    });

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout." });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// OAuth success handler - generates JWT token after successful OAuth
export const oauthSuccess = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.redirect(`${process.env.CLIENT_URL}/auth/error?message=Authentication failed`);
      return;
    }

    const user = req.user;
    
    // Sign token and set cookie
    const token = signToken((user._id as unknown) as string);
    setCookie(res, token);

    // Return user without password
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    // Redirect to frontend with success
    res.redirect(`${process.env.CLIENT_URL}/auth/success?user=${encodeURIComponent(JSON.stringify(userWithoutPassword))}`);
  } catch (error) {
    console.error("OAuth success error:", error);
    res.redirect(`${process.env.CLIENT_URL}/auth/error?message=Authentication failed`);
  }
};