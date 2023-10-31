import { prisma } from "../client";

export class RoutineService {
  static async getRoutineTemplates() {
    return await prisma.routineTemplate.findMany();
  }

  static async getRoutineWithExecutions(id: string) {
    return await prisma.routineTemplate.findUnique({
      where: { routineTemplateId: id },
      include: { routineExecutions: true },
    });
  }
}
