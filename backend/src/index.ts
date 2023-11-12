import { Elysia } from "elysia";
import { routineApp } from "./routes/routines";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .group("/routines", (app) => app.use(routineApp))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
