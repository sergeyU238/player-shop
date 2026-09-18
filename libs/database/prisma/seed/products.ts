import { PrismaClient } from '../../src/generated/prisma/client';

const products = [
  {
    sku: 'STEAM-TOPUP-500',
    name: 'Пополнение Steam 500 ₽',
    type: 'topup',
    price: 500,
    currencyCode: 'RUB',
    image: 'default.png',
  },
  {
    sku: 'STEAM-TOPUP-1000',
    name: 'Пополнение Steam 1000 ₽',
    type: 'topup',
    price: 1000,
    currencyCode: 'RUB',
    image: 'default.png',
  },
  {
    sku: 'STEAM-TOPUP-2500',
    name: 'Пополнение Steam 2500 ₽',
    type: 'topup',
    price: 2500,
    currencyCode: 'RUB',
    image: 'default.png',
  },
  {
    sku: 'GIFT-ROBLOX-800',
    name: 'Roblox 800 Robux',
    type: 'giftcard',
    price: 890,
    currencyCode: 'RUB',
    image: 'default.png',
  },
  {
    sku: 'GIFT-ROBLOX-1800',
    name: 'Roblox 1800 Robux',
    type: 'giftcard',
    price: 1890,
    currencyCode: 'RUB',
    image: 'default.png',
  },
];

export async function seedProducts(prisma: PrismaClient) {
  console.log('Seeding products...');
  for (const product of products) {
    await prisma.products.upsert({
      where: {
        sku: product.sku,
      },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
}
