import { prisma } from "../client";
import { ExerciseTemplateType } from "../routes/exercises";

export class ExerciseService {
  static async getExerciseTemplates() {
    return await prisma.exerciseTemplate.findMany();
  }

  static async getExerciseTemplate(exerciseTemplateId: string) {
    return await prisma.exerciseTemplate.findUnique({
      where: { exerciseTemplateId },
    });
  }

  static async getExerciseWithExecutions(exerciseTemplateId: string) {
    return await prisma.exerciseTemplate.findUnique({
      where: { exerciseTemplateId },
      include: {
        exerciseExecutions: true,
      },
    });
  }

  static async postExerciseTemplate(data: ExerciseTemplateType) {}
}
