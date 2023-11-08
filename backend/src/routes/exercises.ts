import { Elysia, t, Static } from "elysia";
import { ExerciseService } from "../services/exercise.service";

const ExerciseTemplateSchema = t.Object({
  title: t.String(),
  description: t.String(),
  routineTemplateIds: t.Array(t.String()),
  tags: t.Optional(t.Array(t.String())),
});

export type ExerciseTemplateType = Static<typeof ExerciseTemplateSchema>;

const ExerciseApp = new Elysia()
  .group("/templates", (app) =>
    app
      .get("/", () => ExerciseService.getExerciseTemplates())
      .post("/", ({ body }) => ExerciseService)
  )
  .group("/executions", (app) =>
    app.get("/:templateId", ({ params }) =>
      ExerciseService.getExerciseWithExecutions(params.templateId)
    )
  );
