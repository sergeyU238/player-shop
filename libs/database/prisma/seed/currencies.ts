import { PrismaClient } from '../../src/generated/prisma/client';

const currencies = [
  { currencyCode: 'RUB', name: 'Рубль', icon: 'rub.svg' },
  { currencyCode: 'USD', name: 'Доллар', icon: 'usd.svg' },
  { currencyCode: 'KZT', name: 'Тенге', icon: 'tenge.svg' },
];

export async function seedCurrencies(prisma: PrismaClient) {
  console.log('Seeding currencies...');
  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: {
        currencyCode: currency.currencyCode,
      },
      update: currency,
      create: currency,
    });
  }

  console.log(`Seeded ${currencies.length} currencies`);
}
