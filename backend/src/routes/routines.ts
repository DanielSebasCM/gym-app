import { Elysia } from "elysia";
import { RoutineService } from "../services/routine.service";

export const routineApp = new Elysia()
  .get("/templates", async () => await RoutineService.getRoutineTemplates())
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
