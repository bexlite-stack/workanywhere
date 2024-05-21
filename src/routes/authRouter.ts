import { Elysia } from "elysia";
import { authController } from "../controllers/authController";
import jwt from "@elysiajs/jwt";

export const authRouter = new Elysia()
  .use(jwt({ name: "jwt", secret: "secret123" }))
  // Interface
  .get("/login", authController.renderLoginUI)
  .get("/register", authController.renderRegisterUI)

  .post("/register", authController.credentialRegisterUser)
  .post("/login", authController.credentialLoginUser)
  .post("/login/google", authController.continueWithGoogle)
  .get("/login/google/callback", authController.continueWithGoogleCallback)
  .post("/logout", authController.credentialLogoutUser);
