# 🍜 Antrian Order F&B

Aplikasi display antrian pesanan F&B berbasis web (PWA) — bisa diinstall di HP & PC seperti aplikasi biasa.

## Fitur
- ✅ Display antrian: Menunggu → Memasak → Siap Diambil
- 📺 Mode TV Fullscreen untuk monitor/layar besar
- ➕ Tambah & kelola pesanan secara real-time
- 📱 Bisa diinstall sebagai PWA (tanpa app store)
- 🕐 Jam real-time & ticker berjalan

---

## 🚀 Deploy ke Vercel (5 menit)

### Langkah 1 — Upload ke GitHub
1. Buat akun di [github.com](https://github.com) (gratis)
2. Klik **New repository** → beri nama `fb-queue-app`
3. Upload semua file dari folder ini
   - Bisa drag & drop lewat browser di halaman repo

### Langkah 2 — Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) → **Sign up with GitHub**
2. Klik **Add New Project**
3. Pilih repo `fb-queue-app`
4. Klik **Deploy** — selesai! (~1 menit)
5. Vercel otomatis kasih URL seperti: `https://fb-queue-app.vercel.app`

### Langkah 3 — Install sebagai PWA di HP
1. Buka URL di Chrome/Safari
2. Tap ikon **"Tambahkan ke Layar Utama"** / **"Install App"**
3. App muncul di home screen seperti app biasa!

---

## 💻 Jalankan Secara Lokal

```bash
npm install
npm run dev
```
Buka `http://localhost:3000`

---

## Struktur File
```
fb-queue-app/
├── src/app/
│   ├── layout.js       # Root layout + PWA meta
│   ├── page.js         # Halaman utama
│   └── QueueApp.js     # Komponen utama
├── public/
│   └── manifest.json   # PWA manifest
├── package.json
└── next.config.js
```
