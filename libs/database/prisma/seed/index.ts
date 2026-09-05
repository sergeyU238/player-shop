import { PrismaClient } from '../../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import { env } from 'prisma/config';
import { seedUsers } from './users';
import { seedProducts } from './products';
import { seedPromocodes } from './promocodes';
import { seedVendorKeys } from './vendor-keys';
import { seedCurrencies } from './currencies';

dotenv.config({
  path: 'libs/database/.env',
});

const adapter = new PrismaPg({
  connectionString: env('DATABASE_URL'),
});

const prisma = new PrismaClient({
  adapter,
});

dotenv.config({
  path: 'libs/database/.env',
});

async function main() {
  await seedCurrencies(prisma);
  await seedUsers(prisma);
  await seedProducts(prisma);
  return Promise.all([seedPromocodes(prisma), seedVendorKeys(prisma)]);
}

main()
  .then(() => {
    console.log('All seeds completed');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
