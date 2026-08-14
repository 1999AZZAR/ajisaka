# Petualangan Ajisaka — Todo Pengembangan (P0–P3)

Prioritas berdasarkan `DESIGN_AND_DEV.md` §5 & `TIMELINE.md` W1–W11.
*Diperbarui setelah M0+M1 PoC build (2026-08-12).*

**Skala prioritas**
- **P0 — Kritis:** tanpa ini aplikasi tidak bisa rilis / tidak bisa dimainkan.
- **P1 — Penting:** wajib untuk peluncuran yang baik, dapat ditunda jika terdesak.
- **P2 — Peningkatan:** nilai tambah setelah rilis inti stabil.
- **P3 — Masa depan:** di luar scop MVP, direncanakan kemudian.

- [x] = selesai & terverifikasi (build/lint/test hijau)
- [~] = sebagian / versi PoC / butuh kurasi

---

## P0 — Kritis (rintisan rilis)

### Fondasi & shell — ✅ DONE (M0)
- [x] Scaffold Vite + TypeScript strict + Tailwind v4 — `src/`
- [x] Token desain keraton (OKLCH) §9.2 — `src/src/index.css` (@theme)
- [x] Routing hash: `/`, `/menu`, `/prolog`, `/level/1..3`, `/ending` — App.tsx
- [x] Halaman Home (judul + tombol PLAY) — FR-1.1 (Redesigned with playful UX)
- [x] Dashboard 5 menu dengan state locked/unlock — FR-1.3, FR-1.4 (Redesigned with Gamified LevelCards)
- [x] Manifest PWA + icons (192/512/maskable/apple-touch) + installable
- [ ] Finalisasi keputusan §20 (jumlah soal L1, isi dataset, framework ✅React, aset ilustrasi) — sebagian tetap terbuka

### Stroke engine — PIVOT: DTW → VECTOR GEOMETRY
- [x] Hook canvas Pointer Events, HiDPI, `touch-action: none`, live-ink — useCanvasCapture
- [x] Normalisasi + resample (engine/geometry) — dipakai rendering
- [x] Matcher **Vector Geometry (Chamfer Dist)** — engine/raster.ts (Skala dinamis, cegah exploit coretan)
- [x] Uji matcher sintetis (square/fill/miss/offset) + 20 glyph contours — vitest 8 tests
- [x] Umpan balik warna per guratan (green/amber/red) — §11.4
- [x] Kontrol Clear ("Bersihkan") — FR-3.6
- [x] Kalibrasi toleransi coverage (COVERAGE_PASS/WARN) dgn uji tablet nyata — sudah dinamis per luas/tebal glyph

### Konten
- [~] Dataset Nglegena **20 contour** (dari Noto Sans Javanese, Y-corrected, 80-pt) — src/data/nglegena_contours.json
- [x] Dataset Sandangan 8+ core + kombinasi — §10.1 (Label & Dotted Circle diperbaiki)
- [~] Dataset Pasangan (20 pasang) — §10.1 (Data contour korup: loop/lubang hilang, perlu diekstrak ulang)
- [~] Level config L1–L3 bukti: starter ha/na/ca/ra/ka; soal 11/20/3×5 belum terisi penuh — §10.2
- [ ] Copy cerita Indonesia penuh (dari `NASKAH_AJISAKA.md`) ke tiap level — sebagian
- [x] Precache font Javanese (woff2, 89KB, self-host) — FR-6.2
- [ ] **Stroke data kurasi internal (guide pen-stroke ori)** — kanvas guide saat ini solid-fill contour; untuk guratan internal/order diajarkan butuh data kurator (§20)

### Game flow & state
- [x] Level FSM path: intro screen → practice → done page
- [x] Reward Pedang Pusaka (L1) / Perisai Sakti (L2) / Raja (L3) — LevelDone
- [x] Event "Dora bergabung" & "warga bergabung" (copy) — LevelDone
- [x] Unlock chain + tombol Next Level — FR-4.3
- [ ] Interstitial Fase 1→2 + 3 latihan menu di Level 3 — FR-4.4 (belum)
- [ ] Ending dinobatkan Raja terhubung setelah L3 selesai — screen ada, alur belum
- [x] Persist progress (Zustand persist): completedLevels, rewards — FR-5.1
- [ ] Resume level saat reload — FR-5.2 (partial: progress tersimpan, resume per-question belum)
- [ ] Latihan soal L1: mulai dari soal 1 → reward→ level 2 dsb (starter set dipakai ulang utk L2/L3 sementara)

### PWA & offline
- [x] Service worker (Workbox) precache penuh (~500 KB, 14 entries) — FR-6.2
- [x] Update banner prompt-refresh — FR-6.3 (registerSW onNeedRefresh, diperbarui ke autoUpdate)
- [x] Uji playthrough offline penuh di perangkat (IOS icons + user-scalable=no)

### QA rilis
- [x] Unit test matcher/raster + geometry + dtw (8 tests) — vitest
- [ ] Coverage ≥90% utk engine (target paket tambahan)
- [ ] E2E Playwright: Home→L1 selesai→L2 unlock; reload mid-level
- [ ] Matrix perangkat (iPad, Android tablet, desktop) — §14

---

## P1 — Penting (peluncuran berkualitas)

- [ ] Partikel sukses per soal & reward (≤60 particle) — §9.5
- [x] Suara gamelan ringan (Web Audio) (engine audio.ts selesai) — §12.2
- [x] Transisi antarmuka & animasi UI (menggunakan animejs dgn bounce/stagger)
- [x] Transisi slide sinopsis (Prolog.tsx) — FR-2.2
- [ ] Modal congrats/fokus trap — §9.7
- [x] Audit a11y axe (P0 kritikal/serius = 0, kontras AA) — §16
- [x] Skip-link + landmark announcement + `:focus-visible` penuh — §16
- [ ] Suport keyboard (story slides, Enter/Space) — §16
- [ ] Alternatif aksesibel untuk canvas (deskripsi soal lengkap) — §16
- [ ] Optimasi bundle ≤1,5 MB + font ≤600 KB (saat ini ±500 KB total precache) — §15
- [ ] Pola 60fps saat menulis dgn guide menyala (rAF + dpr scaling)— §15
- [~] Kanvas toggle panduan (Tampilkan/Sembunyikan Contoh) — selesai, verifikasi UX
- [ ] E2E offline emulation penuh (Playwright)

---

## P2 — Peningkatan (setelah rilis inti stabil)

- [ ] TTS pengucapan fonem + pelafalan nama aksara (lokal, gabung dgn suara)
- [ ] Transliterasi teks → Aksara Jawa (masukan bebas)
- [ ] Set glyph lanjutan: Angka, Murda, Swara
- [ ] Peningkatan model matcher → classifier ML (ONNX/TFLite <500 KB) — §11.3
- [ ] Statistik per latihan tambahan (skor, waktu, retry)
- [ ] Kuis pengetahuan cepat (bukan hanya menulis) sbg penguat
- [ ] Mode bantuan ekstra anak kecil (petunjuk lebih besar, warna kontras tinggi)
- [ ] Pengaturan lanjutan (volume, mode kontras tinggi, ukuran teks)

---

## P3 — Masa depan (di luar MVP)

- [ ] Cloud sync & laporan guru ("Guru Report") — §19
- [ ] Leaderboard lokal/kelas + akun opsional — G5, §19
- [ ] APK Android via TWA; wrapper iPad — §19
- [ ] Multi-bahasa (Jawa–Indonesia–English) — §2.2, §19
- [ ] Editor stroke konten untuk guru (impor data aksara baru)
- [ ] Ekspor sertifikat penyelesaian (printer-friendly)

---

## Notulensi Pengunci Keputusan

| # | Keputusan | Status | Deadlines |
|---|---|---|---|
| 1 | Jumlah soal Level 1 (starter: 5 glyph ha/na/ca/ra/ka) | ⏳ terbuka | sebelum isi dataset penuh |
| 2 | Isi dataset (glyph mana saja per level) | ⏳ terbuka | sebelum dataset lengkap |
| 3 | Sinopsis L1 (copy lengkap dari PDF hilang) | ⏳ terbuka | sebelum copy cerita penuh |
| 4 | Framework React vs Svelte | ✅ **React** (diputuskan) | — |
| 5 | Aset ilustrasi (SVG inline) | ⏳ terbuka | akhir minggu 2 |
| 6 | Model evaluasi menulis | ✅ **Raster coverage** (DTW outline diganti) | — |
| 7 | Sumber data pen-stroke kurasi (guide internal) | ⏳ terbuka | P1 |

---

*Perbarui notulensi § berdasarkan keputusan TIMELINE.md; kotak cek dicoret saat selesai.*