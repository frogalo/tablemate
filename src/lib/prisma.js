// let PrismaClientConstructor;
//
// if (process.env.NODE_ENV === "production") {
//     // Adjust the path as necessary
//     // Use your production client generated in prisma/generated/prod-client
//     PrismaClientConstructor = require("/prisma/generated/prod-client").PrismaClient;
// } else {
//     // Use your development client generated in prisma/generated/dev-client
//     PrismaClientConstructor = require("/prisma/generated/dev-client").PrismaClient;
// }
//
// const prisma = new PrismaClientConstructor();
// export default prisma;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;