# PT Neuro Sains Inti Technology ID — Next.js Landing Page

Migrasi final dari React/Vite ke Next.js App Router. Tampilan, redaksi, background, side menu, popup Galeri Kehidupan, inner scroll, dan behavior utama dipertahankan.

Patch keamanan terbaru: Next.js dinaikkan ke `15.5.9` untuk menghindari blokir Vercel pada versi Next.js yang rentan.

## Jalankan Lokal

```bash
npm ci --no-audit --no-fund
npm run dev
```

Buka `http://localhost:3000`.

## Build Lokal

```bash
npm run build
npm run start
```

## Deploy ke Vercel

Gunakan setting:

```txt
Framework Preset: Next.js
Install Command: npm ci --no-audit --no-fund
Build Command: npm run build
Output Directory: kosongkan / default
Node.js Version: 20.x
```

Kalau sebelumnya pernah gagal deploy, lakukan:

```txt
Redeploy → Clear Build Cache
```

## Struktur Penting

```txt
app/layout.jsx                Metadata, viewport, dan import CSS global
app/page.jsx                  Halaman utama
app/globals.css               Semua styling landing page
components/NeuroLanding.jsx   Konten, menu, section, popup, form, dan galeri
public/assets/                Background dan logo
```

## Ganti Gambar Background

Ganti file dengan nama yang sama di `public/assets/`:

```txt
neuro-01-vision.png
neuro-02-research.png
neuro-03-ai-neuroscience.png
neuro-04-wellness.png
neuro-05-future.png
logo-butterfly.png
```

## Ganti Link WhatsApp dan Email

Buka `components/NeuroLanding.jsx`, cari:

```js
const COMPANY_EMAIL = 'corporate@neurotech.id';
const COMPANY_WHATSAPP = '6281234567890';
```

Ganti sesuai email dan nomor WhatsApp perusahaan.

## Ganti Link Personal / E-Course

Pada `components/NeuroLanding.jsx`, cari bagian `SafeSpaceSection`, lalu ubah:

```jsx
<a className="line-button" href="#galeri-kehidupan">Buka Galeri E-Course</a>
```

## Ganti Video YouTube Musik Rekomendasi

Cari fungsi `YouTubeBox()`, lalu ganti URL embed YouTube.

## Catatan Migrasi

- Project sudah menggunakan Next.js App Router.
- Komponen utama memakai `'use client'` karena ada menu, popup, form, dan slider.
- Auto scroll tetap mati.
- Pindah halaman tetap hanya via menu kanan.
- Section panjang memakai inner scroll agar background tetap full-screen.

## Dokumentasi Teknis

Setiap patch berikutnya sebaiknya dicatat di README ini agar pengembangan berikutnya tetap rapi dan mudah dilanjutkan.
