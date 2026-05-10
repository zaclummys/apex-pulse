/*
  Warnings:

  - You are about to drop the column `salesforceId` on the `Deployment` table. All the data in the column will be lost.
  - You are about to drop the column `salesforceId` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `url` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Organization_salesforceId_key";

-- AlterTable
ALTER TABLE "DeployComponentFailure" ADD CONSTRAINT "DeployComponentFailure_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "DeployComponentFailure_id_key";

-- AlterTable
ALTER TABLE "DeployComponentSuccess" ADD CONSTRAINT "DeployComponentSuccess_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "DeployComponentSuccess_id_key";

-- AlterTable
ALTER TABLE "DeployTestFailure" ADD CONSTRAINT "DeployTestFailure_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "DeployTestFailure_id_key";

-- AlterTable
ALTER TABLE "DeployTestSuccess" ADD CONSTRAINT "DeployTestSuccess_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "DeployTestSuccess_id_key";

-- AlterTable
ALTER TABLE "Deployment" DROP COLUMN "salesforceId";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "salesforceId",
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
