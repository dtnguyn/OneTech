import { VerifyCallback } from "passport-google-oauth20";
import { getConnection, getRepository } from "typeorm";
import { User } from "./entities/User";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";

import { Router } from "express";
import { UserSetting } from "./entities/UserSetting";

const router = Router();

const handleAuth = async (
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  cb: VerifyCallback
) => {
  const { id, emails, displayName, photos } = profile;

  const repo = getRepository(User);
  const user = await repo.findOne({ oauthId: id });

  if (user) {
    console.log("Already sign up: ", user);
    return cb("", { id: user.id });
  } else {
    console.log("Not yet sign up!");
    return cb("", {
      oauthId: id as string,
      email: emails ? emails[0].value : null,
      username: displayName,
      avatar: photos ? photos[0].value : null,
    });
  }
};

const handleRegister = async (
  oauthId: string,
  email: string,
  username: string,
  avatar: string
) => {
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const manager = queryRunner.manager;

    const checkUser = await manager.findOne(User, { email });

    if (checkUser) {
      throw new Error("This email is already used.");
    }

    const newUser = await manager.create(User, {
      oauthId,
      email,
      username,
      avatar,
    });

    await manager.insert(User, newUser);

    await manager.insert(UserSetting, { userId: newUser.id });

    await queryRunner.commitTransaction();

    return newUser;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error.message);
    return null;
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    handleAuth
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    handleAuth
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID as string,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET as string,
      callbackURL: process.env.TWITTER_CALLBACK_URL as string,
      includeEmail: true,
    },
    handleAuth
  )
);

router.use(passport.initialize());

router.get("/register", (req, res) => {
  (req.session as any).email = req.query.email;

  switch (req.query.method) {
    case "google": {
      res.redirect("/auth/google");
      break;
    }
    case "facebook": {
      res.redirect("/auth/facebook");
      break;
    }
    case "twitter": {
      res.redirect("/auth/twitter");
      break;
    }
  }
});

router.get("/login", (req, res) => {
  console.log(req.query);
  (req.session as any).from = req.query.from;
  switch (req.query.method) {
    case "google": {
      res.redirect("/auth/google");
      break;
    }
    case "facebook": {
      res.redirect("/auth/facebook");
      break;
    }
    case "twitter": {
      res.redirect("/auth/twitter");
      break;
    }
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    // Successful authentication, redirect home.
    console.log("Here");
    if ((req.user as any).id) {
      //If user log in
      console.log("Successful Login!");
      (req.session as any).userId = (req.user as any).id;
    } else {
      //If user register

      if ((req.session as any).email) {
        try {
          const user = await handleRegister(
            (req.user as any).oauthId,
            (req.session as any).email,
            (req.user as any).username,
            (req.user as any).avatar
          );
          if (!user) throw new Error("Cannot create this user.");
          (req.session as any).userId = user?.id;
          console.log("Successful register!");
        } catch (e) {
          console.log("Fail to register", e.message);
          (req.session as any).email = undefined;
          return res.redirect(500, `${process.env.CLIENT_URL}/auth`);
        }
      } else {
        console.log("Register must provide email");
        return res.redirect(404, `${process.env.CLIENT_URL}/auth`);
      }
    }
    if ((req.session as any).email) (req.session as any).email = undefined;
    if ((req.session as any).from) res.redirect(301, (req.session as any).from);
    else res.redirect(301, `${process.env.CLIENT_URL}`);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    if ((req.user as any).id) {
      //If user log in
      console.log("Successful Login!");
      (req.session as any).userId = (req.user as any).id;
    } else {
      //If user register
      if ((req.session as any).email) {
        try {
          console.log("user: ", req.user);
          const user = await handleRegister(
            (req.user as any).oauthId,
            (req.session as any).email,
            (req.user as any).username,
            (req.user as any).avatar
          );
          (req.session as any).userId = user?.id;
          console.log("Successful register!");
        } catch (e) {
          console.log("Fail to register", e.message);
          (req.session as any).email = undefined;
          return res.redirect(500, `${process.env.CLIENT_URL}/auth`);
        }
      } else {
        console.log("Register must provide email");
        return res.redirect(404, `${process.env.CLIENT_URL}/auth`);
      }
    }
    if ((req.session as any).email) (req.session as any).email = undefined;
    res.redirect(301, `${process.env.CLIENT_URL}`);
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res) => {
    if ((req.user as any).id) {
      //If user log in
      console.log("Successful Login!");
      (req.session as any).userId = (req.user as any).id;
    } else {
      //If user register
      if ((req.session as any).email) {
        try {
          console.log("user: ", req.user);
          const user = await handleRegister(
            (req.user as any).oauthId,
            (req.session as any).email,
            (req.user as any).username,
            (req.user as any).avatar
          );
          (req.session as any).userId = user?.id;
          console.log("Successful register!");
        } catch (e) {
          console.log("Fail to register", e.message);
          (req.session as any).email = undefined;
          return res.redirect(500, `${process.env.CLIENT_URL}/auth`);
        }
      } else {
        console.log("Register must provide email");
        return res.redirect(404, `${process.env.CLIENT_URL}/auth`);
      }
    }
    if ((req.session as any).email) (req.session as any).email = undefined;
    res.redirect(301, `${process.env.CLIENT_URL}`);
  }
);

export default router;
