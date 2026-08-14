import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  id: {
    translation: {
      "aksara_hints": {
        "ha": "Kail besar: lengkung luar lalu dalam",
        "na": "Garis tegak dengan kepala melebar",
        "ca": "Bilah tajam dengan pengait",
        "ra": "Kepala kecil lalu batang turun",
        "ka": "Dua tonjolan seperti gapura",
        "da": "Lengkung bulat berpondasi pendek",
        "ta": "Tiang tegak berkepala besar",
        "sa": "Tiga gelombang menggantung",
        "wa": "Alunan lembut seperti ombak",
        "la": "Batang tegak berkepala lonjong",
        "pa": "Sayap melebar ke bawah",
        "dha": "Perut besar berekor pendek",
        "ja": "Bilah ramping menekuk",
        "ya": "Daun runcing bertangkai",
        "nya": "Dua lengkung tumpul sejajar",
        "ma": "Cekungan seperti pelana",
        "ga": "Siku tumpul lalu tungkai",
        "ba": "Cangkir bergagang",
        "tha": "Tiang berkepala melengkung",
        "nga": "Gelombang berkaki tegak",
        "wulu": "Tanda vokal i — tulis kecil di atas",
        "suku": "Tanda vokal u — ekor kecil",
        "pepet": "Tanda vokal e — tumpul di atas",
        "taling": "Tanda vokal è — di kiri",
        "tarung": "Tanda vokal o — menggantung",
        "cecak": "Tanda ng — di atas",
        "layar": "Tanda r — di atas",
        "wignyan": "Tanda h — di atas"
      },
      "app": {
        "title": "Aksara Jawa",
        "subtitle": "Petualangan Belajar Menyenangkan",
        "home.start": "Mulai Perjalanan",
        "home.install": "Install Aplikasi (PWA)",
        "settings": "Pengaturan",
        "home": "Beranda",
        "petualangan": "Petualangan",
        "ajisaka": "Ajisaka"
      },
      "home": {
        "desc": "Belajar menulis Aksara Jawa lewat petualangan seru!",
        "play": "Mulai Main!",
        "offline": "Bisa dimainkan offline",
        "kamus": "📖 Lihat Kamus Aksara",
        "exit_fullscreen": "Keluar Layar Penuh"
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
        "kamus_desc": "Panduan lengkap aksara Jawa",
        "progress_title": "Progres Perjalanan",
        "progress_complete": "{{count}} / 3 Selesai",
        "freetype_title": "Bebas Nulis",
        "freetype_desc": "Ketik aksara Jawa sesukamu"
      },
      "freetype": {
        "read_as": "Dibaca",
        "space": "Spasi"
      },
      "settings": {
        "title": "Pengaturan",
        "language": "Bahasa / Language",
        "language_id": "Indonesia",
        "language_en": "English",
        "language_jv": "Bahasa Jawa (Krama)",
        "back": "Kembali"
      },
      "level": {
        "completed": "Selesai",
        "locked": "Terkunci",
        "play_phase1": "Fase 1: Tulis",
        "play_phase2": "Fase 2: Ketik",
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
        "phase": "Fase",
        "draw": "Tulis",
        "base": "Aksara Dasar",
        "sandangan": "Sandangan",
        "pasangan": "Pasangan",
        "next": "Lanjut",
        "finish": "Selesai",
        "canvas_aria": "Tulis aksara {{glyph}} pada bidang kosong.",
        "write_here": "Tulis di sini",
        "write_word": "Tulis Kata:",
        "type_here": "Ketik di bawah...",
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
        "play": "Mulai Petualangan! ➡️",
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
      "aksara_hints": {
        "ha": "Large hook: outer then inner curve",
        "na": "Vertical line with wide head",
        "ca": "Sharp blade with a hook",
        "ra": "Small head then downward stem",
        "ka": "Two bumps like a gateway",
        "da": "Round curve with short foundation",
        "ta": "Vertical pole with large head",
        "sa": "Three hanging waves",
        "wa": "Gentle ripple like a wave",
        "la": "Vertical stem with oval head",
        "pa": "Wing spreading downward",
        "dha": "Large belly with short tail",
        "ja": "Slender bending blade",
        "ya": "Pointed leaf on a stalk",
        "nya": "Two parallel blunt curves",
        "ma": "Depression like a saddle",
        "ga": "Blunt elbow then a leg",
        "ba": "Cup with a handle",
        "tha": "Pole with curved head",
        "nga": "Wave with vertical legs",
        "wulu": "Vowel mark i — write small on top",
        "suku": "Vowel mark u — small tail",
        "pepet": "Vowel mark e — blunt on top",
        "taling": "Vowel mark è — on the left",
        "tarung": "Vowel mark o — hanging",
        "cecak": "Consonant ng — on top",
        "layar": "Consonant r — on top",
        "wignyan": "Consonant h — on top"
      },
      "app": {
        "title": "Javanese Script",
        "subtitle": "A Fun Learning Adventure",
        "home.start": "Start Journey",
        "home.install": "Install App (PWA)",
        "settings": "Settings",
        "home": "Home",
        "petualangan": "Ajisaka's",
        "ajisaka": "Adventure"
      },
      "home": {
        "desc": "Learn to write Javanese script through an exciting adventure!",
        "play": "Start Playing!",
        "offline": "Playable offline",
        "kamus": "📖 View Script Dictionary",
        "exit_fullscreen": "Exit Fullscreen"
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
        "freetype_title": "Free Type",
        "freetype_desc": "Type Javanese freely",
        "level1_title": "Sanjaya Island",
        "level1_desc": "Mission to get the Sacred Sword",
        "level2_title": "Adi Jaya Island",
        "level2_desc": "Search for the Magic Shield",
        "level3_title": "Nusantara Kingdom",
        "level3_desc": "The Final Battle"
      },
      "freetype": {
        "read_as": "Read as",
        "space": "Space"
      },
      "settings": {
        "title": "Settings",
        "language": "Language / Bahasa",
        "language_id": "Bahasa Indonesia",
        "language_en": "English",
        "language_jv": "Javanese (Krama)",
        "back": "Back"
      },
      "level": {
        "completed": "Completed",
        "locked": "Locked",
        "play_phase1": "Phase 1: Write",
        "play_phase2": "Phase 2: Type",
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
        "phase": "Phase",
        "draw": "Draw",
        "base": "Base Script",
        "sandangan": "Vowel Modifier",
        "pasangan": "Consonant Pair",
        "next": "Next",
        "finish": "Finish",
        "canvas_aria": "Draw script {{glyph}} on the empty canvas.",
        "write_here": "Write here",
        "write_word": "Write Word:",
        "type_here": "Type below...",
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
        "play": "Start Adventure! ➡️",
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
  },
  jv: {
    translation: {
      "aksara_hints": {
        "ha": "Kanthong ageng: lengkung njawi lajeng mlebet",
        "na": "Garis jejeg mawi sirah wiyar",
        "ca": "Péso lincip mawi pancing",
        "ra": "Sirah alit lajeng gagang mandhap",
        "ka": "Tonjolan kalih kados gapura",
        "da": "Lengkung bunder mawi dhasar cendhak",
        "ta": "Cagak jejeg mawi sirah ageng",
        "sa": "Ombak tiga gumantung",
        "wa": "Ombak alus",
        "la": "Gagang jejeg mawi sirah lonjong",
        "pa": "Swiwi wiyar mandhap",
        "dha": "Weteng ageng mawi buntut cendhak",
        "ja": "Péso langsing nekuk",
        "ya": "Godhong lincip mawi gagang",
        "nya": "Lengkung kalih sejajar",
        "ma": "Cekungan kados pelana",
        "ga": "Sikut tumpul lajeng suku",
        "ba": "Cangkir mawi gagang",
        "tha": "Cagak mawi sirah lengkung",
        "nga": "Ombak mawi sikil jejeg",
        "wulu": "Sandhangan swara i — srat alit ing nginggil",
        "suku": "Sandhangan swara u — buntut alit",
        "pepet": "Sandhangan swara e — tumpul ing nginggil",
        "taling": "Sandhangan swara è — ing sisih kiwa",
        "tarung": "Sandhangan swara o — gumantung",
        "cecak": "Sandhangan ng — ing nginggil",
        "layar": "Sandhangan r — ing nginggil",
        "wignyan": "Sandhangan h — ing nginggil"
      },
      "app": {
        "title": "Aksara Jawa",
        "subtitle": "Pangumbara Sinau Ingkang Nyenengaken",
        "home.start": "Miwiti Pangumbara",
        "home.install": "Pasang Aplikasi (PWA)",
        "settings": "Pangaturan",
        "home": "Kaca Ngarep",
        "petualangan": "Lelampahan",
        "ajisaka": "Ajisaka"
      },
      "home": {
        "desc": "Sinau nyerat Aksara Jawa mawi lelampahan ingkang seru!",
        "play": "Ayo Dolanan!",
        "offline": "Saged dipun mainaken tanpa internet",
        "kamus": "📖 Pirsani Bausastra Aksara",
        "exit_fullscreen": "Mios saking Layar"
      },
      "dashboard": {
        "title": "Peta Pulo",
        "subtitle": "Pilih lelampahan panjenengan dinten punika!",
        "reset": "Miwiti Malih",
        "completed": "Rampung",
        "locked": "(kunci)",
        "prolog": "Purwaka",
        "prolog_desc": "Cariyos Wiwitan",
        "level1_title": "Pulo Sanjaya",
        "level1_desc": "Darma mundhut Pedang Pusaka",
        "level2_title": "Pulo Adi Jaya",
        "level2_desc": "Pados Tameng Sakti",
        "level3_title": "Kraton Nusantara",
        "level3_desc": "Paprangan Pungkasan",
        "kamus": "Buka Bausastra",
        "kamus_desc": "Pandhuan pepak aksara Jawa",
        "progress_title": "Lampahing Pangumbara",
        "progress_complete": "{{count}} / 3 Rampung",
        "freetype_title": "Bebas Nyerat",
        "freetype_desc": "Nyerat aksara Jawa sak kersanipun"
      },
      "freetype": {
        "read_as": "Diwaos",
        "space": "Spasi"
      },
      "settings": {
        "title": "Pangaturan",
        "language": "Basa / Language",
        "language_id": "Indonesia",
        "language_en": "English",
        "language_jv": "Basa Jawa (Krama)",
        "back": "Wangsul"
      },
      "level": {
        "completed": "Rampung",
        "locked": "Kunci",
        "play_phase1": "Fase 1: Srat",
        "play_phase2": "Fase 2: Ketik",
        "play": "Miwiti Tantangan",
        "story1": "Kagem mbuka segel lan mundhut pedang, panjenengan kedah ngrampungaken tantangan nyerat Aksara Nglegena.",
        "story2": "Ajisaka lan Dora dumugi ing Pulo Adi Jaya kagem pados Tameng Sakti. Warga lokal nguji panjenengan saderengipun maringaken tamengipun.",
        "story3": "Wonten ing lelampahan seganten tumuju kraton mengsah, baita panjenengan dipun hadang dening kalih utusan Raseksa Ijem. Kanthi Aksara Pasangan, asoraken mengsahipun!"
      },
      "level_done": {
        "success_label": "Tantangan Kasil!",
        "reward1_name": "Pedang Pusaka",
        "reward1_text": "Panjenengan pinanggih nem-neman asma Dora ingkang samenika dados pendherek setya! Lajeng dhateng pulo salajengipun!",
        "reward2_name": "Tameng Sakti",
        "reward2_text": "Warga lokal ngungun dhumateng kaprigelan panjenengan lajeng tumut gabung! Samenika panjenengan tetiga siyaga nglawan Raseksa Ijem!",
        "reward3_name": "Raja Nusantara",
        "reward3_text": "Kekalih utusan Raseksa Ijem kasil dipun asoraken! Kraton Nusantara wangsul tentrem, lan Ajisaka jinumeneng Raja!",
        "next": "Tataran Salajengipun",
        "back": "Wangsul dhateng Peta"
      },
      "practice": {
        "question": "Pitakenan",
        "phase": "Fase",
        "draw": "Srat",
        "base": "Aksara Dasar",
        "sandangan": "Sandhangan",
        "pasangan": "Pasangan",
        "next": "Lajeng",
        "finish": "Rampung",
        "canvas_aria": "Srat aksara {{glyph}} wonten papan ingkang kothong.",
        "write_here": "Srat ing mriki",
        "write_word": "Srat Tembung:",
        "type_here": "Ketik ing ngandhap...",
        "clear": "Busek",
        "show_guide": "Tuladha",
        "hide_guide": "Singidaken",
        "feedback": {
          "pass": "Sae, wujudipun leres!",
          "warn": "Meh leres, cobi sekedhik malih.",
          "retry": "Dereng leres — cobi malih, samikaken wujudipun.",
          "empty": "Srat aksara ing papan kothong, tuladhanipun wonten ing nginggil."
        }
      },
      "kamus_modal": {
        "title": "Bausastra Aksara",
        "close": "Tutup",
        "nglegena": "Aksara Dasar (Nglegena)",
        "sandangan": "Sandhangan (Vokal)",
        "pasangan": "Pasangan",
        "example": "Tuladha Pangangge",
        "meaning": "Tegesipun:",
        "close_example": "Tutup Tuladha",
        "desc_nglegena": "Panganggening aksara wonten ing tembung.",
        "desc_pasangan": "Pasangan nyambung wanda mati (tuladha: \"anak...\").",
        "desc_sandangan": "Sandhangan maringaken ungel vokal utawi panambang ing aksara dasar."
      },
      "prolog_page": {
        "title": "Purwaka",
        "next": "Lajeng",
        "play": "Miwiti Pangumbara! ➡️",
        "slides": {
          "1": {
            "title": "Aksara Jawa",
            "body": "Aksara Jawa minangka seratan turunan saking aksara Brahmi ingkang dipun ginakaken masarakat Jawa wiwit abad kaping-9."
          },
          "2": {
            "title": "Leluhur Hanacaraka",
            "body": "Aksaranipun misuwur lumantar cariyos Ajisaka — lelampahan ingkang nglairaken urutan ha, na, ca, ra, ka."
          },
          "3": {
            "title": "Tiga Jinising Huruf",
            "body": "Kita badhe sinau Aksara Dasar (Nglegena), Sandhangan panandha vokal, saha Pasangan kagem konsonan mati."
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
