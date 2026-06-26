"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  managementSchema,
  divisionSchema,
  divisionMemberSchema,
  workProgramSchema,
  gallerySchema,
  membershipApplicationSchema,
  contactMessageSchema,
  userSchema,
  type ManagementInput,
  type DivisionInput,
  type DivisionMemberInput,
  type WorkProgramInput,
  type GalleryInput,
  type MembershipApplicationInput,
  type ContactMessageInput,
  type UserInput,
} from "@/lib/validations";
import { slugify } from "@/lib/utils";
import bcrypt from "bcryptjs";

// ============================================================================
// MANAGEMENT ACTIONS
// ============================================================================

export async function getManagements() {
  return prisma.management.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: { user: { select: { name: true, image: true } } },
  });
}

export async function createManagement(data: ManagementInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = managementSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.management.create({ data: validated.data });
  revalidatePath("/pengurus");
  revalidatePath("/dashboard/pengurus");
  return { success: true };
}

export async function updateManagement(id: string, data: ManagementInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = managementSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.management.update({ where: { id }, data: validated.data });
  revalidatePath("/pengurus");
  revalidatePath("/dashboard/pengurus");
  return { success: true };
}

export async function deleteManagement(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  await prisma.management.delete({ where: { id } });
  revalidatePath("/pengurus");
  revalidatePath("/dashboard/pengurus");
  return { success: true };
}

// ============================================================================
// DIVISION ACTIONS
// ============================================================================

export async function getDivisions() {
  return prisma.division.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { members: true, workPrograms: true } } },
  });
}

export async function getDivisionBySlug(slug: string) {
  return prisma.division.findUnique({
    where: { slug },
    include: {
      members: { include: { user: { select: { name: true, image: true } } } },
      workPrograms: true,
      galleries: { orderBy: { createdAt: "desc" }, take: 12 },
    },
  });
}

export async function createDivision(data: DivisionInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = divisionSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  const slug = validated.data.slug || slugify(validated.data.name);

  await prisma.division.create({ data: { ...validated.data, slug } });
  revalidatePath("/divisi");
  revalidatePath("/dashboard/divisi");
  return { success: true };
}

export async function updateDivision(id: string, data: DivisionInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = divisionSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  const slug = validated.data.slug || slugify(validated.data.name);

  await prisma.division.update({ where: { id }, data: { ...validated.data, slug } });
  revalidatePath("/divisi");
  revalidatePath(`/divisi/${slug}`);
  revalidatePath("/dashboard/divisi");
  return { success: true };
}

export async function deleteDivision(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  await prisma.division.delete({ where: { id } });
  revalidatePath("/divisi");
  revalidatePath("/dashboard/divisi");
  return { success: true };
}

// ============================================================================
// DIVISION MEMBER ACTIONS
// ============================================================================

export async function addDivisionMember(data: DivisionMemberInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = divisionMemberSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.divisionMember.create({ data: validated.data });
  revalidatePath("/divisi");
  revalidatePath("/dashboard/divisi");
  return { success: true };
}

export async function removeDivisionMember(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.divisionMember.delete({ where: { id } });
  revalidatePath("/divisi");
  revalidatePath("/dashboard/divisi");
  return { success: true };
}

// ============================================================================
// WORK PROGRAM ACTIONS
// ============================================================================

export async function getWorkPrograms() {
  return prisma.workProgram.findMany({
    orderBy: { order: "asc" },
    include: { division: { select: { name: true } } },
  });
}

export async function createWorkProgram(data: WorkProgramInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = workProgramSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.workProgram.create({
    data: {
      ...validated.data,
      startDate: validated.data.startDate ? new Date(validated.data.startDate) : null,
      endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
    },
  });
  revalidatePath("/tentang/program-kerja");
  revalidatePath("/dashboard/program-kerja");
  return { success: true };
}

export async function updateWorkProgram(id: string, data: WorkProgramInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const validated = workProgramSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.workProgram.update({
    where: { id },
    data: {
      ...validated.data,
      startDate: validated.data.startDate ? new Date(validated.data.startDate) : null,
      endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
    },
  });
  revalidatePath("/tentang/program-kerja");
  revalidatePath("/dashboard/program-kerja");
  return { success: true };
}

export async function deleteWorkProgram(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  await prisma.workProgram.delete({ where: { id } });
  revalidatePath("/tentang/program-kerja");
  revalidatePath("/dashboard/program-kerja");
  return { success: true };
}

// ============================================================================
// GALLERY ACTIONS
// ============================================================================

export async function getGalleries(page = 1, limit = 20) {
  const [items, total] = await Promise.all([
    prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { division: { select: { name: true } } },
    }),
    prisma.gallery.count(),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function createGallery(data: GalleryInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = gallerySchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.gallery.create({
    data: {
      ...validated.data,
      date: validated.data.date ? new Date(validated.data.date) : new Date(),
    },
  });
  revalidatePath("/galeri");
  revalidatePath("/dashboard/galeri");
  return { success: true };
}

export async function deleteGallery(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.gallery.delete({ where: { id } });
  revalidatePath("/galeri");
  revalidatePath("/dashboard/galeri");
  return { success: true };
}

// ============================================================================
// MEMBER ACTIONS
// ============================================================================

export async function getMembers(page = 1, limit = 20, status?: string) {
  const where = status ? { status: status as any } : {};
  const [items, total] = await Promise.all([
    prisma.member.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.member.count({ where }),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function submitMembershipApplication(data: MembershipApplicationInput) {
  return { error: "Pendaftaran anggota sudah dinonaktifkan." };
}

export async function verifyMember(id: string, status: "ACCEPTED" | "REJECTED", notes?: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) return { error: "Anggota tidak ditemukan" };

  const updateData: any = {
    status,
    verifiedAt: new Date(),
    verifiedBy: session.user.id,
    notes,
  };

  // If accepted, create a user account
  if (status === "ACCEPTED") {
    const existingUser = await prisma.user.findUnique({ where: { email: member.email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("member123", 10);
      const user = await prisma.user.create({
        data: {
          name: member.fullName,
          email: member.email,
          password: hashedPassword,
          role: "ADMIN",
          phone: member.whatsapp,
          image: member.photo,
        },
      });
      updateData.userId = user.id;
    } else {
      updateData.userId = existingUser.id;
    }
  }

  await prisma.member.update({ where: { id }, data: updateData });
  revalidatePath("/dashboard/anggota");
  return { success: true };
}

export async function deleteMember(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  await prisma.member.delete({ where: { id } });
  revalidatePath("/dashboard/anggota");
  return { success: true };
}

// ============================================================================
// CONTACT MESSAGE ACTIONS
// ============================================================================

export async function getContactMessages(page = 1, limit = 20) {
  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contactMessage.count(),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function submitContactMessage(data: ContactMessageInput) {
  const validated = contactMessageSchema.safeParse(data);
  if (!validated.success) return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };

  await prisma.contactMessage.create({ data: validated.data });
  return { success: true, message: "Pesan berhasil dikirim!" };
}

export async function toggleMessageReadStatus(id: string, isRead: boolean) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/dashboard/pesan");
  return { success: true };
}

export async function deleteContactMessage(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/dashboard/pesan");
  return { success: true };
}

// ============================================================================
// USER MANAGEMENT ACTIONS
// ============================================================================

export async function getUsers(page = 1, limit = 20) {
  const [items, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function updateUser(id: string, data: Partial<UserInput>) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  const updateData: any = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  } else {
    delete updateData.password;
  }

  await prisma.user.update({ where: { id }, data: updateData });
  revalidatePath("/dashboard/pengguna");
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized" };

  if (id === session.user.id) return { error: "Tidak bisa menghapus akun sendiri" };

  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard/pengguna");
  return { success: true };
}
