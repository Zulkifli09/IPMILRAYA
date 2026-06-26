"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  newsSchema,
  activitySchema,
  type NewsInput,
  type ActivityInput,
} from "@/lib/validations";
import { slugify } from "@/lib/utils";

// ============================================================================
// NEWS ACTIONS
// ============================================================================

export async function getNews(page = 1, limit = 10, status?: string) {
  const where = status ? { status: status as any } : {};
  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      include: { author: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.news.count({ where }),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function getNewsById(id: string) {
  return prisma.news.findUnique({
    where: { id },
    include: { author: { select: { name: true, image: true } } },
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.news.findUnique({
    where: { slug },
    include: { author: { select: { name: true, image: true } } },
  });
}

export async function createNews(data: NewsInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = newsSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const slug = validated.data.slug || slugify(validated.data.title);
  
  // Check slug uniqueness
  const existingSlug = await prisma.news.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

  await prisma.news.create({
    data: {
      ...validated.data,
      slug: finalSlug,
      authorId: session.user.id,
      publishedAt: validated.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/dashboard/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  return { success: true };
}

export async function updateNews(id: string, data: NewsInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = newsSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) return { error: "Berita tidak ditemukan" };

  const slug = validated.data.slug || slugify(validated.data.title);
  const existingSlug = await prisma.news.findFirst({ where: { slug, NOT: { id } } });
  const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

  await prisma.news.update({
    where: { id },
    data: {
      ...validated.data,
      slug: finalSlug,
      publishedAt:
        validated.data.status === "PUBLISHED" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
    },
  });

  revalidatePath("/dashboard/berita");
  revalidatePath("/berita");
  revalidatePath(`/berita/${finalSlug}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteNews(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.news.delete({ where: { id } });
  revalidatePath("/dashboard/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  return { success: true };
}

// ============================================================================
// ACTIVITY ACTIONS
// ============================================================================

export async function getActivities(page = 1, limit = 10, status?: string) {
  const where = status ? { status: status as any } : {};
  const [items, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      include: { author: { select: { name: true, image: true } } },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.activity.count({ where }),
  ]);
  return { items, total, pages: Math.ceil(total / limit) };
}

export async function getActivityById(id: string) {
  return prisma.activity.findUnique({
    where: { id },
    include: { author: { select: { name: true, image: true } } },
  });
}

export async function getActivityBySlug(slug: string) {
  return prisma.activity.findUnique({
    where: { slug },
    include: { author: { select: { name: true, image: true } } },
  });
}

export async function createActivity(data: ActivityInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = activitySchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const slug = validated.data.slug || slugify(validated.data.name);
  const existingSlug = await prisma.activity.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

  await prisma.activity.create({
    data: {
      ...validated.data,
      slug: finalSlug,
      date: new Date(validated.data.date),
      endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
      authorId: session.user.id,
      publishedAt: validated.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/dashboard/kegiatan");
  revalidatePath("/kegiatan");
  revalidatePath("/");
  return { success: true };
}

export async function updateActivity(id: string, data: ActivityInput) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = activitySchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing) return { error: "Kegiatan tidak ditemukan" };

  const slug = validated.data.slug || slugify(validated.data.name);
  const existingSlug = await prisma.activity.findFirst({ where: { slug, NOT: { id } } });
  const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

  await prisma.activity.update({
    where: { id },
    data: {
      ...validated.data,
      slug: finalSlug,
      date: new Date(validated.data.date),
      endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
      publishedAt:
        validated.data.status === "PUBLISHED" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
    },
  });

  revalidatePath("/dashboard/kegiatan");
  revalidatePath("/kegiatan");
  revalidatePath(`/kegiatan/${finalSlug}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteActivity(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.activity.delete({ where: { id } });
  revalidatePath("/dashboard/kegiatan");
  revalidatePath("/kegiatan");
  revalidatePath("/");
  return { success: true };
}
