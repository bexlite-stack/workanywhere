import { Context } from "elysia";

export interface ContextWithJWT extends Context {
  jwt: {
    readonly sign: (payload: Record<string, string | number>) => Promise<string>;
    readonly verify: (token: string) => Promise<false | Record<string, string | number>>;
  };
}

export interface ContextWithUser extends ContextWithJWT {
  user: Record<string, string | number>;
}
