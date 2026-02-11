-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "isBanned" BOOLEAN DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT DEFAULT 'user';
