import { Context } from "elysia";
import { Login } from "../views/domain/auth/login";
import { Register } from "../views/domain/auth/register";
import { userService } from "../services/userService";
import { ContextWithJWT } from "../types/app";
import { google } from "../utils/arctic";
import { generateCodeVerifier, generateState } from "arctic";

export const authController = {
  credentialRegisterUser: async ({ body }: Context) => {
    const { name, email, password } = body as any;

    if (!name || !email || !password) {
      return <div>All fields must be filled</div>;
    }

    await userService.createUser(name, email, password);

    return new Response(null, {
      headers: { "HX-Redirect": "/login" },
    });
  },

  credentialLoginUser: async ({ jwt, body, cookie: { token } }: ContextWithJWT) => {
    const { email, password } = body as any;

    if (!email || !password) {
      return <div>All fields must be filled</div>;
    }

    const user = await userService.findUser(email);

    if (!user) {
      return <div>User not found</div>;
    }

    const isValidPassword = await Bun.password.verify(password, user.password);

    if (!isValidPassword) {
      return <div>Invalid password</div>;
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar as string,
    };

    const jwtToken = await jwt.sign(payload);

    token.httpOnly = true;
    token.path = "/";
    token.value = jwtToken;

    return new Response(null, {
      headers: { "HX-Redirect": "/" },
    });
  },

  continueWithGoogle: async ({ cookie: { code_verifier } }: Context) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    code_verifier.path = "/";
    code_verifier.value = codeVerifier;

    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });

    return new Response(null, {
      headers: {
        "HX-Redirect": url.href,
      },
    });
  },

  continueWithGoogleCallback: async ({ set, jwt, query, cookie: { code_verifier, token } }: ContextWithJWT) => {
    const { code } = query;
    const codeVerifier = code_verifier.value;

    const tokens = await google.validateAuthorizationCode(code!, codeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user = await response.json();
    const findUser = await userService.findUser(user.email);
    let idUser = "";

    if (!findUser) {
      const createUser = await userService.createUser(user.name, user.email, "");
      if (createUser) {
        idUser = createUser;
      }
    }

    const payload = {
      id: idUser || findUser.id,
      name: user.name,
      email: user.email,
      avatar: user.picture,
    };

    const jwtToken = await jwt.sign(payload);

    token.httpOnly = true;
    token.path = "/";
    token.value = jwtToken;

    return (set.redirect = "/");
  },

  credentialLogoutUser: ({ cookie: { token } }: Context) => {
    token.remove();

    return new Response(null, {
      headers: { "HX-Redirect": "/" },
    });
  },

  renderLoginUI: () => {
    return <Login />;
  },

  renderRegisterUI: () => {
    return <Register />;
  },
};
