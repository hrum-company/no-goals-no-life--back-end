import { PrismaClient, GoalMark } from '@prisma/client'
const prisma = new PrismaClient()

const marksSeeds: { id: number; title: string; icon: string }[] = [
  {
    id: 1,
    title: 'Цель жизни',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'Воля воина',
    icon: '🥋',
  },
  {
    id: 3,
    title: 'Ради мамы',
    icon: '👵',
  },
  {
    id: 4,
    title: 'Во имя отца',
    icon: '👴',
  },
  {
    id: 5,
    title: 'Egoisto',
    icon: '🐺',
  },
  {
    id: 6,
    title: 'Ты бы не вывез',
    icon: '😮‍💨',
  },
  {
    id: 7,
    title: 'Мужское',
    icon: '💪',
  },
  {
    id: 8,
    title: 'Женское',
    icon: '💅',
  },
]

async function main() {
  const marks: GoalMark[] = []
  for (const { id, ...markData } of marksSeeds) {
    marks.push(
      await prisma.goalMark.upsert({
        where: { id },
        update: markData,
        create: markData,
      })
    )
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
