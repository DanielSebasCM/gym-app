import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  console.log("Running seed script...");
  console.time();

  try {
    await prisma.role.createMany({
      data: [
        { roleName: "admin" },
        { roleName: "user" },
        { roleName: "premium" },
      ],
    });

    await prisma.user.create({
      data: {
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
  } catch (error) {
    console.error("Error running the seed script: ");
    console.error(error);
  } finally {
    console.log("Finished running seed script");
    console.timeEnd();
  }
}

await run();
