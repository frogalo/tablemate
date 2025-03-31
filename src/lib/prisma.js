import path from "path";

let PrismaClientConstructor;

if (process.env.NODE_ENV === "production") {
    // Use the production client generated in "generated/prod-client"
    const prodClientPath = path.join(process.cwd(), "generated", "prod-client");
    PrismaClientConstructor = require(prodClientPath).PrismaClient;
} else {
    // Use the development client generated in "generated/dev-client"
    const devClientPath = path.join(process.cwd(), "generated", "dev-client");
    PrismaClientConstructor = require(devClientPath).PrismaClient;
}

const prisma = new PrismaClientConstructor();
export default prisma;
