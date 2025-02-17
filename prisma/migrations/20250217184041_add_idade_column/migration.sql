/*
  Warnings:

  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Pessoa` table. All the data in the column will be lost.
  - The `id` column on the `Pessoa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `idade` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pessoaId` on the `Transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_pessoaId_fkey";

-- DropIndex
DROP INDEX "Pessoa_email_key";

-- AlterTable
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_pkey",
DROP COLUMN "email",
ADD COLUMN     "idade" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transacao" DROP COLUMN "pessoaId",
ADD COLUMN     "pessoaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
