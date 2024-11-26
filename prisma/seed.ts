import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';


async function seed() {
    const prisma = new PrismaClient();
   
    const usersToCreate = 75;
    const saltRounds = 10;

    for (let i = 0; i < usersToCreate; i++) {
        const hashedPassword = await bcrypt.hash(faker.internet.password(), saltRounds);

         await prisma.user.create({
            data: {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                apellidos: faker.person.lastName(),
                password: hashedPassword,
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