"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMembers() {
  const session = await auth();
  if (!session?.user) return null;

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    // Check total users
    const totalUsers = await prisma.user.count();
    console.log(`Total users: ${totalUsers}`);

    // Check specific user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { member: true },
    });

    console.log("User details:", user);

    return user?.member || null;
  } catch (error) {
    console.error("Error in getMemberByUserId:", error);
    return null;
  }
}
