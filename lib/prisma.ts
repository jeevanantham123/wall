// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }
const prisma = new PrismaClient();
console.log(prisma);
export default prisma;
