"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: "Email atau password tidak valid" };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah." };
        case "CallbackRouteError":
          return { error: "Error pada server otentikasi. Silakan matikan dan nyalakan ulang server Anda (CTRL+C lalu npm run dev kembali)." };
        default:
          return { error: "Terjadi kesalahan pada sistem otentikasi." };
      }
    }
    // Wajib di-throw ulang jika error bukan berasal dari AuthError (seperti NEXT_REDIRECT)
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function createUserAction(data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });

  if (existingUser) {
    return { error: "Email sudah terdaftar" };
  }

  const hashedPassword = await bcrypt.hash(validated.data.password, 10);

  await prisma.user.create({
    data: {
      name: validated.data.name,
      email: validated.data.email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return { success: true };
}

export async function updateUserProfile(data: any) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "User not found" };

  if (data.newPassword) {
    if (!data.currentPassword) return { error: "Current password required" };
    const isValid = await bcrypt.compare(data.currentPassword, user.password!);
    if (!isValid) return { error: "Password lama tidak sesuai" };
    
    data.password = await bcrypt.hash(data.newPassword, 10);
  }

  const updateData: any = {
    name: data.name,
    email: data.email,
  };
  
  if (data.password) updateData.password = data.password;

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  });

  return { success: true };
}
