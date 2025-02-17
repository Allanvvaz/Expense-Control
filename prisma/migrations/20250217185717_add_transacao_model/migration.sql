/*
  Warnings:

  - You are about to drop the column `data` on the `Transacao` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `Transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('DESPESA', 'RECEITA');

-- AlterTable
ALTER TABLE "Transacao" DROP COLUMN "data",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Tipo" NOT NULL;
