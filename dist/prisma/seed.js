"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
async function seed() {
    const prisma = new client_1.PrismaClient();
    const usersToCreate = 75;
    for (let i = 0; i < usersToCreate; i++) {
        await prisma.user.create({
            data: {
                name: faker_1.faker.person.firstName(),
                email: faker_1.faker.internet.email(),
                apellidos: faker_1.faker.person.lastName(),
                password: faker_1.faker.internet.password(),
                isDeleted: i % 12 === 0,
            }
        });
    }
    await prisma.$disconnect();
}
seed()
    .catch(e => {
    throw e;
})
    .finally(async () => {
});
//# sourceMappingURL=seed.js.map