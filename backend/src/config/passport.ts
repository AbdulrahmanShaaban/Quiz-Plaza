import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const { id, emails, name } = profile;
        const email = emails?.[0]?.value;
        const displayName = name?.givenName || name?.familyName || email?.split("@")[0] || "User";
        const avatar = profile.photos?.[0]?.value || "";

        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with this email (link accounts)
        user = await User.findOne({ email });

        if (user) {
          // Link Google account to existing user
          user.googleId = id;
          user.provider = "google";
          user.isVerified = true; // OAuth users are automatically verified
          user.avatar = user.avatar || avatar;
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          name: displayName,
          email,
          avatar,
          googleId: id,
          provider: "google",
          isVerified: true, // OAuth users are automatically verified
        });

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${process.env.CLIENT_URL}/api/auth/github/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const { id, emails, username, photos } = profile;
        const email = emails?.[0]?.value;
        const displayName = username || email?.split("@")[0] || "User";
        const avatar = photos?.[0]?.value || "";

        // Check if user already exists with this GitHub ID
        let user = await User.findOne({ githubId: id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with this email (link accounts)
        user = await User.findOne({ email });

        if (user) {
          // Link GitHub account to existing user
          user.githubId = id;
          user.provider = "github";
          user.isVerified = true; // OAuth users are automatically verified
          user.avatar = user.avatar || avatar;
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          name: displayName,
          email,
          avatar,
          githubId: id,
          provider: "github",
          isVerified: true, // OAuth users are automatically verified
        });

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error as Error, null);
  }
});

export default passport;
