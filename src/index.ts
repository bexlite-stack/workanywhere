import { Elysia } from "elysia";
import { createTable } from "./utils/createTable";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { authRouter } from "./routes/authRouter";
import { platformRouter } from "./routes/platformRouter";

createTable();

const app = new Elysia()
  // Plugins
  .use(
    staticPlugin({
      headers: {
        "Cache-Control": "public, max-age=31536000",
        Expires: "Thu, 31 Dec 2037 23:55:55 GMT",
      },
    })
  )
  .use(html())
  // Router
  .use(authRouter)
  .use(platformRouter)
  // Port
  .listen(4444);

console.log("Betterwork app - running at 3000");
