import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  id: {
    translation: {
      "app": {
        "title": "Aksara Jawa",
        "subtitle": "Petualangan Seru Belajar",
        "start": "Mulai Perjalanan",
        "settings": "Pengaturan",
        "home": "Beranda",
        "petualangan": "Petualangan",
        "ajisaka": "Ajisaka"
      },
      "home": {
        "desc": "Belajar menulis Aksara Jawa lewat petualangan seru!",
        "play": "Mulai Main!",
        "offline": "Bisa dimainkan offline",
        "kamus": "📖 Lihat Kamus Aksara"
      },
      "dashboard": {
        "title": "Peta Pulau",
        "subtitle": "Pilih petualanganmu hari ini!",
        "reset": "Mulai Ulang",
        "completed": "Selesai",
        "locked": "(terkunci)",
        "prolog": "Prolog",
        "prolog_desc": "Kisah Asal Usul",
        "level1_title": "Pulau Sanjaya",
        "level1_desc": "Misi mengambil Pedang Pusaka",
        "level2_title": "Pulau Adi Jaya",
        "level2_desc": "Mencari Perisai Sakti",
        "level3_title": "Kerajaan Nusantara",
        "level3_desc": "Pertempuran Akhir",
        "kamus": "Buka Kamus",
        "progress_title": "Progres Perjalanan",
        "progress_complete": "{{count}} / 3 Selesai"
      },
      "settings": {
        "title": "Pengaturan",
        "language": "Bahasa / Language",
        "language_id": "Indonesia",
        "language_en": "English",
        "back": "Kembali"
      },
      "level": {
        "completed": "Selesai",
        "locked": "Terkunci",
        "play": "Mulai Tantangan",
        "story1": "Untuk membuka segel dan mengambil pedang, pemain wajib menyelesaikan tantangan praktik menulis Aksara Dasar (Nglegena).",
        "story2": "Ajisaka dan Dora mengarungi Pulau Adi Jaya untuk mencari Perisai Sakti. Warga lokal mengujimu sebelum memberikannya.",
        "story3": "Dalam perjalanan laut menuju pusat kerajaan musuh, kapal kalian dicegat oleh dua utusan Raksasa Hijau. Kalahkan mereka dengan Aksara Pasangan!"
      },
      "level_done": {
        "success_label": "Tantangan Berhasil!",
        "reward1_name": "Pedang Pusaka",
        "reward1_text": "Kamu bertemu pemuda bernama Dora yang kini menjadi pengikut setiamu! Lanjut ke pulau berikutnya!",
        "reward2_name": "Perisai Sakti",
        "reward2_text": "Warga lokal kagum dengan kemahiranmu dan ikut bergabung! Kini kalian bertiga siap melawan Raksasa Hijau!",
        "reward3_name": "Raja Nusantara",
        "reward3_text": "Kedua utusan Raksasa Hijau berhasil dikalahkan! Kerajaan Nusantara kembali damai, dan Ajisaka dinobatkan menjadi Raja!",
        "next": "Level Selanjutnya",
        "back": "Kembali ke Peta"
      },
      "practice": {
        "question": "Pertanyaan",
        "draw": "Tulis",
        "base": "Aksara Dasar",
        "sandangan": "Sandangan",
        "pasangan": "Pasangan",
        "next": "Lanjut",
        "finish": "Selesai",
        "canvas_aria": "Tulis aksara {{glyph}} pada bidang kosong.",
        "write_here": "Tulis di sini",
        "clear": "Bersihkan",
        "show_guide": "Contoh",
        "hide_guide": "Sembunyikan",
        "feedback": {
          "pass": "Bagus, bentukmu tepat!",
          "warn": "Hampir pas, coba sedikit lagi.",
          "retry": "Belum pas — coba lagi, dekati bentuknya.",
          "empty": "Gambar aksara di bidang kosong, contoh di atas."
        }
      },
      "kamus_modal": {
        "title": "Kamus Aksara",
        "close": "Tutup",
        "nglegena": "Aksara Dasar (Nglegena)",
        "sandangan": "Sandangan (Vokal)",
        "pasangan": "Pasangan",
        "example": "Contoh Penggunaan",
        "meaning": "Arti:",
        "close_example": "Tutup Contoh",
        "desc_nglegena": "Penggunaan aksara dalam kata.",
        "desc_pasangan": "Pasangan menyambung suku kata mati (contoh: \"anak...\").",
        "desc_sandangan": "Sandangan memberikan bunyi vokal atau akhiran pada aksara dasar."
      },
      "prolog_page": {
        "title": "Prolog",
        "next": "Lanjut",
        "play": "Mulai Level 1",
        "slides": {
          "1": {
            "title": "Aksara Jawa",
            "body": "Aksara Jawa adalah sistem tulisan turunan dari aksara Brahmi yang dipakai masyarakat Jawa sejak abad ke-9."
          },
          "2": {
            "title": "Leluhur Hanacaraka",
            "body": "Huruf-hurufnya dikenal lewat cerita Ajisaka — kisah yang melahirkan urutan ha, na, ca, ra, ka."
          },
          "3": {
            "title": "Tiga Jenis Huruf",
            "body": "Kita akan belajar Aksara Dasar (Nglegena), Sandangan penanda vokal, dan Pasangan untuk konsonan mati."
          }
        }
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "Javanese Script",
        "subtitle": "A Fun Learning Adventure",
        "start": "Start Journey",
        "settings": "Settings",
        "home": "Home",
        "petualangan": "Ajisaka's",
        "ajisaka": "Adventure"
      },
      "home": {
        "desc": "Learn to write Javanese script through an exciting adventure!",
        "play": "Start Playing!",
        "offline": "Playable offline",
        "kamus": "📖 View Script Dictionary"
      },
      "dashboard": {
        "title": "Island Map",
        "subtitle": "Choose your adventure today!",
        "reset": "Reset Progress",
        "completed": "Done",
        "locked": "(locked)",
        "prolog": "Prologue",
        "prolog_desc": "Ajisaka's Origin",
        "kamus": "Script Dictionary",
        "kamus_desc": "Javanese letters cheat sheet",
        "progress_title": "Journey Progress",
        "progress_complete": "{{count}} / 3 Completed",
        "level1_title": "Sanjaya Island",
        "level1_desc": "Mission to get the Sacred Sword",
        "level2_title": "Adi Jaya Island",
        "level2_desc": "Search for the Magic Shield",
        "level3_title": "Nusantara Kingdom",
        "level3_desc": "The Final Battle"
      },
      "settings": {
        "title": "Settings",
        "language": "Language / Bahasa",
        "language_id": "Bahasa Indonesia",
        "language_en": "English",
        "back": "Back"
      },
      "level": {
        "completed": "Completed",
        "locked": "Locked",
        "play": "Start Challenge",
        "story1": "To break the seal and retrieve the sword, you must complete the writing challenge for Basic Javanese Script (Nglegena).",
        "story2": "Ajisaka and Dora arrive at Adi Jaya Island to find the Magic Shield. A local challenges you to prove your worth.",
        "story3": "On the way to the enemy kingdom, your ship is intercepted by two envoys of the Green Giant. Defeat them using Consonant Pairs (Pasangan)!"
      },
      "level_done": {
        "success_label": "Challenge Cleared!",
        "reward1_name": "Sacred Sword",
        "reward1_text": "You meet a young man named Dora who becomes your loyal follower! Onward to the next island!",
        "reward2_name": "Magic Shield",
        "reward2_text": "The local is amazed by your skills and joins your party! The three of you are ready to face the Green Giant!",
        "reward3_name": "King of Nusantara",
        "reward3_text": "The Green Giant's envoys are defeated! Nusantara Kingdom is at peace again, and Ajisaka is crowned King!",
        "next": "Next Level",
        "back": "Back to Map"
      },
      "practice": {
        "question": "Question",
        "draw": "Draw",
        "base": "Base Script",
        "sandangan": "Vowel Modifier",
        "pasangan": "Consonant Pair",
        "next": "Next",
        "finish": "Finish",
        "canvas_aria": "Draw script {{glyph}} on the empty canvas.",
        "write_here": "Write here",
        "clear": "Clear",
        "show_guide": "Show Guide",
        "hide_guide": "Hide Guide",
        "feedback": {
          "pass": "Great, correct shape!",
          "warn": "Almost there, try again.",
          "retry": "Not quite — try matching the shape.",
          "empty": "Draw the character in the empty space, example above."
        }
      },
      "kamus_modal": {
        "title": "Script Dictionary",
        "close": "Close",
        "nglegena": "Basic Script (Nglegena)",
        "sandangan": "Vowel Modifiers (Sandangan)",
        "pasangan": "Consonant Pairs (Pasangan)",
        "example": "Usage Example",
        "meaning": "Meaning:",
        "close_example": "Close Example",
        "desc_nglegena": "Usage of the script in a word.",
        "desc_pasangan": "Pairs connect a dead syllable (e.g. \"anak...\").",
        "desc_sandangan": "Modifiers give vowel sounds or endings to the base script."
      },
      "prolog_page": {
        "title": "Prologue",
        "next": "Next",
        "play": "Start Level 1",
        "slides": {
          "1": {
            "title": "Javanese Script",
            "body": "Javanese script is a writing system derived from the Brahmi script, used by the Javanese people since the 9th century."
          },
          "2": {
            "title": "Hanacaraka Origins",
            "body": "The letters are known through the story of Ajisaka — a tale that birthed the sequence ha, na, ca, ra, ka."
          },
          "3": {
            "title": "Three Types of Letters",
            "body": "We will learn the Basic Script (Nglegena), Vowel Modifiers (Sandangan), and Consonant Pairs (Pasangan) for dead consonants."
          }
        }
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  })

export default i18n
