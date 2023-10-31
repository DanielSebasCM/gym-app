import { Elysia } from "elysia";
import { routineApp } from "./routes/routines";

const app = new Elysia()
  .group("/routines", (app) => app.use(routineApp))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
