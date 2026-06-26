import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { VerifyButtons } from "../verify-buttons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Detail Anggota | Dashboard",
};

export default async function DetailAnggotaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  notFound();

  const { id } = await params;
  const member = await prisma.member.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  const statusMap: Record<string, { label: string; variant: any }> = {
    PENDING: { label: "Menunggu Verifikasi", variant: "secondary" },
    ACCEPTED: { label: "Diterima", variant: "default" },
    REJECTED: { label: "Ditolak", variant: "destructive" },
  };
  const st = statusMap[member.status] || statusMap.PENDING;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/anggota">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Detail Pendaftaran Anggota</h1>
          <p className="text-muted-foreground">
            Review informasi lengkap calon anggota.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Pribadi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                  <p className="font-medium">{member.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status Pendaftaran</p>
                  <Badge variant={st.variant}>{st.label}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NIM / NIK / Instansi</p>
                  <p className="font-medium">{member.nim || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Angkatan / Tahun</p>
                  <p className="font-medium">{member.batch || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jurusan / Program Studi</p>
                  <p className="font-medium">{member.major || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Mendaftar</p>
                  <p className="font-medium">{formatDate(member.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak & Alamat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{member.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. WhatsApp</p>
                  <p className="font-medium">{member.whatsapp || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alamat Tempat Tinggal</p>
                <p className="font-medium whitespace-pre-wrap">{member.address || "-"}</p>
              </div>
            </CardContent>
          </Card>

          {member.status !== "PENDING" && (
            <Card>
              <CardHeader>
                <CardTitle>Hasil Verifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Verifikasi</p>
                  <p className="font-medium">{member.verifiedAt ? formatDate(member.verifiedAt) : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Catatan / Alasan</p>
                  <p className="font-medium">{member.notes || "Tidak ada catatan."}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto Profil / KTP</CardTitle>
            </CardHeader>
            <CardContent>
              {member.photo ? (
                <div className="relative h-64 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={member.photo}
                    alt="Foto Anggota"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                  Tidak ada foto terlampir
                </div>
              )}
            </CardContent>
          </Card>

          {member.status === "PENDING" && (
            <Card>
              <CardHeader>
                <CardTitle>Aksi Verifikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <VerifyButtons memberId={member.id} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
