import { PrismaClient } from '../../src/generated/prisma/client';

const users = [
  {
    name: 'Тест Тестов',
    email: 'test@test.test',
    password: '$2b$10$2BbpeQ6GynQ7q46DT4n3YuHFt1wrC6COtA8zAVXNMin7DYrAsYBxe', // My3~qm_*y0
    role: 'user',
  },
  {
    name: 'Админ админов',
    email: 'admin@test.test',
    password: '$2b$10$iqKzA8EBBHLUWBTcCTSZYOFv7gT19lETFFONxKlSVGfsEhLuHB15S', // !0ngZCBP+UCS2ODR
    role: 'admin',
  },
];

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding users...');
  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: user,
    });
  }

  console.log(`Seeded ${users.length} users`);
}
