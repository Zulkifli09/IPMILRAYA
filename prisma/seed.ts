import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create initial Admin User
  const adminEmail = 'admin@ipmil.org'
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('password123', 10)
    const admin = await prisma.user.create({
      data: {
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      }
    })
    console.log(`Created admin user: ${admin.email}`)
  } else {
    console.log('Admin user already exists.')
  }

  // Create Organization Profile if empty
  const profileCount = await prisma.organizationProfile.count()
  if (profileCount === 0) {
    await prisma.organizationProfile.create({
      data: {
        name: 'Ikatan Pelajar Mahasiswa Indonesia',
        shortName: 'IPMIL',
        description: '<p>Organisasi kemahasiswaan yang berdedikasi tinggi...</p>',
        foundedDate: new Date('1990-01-01'),
        email: 'info@ipmil.org',
        phone: '081234567890',
        address: 'Jl. Merdeka No. 1, Jakarta',
      }
    })
    console.log('Created default organization profile.')
  }

  console.log('Seeding finished.')
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
