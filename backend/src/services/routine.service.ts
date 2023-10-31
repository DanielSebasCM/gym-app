import { prisma } from "../client";
import { RoutineTemplateType } from "../routes/routines";

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

  static async postRoutineTemplate(data: RoutineTemplateType) {
    return await prisma.routineTemplate.create({
      data: {
        title: data.title,
        description: data.description,
        userIdFK: data.userId,
        tags: { connect: data.tags?.map((tag) => ({ name: tag })) },
      },
    });
  }
}
