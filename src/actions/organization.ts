"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  organizationProfileSchema,
  visionMissionSchema,
  historySchema,
  organizationalStructureSchema,
  homepageBannerSchema,
  socialMediaSchema,
  settingSchema,
  type OrganizationProfileInput,
  type VisionMissionInput,
  type HistoryInput,
  type OrganizationalStructureInput,
  type HomepageBannerInput,
  type SocialMediaInput,
} from "@/lib/validations";

// ============================================================================
// ORGANIZATION PROFILE ACTIONS
// ============================================================================

export async function getOrganizationProfile() {
  return prisma.organizationProfile.findFirst();
}

export async function updateOrganizationProfile(data: OrganizationProfileInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = organizationProfileSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const existing = await prisma.organizationProfile.findFirst();

  if (existing) {
    await prisma.organizationProfile.update({
      where: { id: existing.id },
      data: {
        ...validated.data,
        foundedDate: validated.data.foundedDate
          ? new Date(validated.data.foundedDate)
          : null,
      },
    });
  } else {
    await prisma.organizationProfile.create({
      data: {
        ...validated.data,
        foundedDate: validated.data.foundedDate
          ? new Date(validated.data.foundedDate)
          : null,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/tentang");
  revalidatePath("/kontak");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

// ============================================================================
// VISION MISSION ACTIONS
// ============================================================================

export async function getVisionMission() {
  return prisma.visionMission.findFirst();
}

export async function updateVisionMission(data: VisionMissionInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = visionMissionSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  const existing = await prisma.visionMission.findFirst();

  if (existing) {
    await prisma.visionMission.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.visionMission.create({ data: validated.data });
  }

  revalidatePath("/");
  revalidatePath("/tentang/visi-misi");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

// ============================================================================
// HISTORY ACTIONS
// ============================================================================

export async function getHistories() {
  return prisma.history.findMany({ orderBy: { order: "asc" } });
}

export async function createHistory(data: HistoryInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = historySchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.history.create({ data: validated.data });
  revalidatePath("/tentang/sejarah");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

export async function updateHistory(id: string, data: HistoryInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = historySchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.history.update({ where: { id }, data: validated.data });
  revalidatePath("/tentang/sejarah");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

export async function deleteHistory(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.history.delete({ where: { id } });
  revalidatePath("/tentang/sejarah");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

// ============================================================================
// ORGANIZATIONAL STRUCTURE ACTIONS
// ============================================================================

export async function getOrganizationalStructures() {
  return prisma.organizationalStructure.findMany({
    orderBy: { order: "asc" },
    include: { children: { orderBy: { order: "asc" } } },
  });
}

export async function createOrganizationalStructure(data: OrganizationalStructureInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = organizationalStructureSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.organizationalStructure.create({ data: validated.data });
  revalidatePath("/tentang/struktur");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

export async function updateOrganizationalStructure(
  id: string,
  data: OrganizationalStructureInput
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = organizationalStructureSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.organizationalStructure.update({ where: { id }, data: validated.data });
  revalidatePath("/tentang/struktur");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

export async function deleteOrganizationalStructure(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.organizationalStructure.delete({ where: { id } });
  revalidatePath("/tentang/struktur");
  revalidatePath("/dashboard/profil-organisasi");
  return { success: true };
}

// ============================================================================
// HOMEPAGE BANNER ACTIONS
// ============================================================================

export async function getHomepageBanners() {
  return prisma.homepageBanner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllHomepageBanners() {
  return prisma.homepageBanner.findMany({ orderBy: { order: "asc" } });
}

export async function createHomepageBanner(data: HomepageBannerInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = homepageBannerSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.homepageBanner.create({ data: validated.data });
  revalidatePath("/");
  revalidatePath("/dashboard/banner");
  return { success: true };
}

export async function updateHomepageBanner(id: string, data: HomepageBannerInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = homepageBannerSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.homepageBanner.update({ where: { id }, data: validated.data });
  revalidatePath("/");
  revalidatePath("/dashboard/banner");
  return { success: true };
}

export async function deleteHomepageBanner(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.homepageBanner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/banner");
  return { success: true };
}

// ============================================================================
// SOCIAL MEDIA ACTIONS
// ============================================================================

export async function getSocialMedias() {
  return prisma.socialMedia.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllSocialMedias() {
  return prisma.socialMedia.findMany({ orderBy: { order: "asc" } });
}

export async function upsertSocialMedia(data: SocialMediaInput) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const validated = socialMediaSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", details: validated.error.flatten().fieldErrors };
  }

  await prisma.socialMedia.upsert({
    where: { platform: validated.data.platform },
    update: validated.data,
    create: validated.data,
  });

  revalidatePath("/");
  revalidatePath("/kontak");
  revalidatePath("/dashboard/pengaturan");
  return { success: true };
}

export async function deleteSocialMedia(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.socialMedia.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kontak");
  revalidatePath("/dashboard/pengaturan");
  return { success: true };
}

// ============================================================================
// SETTINGS ACTIONS
// ============================================================================

export async function getSetting(key: string) {
  return prisma.setting.findUnique({ where: { key } });
}

export async function getSettings() {
  return prisma.setting.findMany();
}

export async function upsertSetting(key: string, value: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/pengaturan");
  return { success: true };
}

// ============================================================================
// STATS (for dashboard & public)
// ============================================================================

export async function getStats() {
  const [
    totalManagement,
    totalDivisions,
    totalWorkPrograms,
    totalActivities,
    totalNews,
    totalMessages,
    totalGalleries,
  ] = await Promise.all([
    prisma.management.count({ where: { isActive: true } }),
    prisma.division.count({ where: { isActive: true } }),
    prisma.workProgram.count(),
    prisma.activity.count({ where: { status: "PUBLISHED" } }),
    prisma.news.count({ where: { status: "PUBLISHED" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.gallery.count(),
  ]);

  return {
    totalManagement,
    totalDivisions,
    totalWorkPrograms,
    totalActivities,
    totalNews,
    totalMessages,
    totalGalleries,
  };
}
