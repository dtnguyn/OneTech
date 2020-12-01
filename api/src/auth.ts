import { VerifyCallback } from "passport-google-oauth20";
import { getRepository } from "typeorm";
import { User } from "./entities/User";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";

import { Router } from "express";
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
    const newUser = await repo.create({
      oauthId: id as string,
      email: emails ? emails[0].value : null,
      username: displayName,
      avatar: photos ? photos[0].value : null,
    });
    await repo
      .insert(newUser)
      .then(() => {
        console.log("Create user: ", newUser);
        return cb("", { id: newUser.id });
      })
      .catch((err) => {
        console.log("Fail to create user: ", err);
        return cb(err, null);
      });
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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("Successful authentication!");
    (req.session as any).userId = (req.user as any).id;
    res.redirect("/graphql");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("Successful authentication!");
    (req.session as any).userId = (req.user as any).id;
    res.redirect("/graphql");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("Successful authentication!");
    (req.session as any).userId = (req.user as any).id;
    res.redirect("/graphql");
  }
);

export default router;
