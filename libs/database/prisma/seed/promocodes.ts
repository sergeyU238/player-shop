import { PrismaClient } from '../../src/generated/prisma/client';

const promocodes = [
  {
    code: 'WELCOME10',
    discount: 10,
    isPercent: true,
    currencyCode: null,
    limit: 100,
    used: 0,
  },
  {
    code: 'GG500',
    discount: 500,
    isPercent: false,
    currencyCode: 'RUB',
    limit: 20,
    used: 0,
  },
  {
    code: 'LIMIT3',
    discount: 25,
    isPercent: true,
    currencyCode: null,
    limit: 3,
    used: 0,
  },
  {
    code: 'ONCEONLY',
    discount: 50,
    isPercent: true,
    currencyCode: null,
    limit: 1,
    used: 0,
  },
];

export async function seedPromocodes(prisma: PrismaClient) {
  console.log('Seeding promo codes...');
  for (const promocode of promocodes) {
    await prisma.promocodes.upsert({
      where: { code: promocode.code },
      update: { discount: promocode.discount, limit: promocode.limit },
      create: { ...promocode, used: 0 },
    });
  }
  console.log(`Seeded ${promocodes.length} promo codes`);
}
