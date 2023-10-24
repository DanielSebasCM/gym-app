import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Prettify } from "elysia/dist/types";

await prisma.role.createMany({
  data: [{ roleName: "admin" }, { roleName: "user" }, { roleName: "premium" }],
});

const user = await prisma.user.create({
  data: {
    firstName: "Daniel",
    secondName: "Sebastian",
    lastName: "Cajas",
    birthDate: new Date("11/21/2003"),
    sex: "MALE",
    roles: {
      connect: {roleName: "admin"},
    },
  },
});
