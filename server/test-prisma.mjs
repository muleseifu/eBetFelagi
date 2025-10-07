import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Prisma connected OK');
    // try a simple query
    try {
      const count = await prisma.residency.count();
      console.log('Residency count:', count);
    } catch (qErr) {
      console.error('Query error (collection may be empty or schema mismatch):', qErr.message || qErr);
    }
  } catch (err) {
    console.error('Prisma connection error:', err.message || err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
