import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const oldPrisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.OLD_DATABASE_URL
	})
});

export default oldPrisma;
