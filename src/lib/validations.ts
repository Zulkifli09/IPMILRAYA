import { z } from "zod";

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.literal("ADMIN").default("ADMIN"),
});

// ============================================================================
// ORGANIZATION SCHEMAS
// ============================================================================

export const organizationProfileSchema = z.object({
  name: z.string().min(1, "Nama organisasi wajib diisi"),
  shortName: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  foundedDate: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  mapEmbed: z.string().optional(),
});

export const visionMissionSchema = z.object({
  vision: z.string().min(1, "Visi wajib diisi"),
  missions: z.array(z.string().min(1, "Misi tidak boleh kosong")),
});

export const historySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
  year: z.string().optional(),
  image: z.string().optional(),
  order: z.number().int().default(0),
});

// ============================================================================
// STRUCTURE SCHEMAS
// ============================================================================

export const organizationalStructureSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  position: z.string().min(1, "Jabatan wajib diisi"),
  image: z.string().optional(),
  order: z.number().int().default(0),
  period: z.string().optional(),
  parentId: z.string().optional().nullable(),
});

// ============================================================================
// MANAGEMENT SCHEMAS
// ============================================================================

export const managementSchema = z.object({
  userId: z.string().optional().nullable(),
  name: z.string().min(1, "Nama wajib diisi"),
  position: z.string().min(1, "Jabatan wajib diisi"),
  period: z.string().min(1, "Periode wajib diisi"),
  image: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

// ============================================================================
// DIVISION SCHEMAS
// ============================================================================

export const divisionSchema = z.object({
  name: z.string().min(1, "Nama divisi wajib diisi"),
  slug: z.string().optional(),
  description: z.string().optional(),
  duties: z.string().optional(),
  image: z.string().optional(),
  leaderId: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const divisionMemberSchema = z.object({
  divisionId: z.string().min(1, "Divisi wajib dipilih"),
  userId: z.string().optional().nullable(),
  name: z.string().min(1, "Nama wajib diisi"),
  position: z.string().optional(),
});

// ============================================================================
// WORK PROGRAM SCHEMAS
// ============================================================================

export const workProgramSchema = z.object({
  name: z.string().min(1, "Nama program wajib diisi"),
  description: z.string().optional(),
  divisionId: z.string().optional().nullable(),
  period: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().default("planned"),
  order: z.number().int().default(0),
});

// ============================================================================
// NEWS SCHEMAS
// ============================================================================

export const newsSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().optional(),
  thumbnail: z.string().optional(),
  content: z.string().min(1, "Konten wajib diisi"),
  excerpt: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

// ============================================================================
// ACTIVITY SCHEMAS
// ============================================================================

export const activitySchema = z.object({
  name: z.string().min(1, "Nama kegiatan wajib diisi"),
  slug: z.string().optional(),
  description: z.string().optional(),
  date: z.string().min(1, "Tanggal wajib diisi"),
  endDate: z.string().optional(),
  location: z.string().optional(),
  poster: z.string().optional(),
  documentation: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

// ============================================================================
// GALLERY SCHEMAS
// ============================================================================

export const gallerySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().optional(),
  fileUrl: z.string().min(1, "File wajib diupload"),
  fileType: z.string().default("image"),
  divisionId: z.string().optional().nullable(),
  date: z.string().optional(),
  order: z.number().int().default(0),
});

// ============================================================================
// MEMBER SCHEMAS
// ============================================================================

export const membershipApplicationSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  nim: z.string().optional(),
  major: z.string().optional(),
  batch: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  photo: z.string().optional(),
});

// ============================================================================
// CONTACT SCHEMAS
// ============================================================================

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

// ============================================================================
// SOCIAL MEDIA SCHEMAS
// ============================================================================

export const socialMediaSchema = z.object({
  platform: z.string().min(1, "Platform wajib diisi"),
  url: z.string().url("URL tidak valid"),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

// ============================================================================
// BANNER SCHEMAS
// ============================================================================

export const homepageBannerSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  image: z.string().min(1, "Gambar wajib diupload"),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

// ============================================================================
// USER SCHEMAS
// ============================================================================

export const userSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  role: z.literal("ADMIN").default("ADMIN"),
  phone: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
});

// ============================================================================
// SETTINGS SCHEMAS
// ============================================================================

export const settingSchema = z.object({
  key: z.string().min(1, "Key wajib diisi"),
  value: z.string(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type LoginInput = z.input<typeof loginSchema>;
export type RegisterInput = z.input<typeof registerSchema>;
export type OrganizationProfileInput = z.input<typeof organizationProfileSchema>;
export type VisionMissionInput = z.input<typeof visionMissionSchema>;
export type HistoryInput = z.input<typeof historySchema>;
export type OrganizationalStructureInput = z.input<typeof organizationalStructureSchema>;
export type ManagementInput = z.input<typeof managementSchema>;
export type DivisionInput = z.input<typeof divisionSchema>;
export type DivisionMemberInput = z.input<typeof divisionMemberSchema>;
export type WorkProgramInput = z.input<typeof workProgramSchema>;
export type NewsInput = z.input<typeof newsSchema>;
export type ActivityInput = z.input<typeof activitySchema>;
export type GalleryInput = z.input<typeof gallerySchema>;
export type MembershipApplicationInput = z.input<typeof membershipApplicationSchema>;
export type ContactMessageInput = z.input<typeof contactMessageSchema>;
export type SocialMediaInput = z.input<typeof socialMediaSchema>;
export type HomepageBannerInput = z.input<typeof homepageBannerSchema>;
export type UserInput = z.input<typeof userSchema>;
export type UpdateProfileInput = z.input<typeof updateProfileSchema>;
export type SettingInput = z.input<typeof settingSchema>;
