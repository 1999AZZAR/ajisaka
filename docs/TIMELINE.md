# Petualangan Ajisaka — Timeline Pengembangan

**Rencana pengembangan realistik** · PWA · single full-stack developer (baseline) · 2026

| | |
|---|---|
| **Versi** | 0.1 |
| **Tanggal** | 2026-08-12 |
| **Rujukan** | `DESIGN_AND_DEV.md` (§12 stack, §18 milestone) |
| **Skenario basis** | 1 developer full-time (≈35 jam/minggu) |
| **Total** | ± **8 minggu kerja** (tidak termasuk jeda & risiko) |

---

## 1. Asumsi

Agar timeline realistis, posisi berikut disepakati:

- **Tim:** 1 developer full-stack (frontend + konten + QA). Konten kurasi dibantu guru/dosen bila tersedia — ini mempercepat jalur kritis.
- **Keputusan belum final** (§20 `DESIGN_AND_DEV.md`) diselesaikan paling lambat **akhir minggu 1**; keterlambatan menggeser jadwal 1:1.
- **Estimasi jam** didasarkan pada paniteraan stroke manual (data aksara), bukan akselerasi template instan.
- Uji perangkat dilakukan sambil jalan, bukan satu blok di akhir.

---

## 2. Workstream & Estimasi Jam

| Kode | Workstream | Jam (1 dev) | Ketergantungan |
|---|---|---|---|
| **W1** | Shell & PWA (Vite+TS, token, routing, manifest/SW, dashboard) | 16 | keputusan stack |
| **W2** | Stroke engine (capture, guide, DTW, feedback) | 40 | — |
| **W3** | Konten — dataset Nglegena (20+ glyphs) | 20 | W2 (matcher sbg verifier) |
| **W4** | Konten — dataset Sandangan (8+ core + kombinasi) | 16 | W2 |
| **W5** | Konten — dataset Pasangan (20 pasang, 2 glyph tiap) | 28 | W2 |
| **W6** | Level config + copy cerita (ID) | 14 | W3–W5 |
| **W7** | Game flow & state (level FSM, reward, persist, resume) | 24 | W6 |
| **W8** | Segmen akhir (ending, interstitial, unlock chain) | 12 | W7 |
| **W9** | Polish — partikel, suara, motion | 14 | W7 |
| **W10** | QA — unit, E2E offline, a11y (axe), audit konten | 20 | W2&ndash;W9 |
| **W11** | Buffer risiko & margin (bug, tuning toleransi) | 20 | lintas |

**Total estimasi: ≈ 224 jam ≈ 6,4 minggu + 1,6 minggu buffer → 8 minggu.**

---
---

<br>

### Jalur kritis

```
W2 (stroke engine)
  └──► W3/W4/W5 (dataset) ──► W6 (config+copy) ──► W7 (game flow) ──► W8/W9 ──► W10 (QA)
```

W1 (shell) dapat digarap paralel di awal karena independen. **W2→W3** adalah
jalur paling panjang dan paling berisiko — tuning toleransi DTW & kualitas
paniteraan stroke menentukan semuanya.

---

## 3. Jadwal Mingguan (baseline)

### Minggu 1 — Fondasi & keputusan
- Finalisasi §20: jumlah & isi soal Level 1, sinopsis L1, framework (React vs Svelte), aset ilustrasi.
- Scaffold Vite + TypeScript + Tailwind v4 + token keraton + routing.
- Manifest + service worker `vite-plugin-pwa`; shell offline jalan minimal.
- `/` home, `/menu` dashboard (5 kartu level, state locked).

**Exit criteria:** aplikasi *installable*, nabrak offline, dashboard hidup.

### Minggu 2 — Stroke engine (bagian 1)
- Hook canvas pointer events, HiDPI, `touch-action: none`, bounding box area.
- Pipeline normalisasi + resample (32 titik) + DTW.
- Contoh 3 glyph trial untuk memvalidasi matcher sebelum dataset penuh.

**Exit criteria:** menulis "ha" dijalankan di layar, matcher jawab pass/warn/retry.

### Minggu 3 — Stroke engine (bagian 2) + dataset Nglegena
- Animasi stroke guide (arrow tracer), replay, interplay dengan state per-stroke.
- Paniteraan 20+ glyph Nglegena; tiap glyph diverifikasi matcher.
- Umpan balik warna + ikon (ikut §11.4).

**Exit criteria:** seluruh Nglegena lolos uji matcher (≥90% trayektor pas).

### Minggu 4 — Dataset Sandangan & Pasangan (paralel mulai)
- Paniteraan 8+ Sandangan + kombinasi untuk 11 soal L2.
- Mulai pasangan 20 (urutan nempel di bawah/samping per kaidah).

**Exit criteria:** dataset Sandangan komplit & lolos; progres Pasangan ≥50%.

### Minggu 5 — Dataset Pasangan selesai + Level config
- Selesaikan 20 pasangan.
- Level config L1–L3, soal Fase-2 (3×5 latihan), copy cerita Indonesia penuh (dari `NASKAH_AJISAKA.md`).

**Exit criteria:** seluruh konten peran dalam dataset; level bisa dimainkan end-to-end (belum polish).

### Minggu 6 — Game flow & state
- Level FSM, reward (Pedang/Perisai), event "Dora bergabung / warga bergabung".
- Zustand persist: progress, resume, state per-question, unlock chain, tombol Next Level.
- Interstitial antar-fase L3 dan ending dinobatkan Raja.

**Exit criteria:** main dari Home → L3 selesai → ending; reload tidak mengubah progres.

### Minggu 7 — Polish & audio
- Partikel sukses, konfirmasi modal, suara gamelan ringan (Web Audio).
- Motion `prefers-reduced-motion` guard, transisi slide.
- Perbaiki micro-feedback kecocokan stroke di perangkat lambat.

**Exit criteria:** play-through terasa *game*; tidak ada jank di tablet menengah.

### Minggu 8 — QA, offline & rilis
- Unit (DTW, normalisasi, store, gating), E2E Playwright incl. simulasi offline penuh.
- audit a11y axe + WCAG AA (kontras, fokus, keyboard, reduced-motion).
- Matrix perangkat: iPad, Android tablet (Chrome), desktop portrait.
- Update banner rilis; build produksi final.

**Exit criteria:** seluruh P0 lolos; uji playthrough offline di ≥3 perangkat; rilis.

---

## 4. Gantt

```mermaid
gantt
    title Petualangan Ajisaka — Timeline (baseline 8 minggu)
    dateFormat  YYYY-MM-DD
    axisFormat  %V (Minggu)

    section M0 · Shell & PWA
    W1 Shell & SW sekaligus keputusan    :m0, 2026-08-17, 5d
    M0 selesai                           :milestone, m0, 0d

    section M1 · Stroke engine
    W2a Capture + DTW + trial            :m1a, after m0, 5d
    W2b Guide animation & feedback       :m1b, after m1a, 5d
    M1 selesai                           :milestone, m1b, 0d

    section M2 · Konten
    W3 Nglegena 20+                      :m2a, after m1a, 5d
    W4 Sandangan 8+ & kombinasi          :m2b, after m2a, 3d
    W5 Pasangan 20                       :m2c, 2026-09-21, 7d
    W6 Level config & copy               :m2d, after m2b, 4d
    M2 selesai                           :milestone, m2d, 0d

    section M3 · Game flow
    W7 Level FSM, reward, persist        :m3a, after m2d, 6d
    W8 Ending & interstitial             :m3b, after m3a, 3d
    M3 selesai                           :milestone, m3b, 0d

    section M4 · QA & rilis
    W9 Polish audio & motion             :m4a, after m3b, 3d
    W10 QA E2E offline, a11y, device     :m4b, after m4a, 5d
    W11 Buffer & rilis                   :m4c, after m4b, 5d
    RILIS                               :milestone, m4c, 0d
```

(Catatan: `%V` menampilkan minggu ISO; tanggal mulai 2026-08-17 = Senin pekan setelah dokumen ini.)

---

## 5. Skenario Alternatif

| Skenario | Durasi | Efek |
|---|---|---|
| **Basis** (1 dev FT) | ± 8 minggu | Jalan sesuai §3 |
| **1 dev part-time** (≈20 jam/mgg) | ± 12–13 minggu | W2–W5 tetap jalur kritis; jeda konteks bertambah |
| **1 dev + kurator konten** (isi dataset & copy) | ± 6 minggu | W3–W6 paralel, jalur kritis memendek drastis |
| **1 dev + QA tester** | ± 7 minggu | W10 terpotong; playthrough paralel |
| **React diganti Svelte** | +0 minggu (buat dev berpengalaman) | ukuran bundle turun, tooling serupa |
| **Timeline macet di M1 tuning** | +1–2 minggu | DTW toleransi terbukti sulit; sisihkan buffer W11 |

**Rekomendasi:** jika tim bertambah, rekrut **kurator konten Bahasa Jawa** terlebih
dahulu — ROI tertinggi karena jalur kritis terletak pada W3–W6.

---

## 6. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Paniteraan stroke manual tidak konsisten | salah arah/order terasah jadi salah diajarkan | verifikasi matcher per glyph; warna/ikon status jelas; review guru |
| Toleransi DTW terlalu ketat/lepas | frustrasi anak / lolos salah | trial di minggu 2 dgn 3 glyph; kalibrasi dengan tablet murah |
| Keputusan §20 terlambat | geser 1—2 minggu | deadline pengunci minggu 1; default sudah tersedia |
| Font Javanese belum dimuat = glyph kotak | soal tidak terbaca | precache woff2 di SW sejak M0; uji offline dini |
| iPad tidak support salah satu API (Pointer Events) | canvas tidak jalan | gunakan Pointer Events + fallback touch/mouse; uji di minggu 2 |
| Konten kurikulum (soal mana saja) menunggu pihak guru | level kosong | isi set baku sementara, tandai revisi kurikulum |

---

## 7. Definition of Done (rintisan rilis)

- [ ] Seluruh P0 fungsional (`DESIGN_AND_DEV.md` §5) lolos
- [ ] Playthrough offline penuh Home → ending di ≥3 perangkat
- [ ] axe a11y scan: 0 kritikal/serius; kontras AA
- [ ] Unit coverage engine (DTW/normalize) ≥ 90%
- [ ] Bundle ≤ 1,5 MB (JS+assets), font ≤ 600 KB
- [ ] Update banner bekerja; manifest valid & installable

---

*Rujuk `DESIGN_AND_DEV.md` untuk detail teknis setiap milestone. Timeline diperbarui setelah §20 dikunci.*