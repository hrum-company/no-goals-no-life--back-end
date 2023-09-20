-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "markId" INTEGER;

-- CreateTable
CREATE TABLE "GoalMark" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "GoalMark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_markId_fkey" FOREIGN KEY ("markId") REFERENCES "GoalMark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
