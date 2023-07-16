import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

//import { customSeed } from './customSeed';
import Role from 'src/common/enums/role.enum';

if (require.main === module) {
  dotenv.config();

  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info('Seeding database...');

  const client = new PrismaClient();
  await client.user.upsert({
    where: { username: 'super' },
    update: {},
    create: {
      username: 'super',
      fname: 'Administrator',
      password: await argon.hash('super123'),
      role: Role.SHOPADMIN,
      Wallet: {
        create: {
          amount: 0,
        },
      },
    },
  });
  void client.$disconnect();

  // console.info('Seeding database with custom seed...');
  // customSeed();

  console.info('Seeded database successfully');
}
