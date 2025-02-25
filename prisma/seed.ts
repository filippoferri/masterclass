    import { PrismaClient } from "@prisma/client";
    import bcrypt from "bcryptjs";

    const prisma = new PrismaClient();

    async function main() {
    // 1) Hash the password
    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    // 2) Upsert the admin user
    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
        email: "admin@example.com",
        password: hashedPassword, // store hashed version
        role: "ADMIN",
        },
    });

    console.log("Admin user seeded");
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });