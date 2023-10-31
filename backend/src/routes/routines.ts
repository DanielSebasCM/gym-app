import { Elysia, t, Static } from "elysia";
import { RoutineService } from "../services/routine.service";

const RoutineTemplateSchema = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
  userId: t.String(),
  tags: t.Optional(t.Array(t.String())),
});

export type RoutineTemplateType = Static<typeof RoutineTemplateSchema>;

export const routineApp = new Elysia()
  .group("/templates", (app) =>
    app
      .get("/", async () => await RoutineService.getRoutineTemplates())
      .post(
        "/",
        async ({ body }) => await RoutineService.postRoutineTemplate(body),
        {
          body: RoutineTemplateSchema,
        }
      )
  )
  .get("/executions/:templateId", async ({ params, set }) => {
    const routine = await RoutineService.getRoutineWithExecutions(
      params.templateId
    );

    if (!routine) {
      set.status = 404;
      return { error: "Routine not found" };
    }

    return routine;
  });
