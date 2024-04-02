import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 123},
    update: {},
    create: {
      id: 123,
      email: "test@test.com",
      name: "Test User",
      password: "password"
    }
  })
  console.log(user)
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })