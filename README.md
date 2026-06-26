# IPMIL - Sistem Informasi & Manajemen Organisasi

Sistem Informasi dan Manajemen Organisasi (IPMIL) adalah platform web modern yang dibangun untuk memfasilitasi kebutuhan publikasi informasi (berita, kegiatan, galeri) serta kebutuhan internal manajemen (data anggota, pengurus, program kerja, pesan masuk).

Dibangun menggunakan Next.js (App Router), TypeScript, Tailwind CSS, Shadcn/UI, Prisma ORM, dan PostgreSQL.

## Fitur Utama

### 1. Halaman Publik
- **Beranda**: Menampilkan cuplikan profil, statistik, berita terbaru, dan kegiatan mendatang.
- **Tentang**: Sejarah organisasi, visi misi, struktur organisasi, dan program kerja.
- **Berita & Galeri**: Publikasi artikel dan dokumentasi acara.
- **Pendaftaran Anggota**: Formulir online untuk calon anggota baru dengan fitur upload foto.
- **Kontak**: Formulir pengaduan atau pesan yang terhubung langsung ke dashboard.
- **Dark Mode**: Dukungan mode gelap dan terang.

### 2. Dashboard Admin (CMS)
- **Manajemen Konten**: Kelola profil, visi misi, sejarah, struktur, berita, dan galeri.
- **Manajemen Keanggotaan**: Verifikasi pendaftaran anggota baru, ubah status anggota.
- **Manajemen Pengurus & Divisi**: Kelola daftar pengurus, bio, dan pembagian divisi.
- **Manajemen Program Kerja & Kegiatan**: Kelola proker per divisi beserta detail kegiatannya.
- **Manajemen Pesan**: Kotak masuk (inbox) pesan dari form kontak publik.
- **Manajemen Pengguna**: Tambah dan kelola akses akun admin ke dashboard.

---

## Persyaratan Sistem

- Node.js versi 18+ atau 20+
- PostgreSQL database
- Akun Cloudinary (untuk penyimpanan gambar)

## Cara Instalasi & Menjalankan (Local Development)

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Pengaturan Environment Variables
Duplikat file `.env.local` menjadi `.env` dan sesuaikan nilainya:
```bash
cp .env.local .env
```

**Konfigurasi Penting di `.env`:**
- `DATABASE_URL`: Connection string PostgreSQL Anda (contoh: dari Supabase, Neon, atau local).
- `AUTH_SECRET`: Generate secret key acak (bisa menggunakan `npx auth secret` atau openssl rand).
- `NEXT_PUBLIC_CLOUDINARY_*` dan `CLOUDINARY_*`: Dapatkan dari dashboard Cloudinary Anda.

### 3. Migrasi Database & Seeding
Setelah `DATABASE_URL` terhubung ke database PostgreSQL yang aktif, jalankan:
```bash
npx prisma db push
npm run prisma db seed
```
*Perintah `seed` akan otomatis membuat akun admin default (`admin@ipmil.org` / `password123`) dan data profil awal.*

### 4. Jalankan Server Development
```bash
npm run dev
```
Akses website di `http://localhost:3000`. Akses dashboard admin di `http://localhost:3000/login`.

---

## Panduan Deployment ke Vercel

Aplikasi ini sudah dioptimasi untuk deployment di [Vercel](https://vercel.com).

1. Buat project baru di Vercel dan hubungkan dengan repository GitHub aplikasi ini.
2. Pada bagian **Environment Variables**, masukkan seluruh key yang ada di `.env`.
   - Pastikan `DATABASE_URL` mengarah ke production database (sebaiknya gunakan connection pool).
   - Pastikan `AUTH_URL` disesuaikan dengan domain Vercel Anda (misal: `https://ipmil.vercel.app`).
3. Vercel akan secara otomatis mendeteksi framework Next.js dan menjalankan `npm run build`.
4. Jika build berhasil namun database belum termigrasi, Anda dapat menambahkan *Build Command* di Vercel: `npx prisma generate && npx prisma db push && npm run build`.

## Lisensi
Hak Cipta © 2026 IPMIL. Seluruh hak cipta dilindungi undang-undang.
