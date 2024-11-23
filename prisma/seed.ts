import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

async function seed() {
    const prisma = new PrismaClient();
   
    const usersToCreate = 75;
    for (let i = 0; i < usersToCreate; i++) {
         await prisma.user.create({
            data: {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                apellidos: faker.person.lastName(),
                password: faker.internet.password(),
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