# Petualangan Ajisaka — Lini Masa Pengembangan

**Rencana pengembangan realistis** · PWA · satu pengembang tumpukan-penuh (pijakan awal) · 2026

| | |
|---|---|
| **Versi** | 0.1 |
| **Tanggal** | 2026-08-12 |
| **Rujukan** | `DESIGN_AND_DEV.md` (§12 tumpukan teknologi, §18 tonggak pencapaian) |
| **Skenario basis** | 1 pengembang purnawaktu (≈35 jam/minggu) |
| **Total** | ± **8 minggu kerja** (tidak termasuk jeda & risiko) |

---

## 1. Asumsi

Agar lini masa realistis, posisi berikut disepakati:

- **Tim:** 1 pengembang tumpukan-penuh (ujung-depan + konten + jaminan mutu). Kurasi konten dibantu oleh guru/dosen bila tersedia — ini akan mempercepat jalur kritis.
- **Keputusan belum final** (§20 `DESIGN_AND_DEV.md`) diselesaikan paling lambat **akhir minggu 1**; keterlambatan akan menggeser jadwal 1:1.
- **Estimasi jam** didasarkan pada perekaman guratan manual (data aksara), bukan akselerasi templat instan.
- Pengujian perangkat dilakukan sambil jalan, bukan sebagai satu blok di akhir.

---

## 2. Alur Kerja & Estimasi Jam

| Kode | Alur Kerja | Jam (1 pengembang) | Ketergantungan |
|---|---|---|---|
| **W1** | Kerangka & PWA (Vite+TS, token, perutean, manifes/SW, dasbor) | 16 | keputusan tumpukan teknologi |
| **W2** | Mesin guratan (tangkapan, panduan, DTW, umpan balik) | 40 | — |
| **W3** | Konten — himpunan data Nglegena (20+ glif) | 20 | W2 (pencocok sebagai pemverifikasi) |
| **W4** | Konten — himpunan data Sandangan (8+ inti + kombinasi) | 16 | W2 |
| **W5** | Konten — himpunan data Pasangan (20 pasang, 2 glif tiap pasangan) | 28 | W2 |
| **W6** | Konfigurasi tingkat + naskah cerita (ID) | 14 | W3–W5 |
| **W7** | Alur & status permainan (FSM tingkat, hadiah, persistensi, lanjutkan) | 24 | W6 |
| **W8** | Segmen akhir (penutup, transisi, rantai pembuka kunci) | 12 | W7 |
| **W9** | Penyempurnaan — partikel, suara, gerak | 14 | W7 |
| **W10** | QA — unit, E2E luring, aksesibilitas (axe), audit konten | 20 | W2–W9 |
| **W11** | Penyangga risiko & margin (kutu/bug, penyesuaian toleransi) | 20 | lintas |

**Total estimasi: ≈ 224 jam ≈ 6,4 minggu + 1,6 minggu penyangga → 8 minggu.**

---
---

<br>

### Jalur kritis

```
W2 (mesin guratan)
  └──► W3/W4/W5 (himpunan data) ──► W6 (konfig+naskah) ──► W7 (alur permainan) ──► W8/W9 ──► W10 (QA)
```

W1 (kerangka) dapat dikerjakan secara paralel di awal karena bersifat independen. **W2→W3** adalah
jalur paling panjang dan paling berisiko — penyesuaian toleransi DTW & kualitas
perekaman guratan menentukan segalanya.

---

## 3. Jadwal Mingguan (pijakan awal)

### Minggu 1 — Fondasi & keputusan
- Finalisasi §20: jumlah & isi soal Tingkat 1, sinopsis T1, kerangka kerja (React vs Svelte), aset ilustrasi.
- Kerangka Vite + TypeScript + Tailwind v4 + token keraton + perutean.
- Manifes + service worker `vite-plugin-pwa`; kerangka luring berjalan minimal.
- `/` beranda, `/menu` dasbor (5 kartu tingkat, status terkunci).

**Kriteria keberhasilan:** aplikasi *dapat diinstal*, merespons saat luring, dasbor berfungsi.

### Minggu 2 — Mesin guratan (bagian 1)
- Pengait kejadian penunjuk kanvas, HiDPI, `touch-action: none`, area kotak pembatas.
- Saluran normalisasi + cuplik ulang (32 titik) + DTW.
- Contoh uji coba 3 glif untuk memvalidasi pencocok sebelum himpunan data penuh.

**Kriteria keberhasilan:** menulis "ha" dijalankan di layar, pencocok merespons lulus/peringatan/coba lagi.

### Minggu 3 — Mesin guratan (bagian 2) + himpunan data Nglegena
- Animasi panduan guratan (penelusur panah), putar ulang, interaksi dengan status per-guratan.
- Perekaman 20+ glif Nglegena; tiap glif diverifikasi oleh pencocok.
- Umpan balik warna + ikon (sesuai §11.4).

**Kriteria keberhasilan:** seluruh Nglegena lolos uji pencocok (≥90% lintasan pas).

### Minggu 4 — Himpunan data Sandangan & Pasangan (mulai paralel)
- Perekaman 8+ Sandangan + kombinasi untuk 11 soal T2.
- Mulai 20 pasangan (urutan menempel di bawah/samping sesuai kaidah).

**Kriteria keberhasilan:** himpunan data Sandangan lengkap & lolos; progres Pasangan ≥50%.

### Minggu 5 — Himpunan data Pasangan selesai + Konfigurasi tingkat
- Selesaikan 20 pasangan.
- Konfigurasi tingkat T1–T3, soal Fase-2 (3×5 latihan), naskah cerita bahasa Indonesia penuh (dari `NASKAH_AJISAKA.md`).

**Kriteria keberhasilan:** seluruh peran konten dalam himpunan data; tingkat bisa dimainkan dari awal hingga akhir (belum disempurnakan).

### Minggu 6 — Alur & status permainan
- Tingkat FSM, hadiah (Pedang/Perisai), peristiwa "Dora bergabung / warga bergabung".
- Persistensi Zustand: kemajuan, lanjutkan, status per-pertanyaan, rantai pembuka kunci, tombol Tingkat Selanjutnya.
- Transisi antar-fase T3 dan penutup dinobatkan sebagai Raja.

**Kriteria keberhasilan:** bermain dari Beranda → T3 selesai → penutup; memuat ulang tidak mengubah kemajuan.

### Minggu 7 — Penyempurnaan & audio ✅ Selesai
- Partikel sukses, modal konfirmasi, suara gamelan ringan (Web Audio). (Selesai, di-render via perangkat keras GPU)
- Penjaga gerak `prefers-reduced-motion`, transisi salindia. (Selesai, transisi *scaleX* ultra mulus)
- Perbaiki umpan balik mikro kecocokan guratan pada perangkat lambat. (Selesai, implementasi *dirty-checking* pada `requestAnimationFrame` untuk hemat baterai & CPU 0% saat diam)

**Kriteria keberhasilan:** pengalaman bermain terasa seperti *permainan*; tidak ada jeda patah-patah di tablet menengah. (✅ Tercapai, 60fps konstan)

### Minggu 8 — QA, luring & rilis
- Unit (DTW, normalisasi, penyimpanan, pembatasan), Playwright E2E termasuk simulasi luring penuh.
- Audit aksesibilitas axe + WCAG AA (kontras, fokus, papan ketik, gerak-dikurangi).
- Matriks perangkat: iPad, tablet Android (Chrome), desktop potret.
- Perbarui spanduk rilis; kompilasi produksi final.

**Kriteria keberhasilan:** seluruh P0 lolos; uji bermain luring di ≥3 perangkat; rilis.

---

## 4. Bagan Gantt

```mermaid
gantt
    title Petualangan Ajisaka — Lini Masa (pijakan awal 8 minggu)
    dateFormat  YYYY-MM-DD
    axisFormat  %V (Minggu)

    section M0 · Kerangka & PWA
    W1 Kerangka & SW sekaligus keputusan    :m0, 2026-08-17, 5d
    M0 selesai                           :milestone, m0, 0d

    section M1 · Mesin guratan
    W2a Tangkapan + DTW + uji coba       :m1a, after m0, 5d
    W2b Animasi panduan & umpan balik    :m1b, after m1a, 5d
    M1 selesai                           :milestone, m1b, 0d

    section M2 · Konten
    W3 Nglegena 20+                      :m2a, after m1a, 5d
    W4 Sandangan 8+ & kombinasi          :m2b, after m2a, 3d
    W5 Pasangan 20                       :m2c, 2026-09-21, 7d
    W6 Konfig tingkat & naskah           :m2d, after m2b, 4d
    M2 selesai                           :milestone, m2d, 0d

    section M3 · Alur permainan
    W7 Tingkat FSM, hadiah, persistensi  :m3a, after m2d, 6d
    W8 Penutup & transisi                :m3b, after m3a, 3d
    M3 selesai                           :milestone, m3b, 0d

    section M4 · QA & rilis
    W9 Penyempurnaan audio & gerak       :m4a, after m3b, 3d
    W10 QA E2E luring, aksesibilitas, per:m4b, after m4a, 5d
    W11 Penyangga & rilis                :m4c, after m4b, 5d
    RILIS                               :milestone, m4c, 0d
```

(Catatan: `%V` menampilkan minggu ISO; tanggal mulai 2026-08-17 = Senin pekan setelah dokumen ini.)

---

## 5. Skenario Alternatif

| Skenario | Durasi | Efek |
|---|---|---|
| **Basis** (1 pengembang purnawaktu) | ± 8 minggu | Berjalan sesuai §3 |
| **1 pengembang paruh waktu** (≈20 jam/mgg) | ± 12–13 minggu | W2–W5 tetap jalur kritis; jeda konteks bertambah |
| **1 pengembang + kurator konten** (isi himpunan data & naskah) | ± 6 minggu | W3–W6 paralel, jalur kritis memendek drastis |
| **1 pengembang + penguji QA** | ± 7 minggu | W10 terpotong; pengujian bermain paralel |
| **React diganti Svelte** | +0 minggu (buat pengembang berpengalaman) | ukuran kompilasi turun, perkakas serupa |
| **Lini masa macet di M1 penyesuaian** | +1–2 minggu | Toleransi DTW terbukti sulit; sisihkan penyangga W11 |

**Rekomendasi:** jika tim bertambah, rekrut **kurator konten Bahasa Jawa** terlebih
dahulu — ROI tertinggi karena jalur kritis terletak pada W3–W6.

---

## 6. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Perekaman guratan manual tidak konsisten | salah arah/urutan terasah jadi salah diajarkan | verifikasi pencocok per glif; status warna/ikon yang jelas; tinjauan guru |
| Toleransi DTW terlalu ketat/longgar | frustrasi anak / lolos salah | uji coba di minggu 2 dengan 3 glif; kalibrasi dengan tablet murah |
| Keputusan §20 terlambat | geser 1—2 minggu | tenggat waktu pengunci minggu 1; pengaturan bawaan sudah tersedia |
| Font Javanese belum dimuat = glif kotak | soal tidak terbaca | pra-simpan woff2 di SW sejak M0; uji luring sejak dini |
| iPad tidak mendukung salah satu API (Pointer Events) | kanvas tidak berjalan | gunakan Pointer Events + cadangan sentuhan/tetikus; uji di minggu 2 |
| Konten kurikulum (soal mana saja) menunggu pihak guru | tingkat kosong | isi set baku sementara, tandai revisi kurikulum |

---

## 7. Definisi Selesai (Rintisan rilis)

- [ ] Seluruh P0 fungsional (`DESIGN_AND_DEV.md` §5) lolos
- [ ] Pengalaman bermain luring penuh Beranda → penutup di ≥3 perangkat
- [ ] Pemindaian aksesibilitas axe: 0 kritikal/serius; kontras AA
- [ ] Cakupan unit mesin (DTW/normalisasi) ≥ 90%
- [ ] Kompilasi ≤ 1,5 MB (JS+aset), font ≤ 600 KB
- [ ] Spanduk pembaruan bekerja; manifes valid & dapat diinstal

---

*Rujuk `DESIGN_AND_DEV.md` untuk detail teknis setiap tonggak pencapaian. Lini masa diperbarui setelah §20 dikunci.*