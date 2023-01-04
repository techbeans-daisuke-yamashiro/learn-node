import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/authUtils';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      email: 'alice@prisma.io'
    },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: hashPassword('password')
    },
  })
  const jack = await prisma.user.upsert({
    where: {
      email: 'jack@prisma.io'
    },
    update: {},
    create: {
      name: 'Jack',
      email: 'jack@prisma.io',
      password: hashPassword('password')
    },
  })
  const yumi = await prisma.user.upsert({
    where:{
      email: 'yumi@prisma.io'
    },
    update: {},
    create: {
      name: 'Yumi',
      email: 'yumi@prisma.io',
      password: hashPassword('password')
      }
    })
  var users = await prisma.user.findMany()
  console.log(users)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });