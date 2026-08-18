# Petualangan Ajisaka — Daftar Tugas Pengembangan (P0–P3)

Prioritas berdasarkan `DESIGN_AND_DEV.md` §5 & `TIMELINE.md` W1–W11.
*Diperbarui setelah pembuatan (build) PoC M0+M1 (12-08-2026).*

**Skala prioritas**
- **P0 — Kritis:** Tanpa ini aplikasi tidak bisa dirilis / tidak bisa dimainkan.
- **P1 — Penting:** Wajib untuk peluncuran yang baik, dapat ditunda jika terdesak.
- **P2 — Peningkatan:** Nilai tambah setelah rilis inti stabil.
- **P3 — Masa depan:** Di luar cakupan MVP, direncanakan kemudian.

- [x] = selesai & terverifikasi (pembuatan/lint/pengujian hijau)
- [~] = sebagian / versi PoC / butuh kurasi

---

## P0 — Kritis (Rintisan rilis)

### Fondasi & kerangka — ✅ SELESAI (M0)
- [x] Perancah (Scaffold) Vite + TypeScript ketat + Tailwind v4 — `src/`
- [x] Token desain keraton (OKLCH) §9.2 — `src/src/index.css` (@theme)
- [x] Perutean hash: `/`, `/menu`, `/prolog`, `/level/1..3`, `/ending` — App.tsx
- [x] Halaman Beranda (judul + tombol MAIN) — FR-1.1 (Didesain ulang dengan UX yang menyenangkan)
- [x] Dasbor 5 menu dengan status terkunci/terbuka — FR-1.3, FR-1.4 (Didesain ulang dengan Kartu Level yang digamifikasi)
- [x] Manifes PWA + ikon (192/512/maskable/apple-touch) + dapat diinstal
- [ ] Finalisasi keputusan §20 (jumlah soal L1, isi set data, kerangka kerja ✅React, aset ilustrasi) — sebagian tetap terbuka

### Mesin Guratan (Stroke Engine) — PIVOT: DTW → GEOMETRI VEKTOR
- [x] Hook kanvas Kejadian Penunjuk (Pointer Events), HiDPI, `touch-action: none`, tinta-langsung — useCanvasCapture
- [x] Normalisasi + pengambilan sampel ulang (mesin/geometri) — dipakai untuk perenderan
- [x] Pencocok (Matcher) **Geometri Vektor (Jarak Chamfer)** — engine/raster.ts (Skala dinamis, mencegah eksploitasi coretan)
- [x] Uji pencocok sintetis (kotak/isi/meleset/bergeser) + 20 kontur mesin terbang (glyph) — vitest 8 pengujian
- [x] Umpan balik warna per guratan (hijau/kuning/merah) — §11.4
- [x] Kontrol Bersihkan — FR-3.6
- [x] Kalibrasi toleransi cakupan (CAKUPAN_LULUS/PERINGATAN) dengan uji tablet nyata — sudah dinamis berdasarkan luas/ketebalan mesin terbang (glyph)

### Konten
- [x] Set data Nglegena **20 kontur** (dari Noto Sans Javanese, terkoreksi-Y, 80-pt) — src/data/nglegena_contours.json
- [x] Set data Sandangan 8+ inti + kombinasi — §10.1 (Label & Lingkaran Putus-putus diperbaiki)
- [x] Set data Pasangan (20 pasang) — §10.1 (Berhasil diekstrak ulang secara penuh dengan perulangan melalui skrip Python FontTools)
- [x] Konfigurasi level L1–L3 bukti: set awal ha/na/ca/ra/ka; soal 11/20/3×5 belum terisi penuh — §10.2 (Set data penuh digunakan untuk L1-L3)
- [x] Salinan cerita Indonesia penuh (dari `NASKAH_AJISAKA.md`) ke tiap level — Selesai melalui lapisan i18n
- [x] Prakasai (Precache) fon Javanese (woff2, 89KB, dihosting sendiri) — FR-6.2
- [x] **Kurasi internal data guratan (panduan guratan pena asli)** — Keputusan: menggunakan rute raster/solid-fill murni yang lebih pemaaf bagi pengguna.

### Alur & status permainan
- [x] Jalur FSM Level: layar intro → latihan → halaman selesai
- [x] Hadiah Pedang Pusaka (L1) / Perisai Sakti (L2) / Raja (L3) — LevelSelesai
- [x] Acara "Dora bergabung" & "warga bergabung" (salinan) — LevelSelesai
- [x] Rantai pembukaan kunci + tombol Level Selanjutnya — FR-4.3
- [x] Menu pilihan interstitial Fase 1 / Fase 2 non-linear di Level 3 — FR-4.4 (Selesai, pelacakan terperinci per fase)
- [x] Akhir cerita dinobatkan sebagai Raja terhubung setelah L3 Fase 1 & 2 selesai — Selesai
- [x] Pertahankan kemajuan (Zustand persist): levelSelesai, faseSelesai, hadiah — FR-5.1
- [x] Lanjutkan level saat dimuat ulang — FR-5.2 (kemajuan tersimpan otomatis secara real-time dan di-restore tanpa prompt)
- [x] Latihan soal L1: mulai dari soal 1 → hadiah → level 2 dsb. (Dataset penuh khusus untuk tiap tingkatan telah diterapkan)

### Fitur Tambahan & Pemolesan UX — ✅ SELESAI
- [x] Pelokalan penuh: Indonesia, Inggris, Basa Jawa (Krama Inggil) melalui i18next + lapisan ekstraksi data
- [x] API Audio Web Gamelan mesin audio (Ombak, saron, gong ageng, keprak, parsial tidak selaras)
- [x] Sembunyikan bilah gulir (scrollbars) global untuk nuansa PWA layar penuh
- [x] Mengunci Orientasi Layar (Kunci PWA Potret)

### PWA & luring (offline)
- [x] Pekerja layanan (Workbox) prakasai penuh (~500 KB, 14 entri) — FR-6.2
- [x] Perbarui spanduk permintaan penyegaran — FR-6.3 (registerSW onNeedRefresh, diperbarui ke autoUpdate)
- [x] Uji coba bermain luring penuh di perangkat (Ikon iOS + user-scalable=no)

### Penjaminan Kualitas (QA) rilis
- [x] Pengujian unit pencocok/raster + geometri + dtw (8 pengujian) — vitest
- [ ] Cakupan ≥90% untuk mesin (target paket tambahan)
- [ ] Ujung-ke-Ujung (E2E) Playwright: Beranda→L1 selesai→L2 terbuka; muat ulang di tengah level
- [ ] Matriks perangkat (iPad, tablet Android, desktop) — §14

---

## P1 — Penting (Peluncuran berkualitas)

- [x] Partikel sukses per soal & hadiah (≤60 partikel) — §9.5 (Selesai melalui konfeti Anime.js)
- [x] Suara gamelan ringan (Audio Web) (mesin audio.ts selesai) — §12.2
- [x] Transisi antarmuka & animasi UI (menggunakan animejs dengan pantulan/berurutan)
- [x] Transisi salindia (slide) sinopsis (Prolog.tsx) — FR-2.2
- [x] Modal ucapan selamat/perangkap fokus — §9.7
- [x] Audit aksesibilitas (a11y) axe (P0 kritikal/serius = 0, kontras AA) — §16
- [x] Tautan lewati + pengumuman markah tanah + `:focus-visible` penuh — §16
- [x] Aksesibilitas (a11y) interaktif: Kanvas memiliki `aria-label`/deskripsi, modal ucapan selamat diperangkap fokus — §9.7
- [x] Dukungan papan ketik (salindia cerita, Enter/Spasi) — §16 (Selesai untuk Prolog, Latihan, Fase2, LevelSelesai)
- [x] Alternatif aksesibel untuk kanvas (deskripsi soal lengkap) — §16 (Ditambahkan via `aria-label` dan teks pembantu)
- [x] Optimasi bundel ≤1,5 MB + fon ≤600 KB (saat ini total prakasai ±500 KB) — §15
- [x] Pola 60fps saat menulis dengan panduan menyala (rAF + penskalaan dpr)— §15 (Diselesaikan via Dirty Checking canvas dan GPU Transforms)
- [x] Kanvas alih panduan (Tampilkan/Sembunyikan Contoh) — selesai, terverifikasi UX
- [ ] Emulasi luring Ujung-ke-Ujung (E2E) penuh (Playwright)

---

## P2 — Peningkatan (Setelah rilis inti stabil)

- [ ] Pengucapan fonem TTS + pelafalan nama aksara (lokal, digabung dengan suara)
- [x] Transliterasi teks → Aksara Jawa (masukan bebas) — Selesai melalui "Ketik Bebas"
- [ ] Set mesin terbang (glyph) lanjutan: Angka, Murda, Swara
- [ ] Peningkatan pencocok model → pengklasifikasi ML (ONNX/TFLite <500 KB) — §11.3
- [ ] Statistik per latihan tambahan (skor, waktu, coba lagi)
- [ ] Kuis pengetahuan cepat (bukan hanya menulis) sebagai penguat
- [ ] Mode bantuan ekstra anak kecil (petunjuk lebih besar, warna kontras tinggi)
- [x] Pengaturan volume dan bungkam (mute) terintegrasi pada layar Pengaturan
- [ ] Pengaturan lanjutan (mode kontras tinggi, ukuran teks)

---

## P3 — Masa depan (Di luar cakupan MVP)

- [x] Kontainerisasi Docker untuk hosting produksi yang mandiri
- [ ] Sinkronisasi awan (cloud) & laporan guru ("Laporan Guru") — §19
- [ ] Papan peringkat lokal/kelas + akun opsional — G5, §19
- [ ] APK Android melalui TWA; pembungkus iPad — §19
- [x] Multi-bahasa (Jawa–Indonesia–Inggris) — Selesai (i18n ditambahkan ke MVP)
- [ ] Editor konten guratan untuk guru (impor data aksara baru)
- [ ] Ekspor sertifikat penyelesaian (ramah-pencetak)

---

## Notulensi Pengunci Keputusan

| # | Keputusan | Status | Tenggat Waktu |
|---|---|---|---|
| 1 | Jumlah soal Level 1 (set awal: 5 mesin terbang ha/na/ca/ra/ka) | ✅ **Selesai** (20 soal penuh) | — |
| 2 | Isi set data (mesin terbang mana saja per level) | ✅ **Selesai** (L1:20, L2:8, L3:20+15) | — |
| 3 | Sinopsis L1 (salinan lengkap dari PDF hilang) | ✅ **Selesai** (Ditulis ulang via i18n) | — |
| 4 | Kerangka kerja React vs Svelte | ✅ **React** (diputuskan) | — |
| 5 | Aset ilustrasi (SVG sebaris) | ✅ **Selesai** (Generatif CSS/Canvas) | — |
| 6 | Model evaluasi menulis | ✅ **Cakupan raster** (garis luar DTW diganti) | — |
| 7 | Sumber data kurasi guratan pena (panduan internal) | ✅ **Selesai** (Panduan berupa *solid fill*) | — |

---

*Seluruh notulensi keputusan tahap rintisan telah ditutup.*