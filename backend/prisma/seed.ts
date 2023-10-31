import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  console.info("Running seed script...");
  console.time();
  try {
    await prisma.role.createMany({
      data: [
        { roleName: "admin" },
        { roleName: "user" },
        { roleName: "premium" },
      ],
    });

    const mockUser = await prisma.user.create({
      data: {
        email: "daniel@mail.com",
        firstName: "Daniel",
        secondName: "Sebastian",
        lastName: "Cajas",
        birthDate: new Date("11/21/2003"),
        sex: "MALE",
        roles: {
          connect: { roleName: "admin" },
        },
      },
    });

    await prisma.tag.createMany({
      data: [{ name: "push" }, { name: "pull" }, { name: "legs" }],
    });

    const routine = await prisma.routineTemplate.create({
      data: {
        title: "Push Routine",
        description: "A routine for a push day",
        user: { connect: { userId: mockUser.userId } },
        tags: { connect: [{ name: "push" }] },
      },
    });

    await prisma.routineExecution.create({
      data: {
        notes: "This is a note",
        routineTemplate: {
          connect: { routineTemplateId: routine.routineTemplateId },
        },
      },
    });
  } catch (error) {
    console.error("Error running the seed script: ");
    console.error(error);
  } finally {
    console.info("Finished running seed script");
    console.timeEnd();
  }
}

await run();
