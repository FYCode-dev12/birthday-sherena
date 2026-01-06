// config/content.ts
// FILE INI UNTUK SEMUA KONTEN - EDIT DI SINI UNTUK GANTI TEKS & WARNA

export const CONTENT = {
  // Informasi Utama
  name: "Sherena Florencia",
  pin: "0701", // Format: DDMM

  // Tema Warna - Ganti sesuai selera
  colors: {
    primary: "#ff69b4", // Pink utama
    secondary: "#ff1493", // Pink gelap
    light: "#ffc3e1", // Pink terang
    lighter: "#ffb3d9", // Pink sangat terang
    accent: "#ffa3d1", // Pink aksen
  },

  // Pesan Lock Screen
  lockScreen: {
    title: "🔒 Unlock Special Day",
    subtitle: "clue: Tanggal spesialmu",
    errorMessage: "💕 Eits~ coba ingat hari spesial kamu 💕",
  },

  // Game Screen
  game: {
    title: "💝 Find Our Memories 💝",
    successMessage: "🎉 Kamu berhasil! Sekarang lanjut ya 💖",
  },

  // Things You Love
  things: {
    title: "💗 Things You Love 💗",
    folders: [
      {
        icon: "🎵",
        title: "Lagu Favorit",
        youtubeUrl: "https://www.youtube.com/embed/yIPX-FNJ9qk?si=PRyEQupNtPkZjWTg",
        items: [
          "🎵 Sedia Aku Sebelum Hujan - Idgitaf",
          "🎶 Aku kurang yakin apakah kamu suka lagu ini atau tidak, tapi...",
          "💕 Lagu inilah yang sering banget kamu putar pas lagi telfonan",
        ],
      },
      {
        icon: "🎨",
        title: "Warna Favorit",
        isLetter: true,
        letter: `💗 PINK - Warna Favoritmu

Orang yang menyukai warna pink sering kali memiliki kepribadian yang tenang, penyayang, dan tulus, menunjukkan kepedulian yang tinggi terhadap perasaan orang lain serta kemampuan empati dan intuisi yang kuat.

Warna pink melambangkan cinta tanpa syarat, kasih sayang, harapan, dan kedamaian batin, serta memberikan perasaan hangat dan nyaman, sehingga sering dikaitkan dengan kelembutan, romansa, dan feminin.

Mereka cenderung mampu mengendalikan emosi dengan baik dan memiliki sifat yang mudah didekati serta tidak mengintimidasi.

Warna ini juga dapat mencerminkan kebutuhan akan penerimaan, dukungan, dan cinta tanpa syarat dari orang lain.`,
      },
      {
        icon: "📸",
        title: "Foto",
        items: [
          "📷 Lihat koleksi foto-foto kenangan kita",
          "💑 Momen-momen terindah",
          "🌟 Setiap senyuman tersimpan di sini",
          "💝 Klik untuk melihat galeri lengkap",
        ],
      },
      {
        icon: "🍰",
        title: "Rasa Favorit",
        items: [
          "🍮 Caramel - Manis dan creamy",
          "🍵 Matcha - Unik dan menenangkan",
          "🍓 Strawberry - Segar dan manis",
          "🧀 Keju - Gurih dan lezat",
        ],
      },
      {
        icon: "💌",
        title: "Surat untuk Kamu",
        isLetter: true,
        letter: `Dear Sherena Florencia,

Happy Birthday ya sayangku 🤍
Selamat ulang tahun untuk orang paling spesial dalam hidupku. Hari ini bukan sekadar tanggal di kalender, tapi hari yang sangat berarti—hari di mana seseorang yang begitu berharga lahir ke dunia dan tanpa sadar, kelak menjadi bagian terpenting dalam hidupku.

Terima kasih karena sudah hadir dalam hidupku, karena sudah memilih untuk berjalan bersamaku sejauh ini. Terima kasih untuk setiap senyuman yang selalu bisa menenangkanku, setiap tawa yang membuat hariku terasa lebih ringan, dan setiap momen kecil yang tanpa kamu sadari justru sangat berarti bagiku. Bersamamu, hal-hal sederhana terasa lebih indah.

Aku bersyukur bisa mengenalmu apa adanya—dengan segala kelebihanmu, kekuatanmu, juga sisi rapuhmu. Terima kasih karena selalu berusaha, karena tidak pernah menyerah, dan karena tetap menjadi dirimu sendiri. Kamu adalah pribadi yang luar biasa, dan aku harap kamu selalu ingat betapa berharganya dirimu.

Di usia yang baru ini, aku berdoa semoga kamu selalu diberi kesehatan, kebahagiaan, dan kedamaian hati. Semoga setiap langkahmu dimudahkan, setiap impianmu satu per satu bisa terwujud, dan setiap harapan baikmu menemukan jalannya. Semoga kamu selalu dikelilingi oleh cinta—cinta dari orang-orang yang menyayangimu, dan juga cintaku yang akan selalu ada untukmu.

Terima kasih sudah menjadi bagian dari hidupku. Terima kasih sudah membuat hariku lebih berwarna. Aku berharap bisa terus ada di sampingmu, menemani setiap proses, setiap cerita, dan setiap bab baru dalam hidupmu.

Sekali lagi, selamat ulang tahun ya sayang.
Tetaplah menjadi Sherena yang aku kenal dan aku sayangi 🤍

Dengan penuh cinta,
Yoel`,
      },
    ],
  },

  // Cake Screen
  cake: {
    title: "🎉 Make a Wish! 🎉",
    instructionLight: "Arahkan cursor ke lilin untuk menyalakan 🔥",
    instructionBlow: "Sekarang tiup lilinnya! 💨",
    candleCount: 5,
  },

  // Finale
  finale: {
    title: "✨ Happy Birthday Sherena! ✨",
    subtitle:
      "Semoga hari-harimu spesial selalu sehingga penuh kebahagiaan!! 💕",
  },
};

// Emojis untuk game matching
export const GAME_EMOJIS = [
  "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767709478/IMG-20251116-WA0034_2_wbpxqk.jpg",
  "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767711430/20260106_212237_zntbd8.png",
  "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767709479/IMG-20251119-WA0085_2_mgfaxj.jpg",
  "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767710323/copy_of_img_1666_20260106_212557_0000_2_w0krgt_49b104.jpg",
  "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767710578/copy_of_img_1669_20260106_212531_0000_2_e7jriz_bcd617.jpg",
];

// Gallery Foto Kenangan
export const PHOTO_GALLERY = {
  title: "📸 How Beautiful You Are 📸",
  subtitle: "Si cantik yang suka tantrum 💕",
  photos: [
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714198/20260106_221906_nqhbue.png",
      caption: "Pamer Bunga Dia 🌸",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714198/20260106_222048_bvpxdn.png",
      caption: "Pulang Gereja ><⛪",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714198/20260106_221943_ds5uot.png",
      caption: "Si Suka Melet Wle😝",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714197/20260106_222317_znkr2z.png",
      caption: "Kalo Ini Sumpah Cakep Abis ✨",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714192/20260106_222233_d0vpsh.png",
      caption: "With Her Fav Color 💗",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714191/20260106_222109_d7u3o5.png",
      caption: "Jametttt 😂",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714191/20260106_222020_tjsyj1.png",
      caption: "Bibir Maju 😘",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714188/IMG-20251224-WA0078_2_pehd2j.jpg",
      caption: "Sebelum Ibadah 🙏",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714188/20260106_222133_tswffa.png",
      caption: "Kurang Deket Kak 🩷",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714163/20260106_222415_acctfe.png",
      caption: "Aww Aku Digigit Jedai ‼️",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714161/IMG_20251119_235652_817_2_zuwfbe.jpg",
      caption: "Hehehee 😅",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714157/IMG-20260104-WA0020_2_b2fi5d.jpg",
      caption: "Beautiful 🙀",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714155/IMG-20251115-WA0015_2_axbd1j.jpg",
      caption: "Very Beautiful Hair 💇‍♀️",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714153/IMG-20251112-WA0004_2_a2u0ue.jpg",
      caption: "Very Cute 🐱",
    },
    {
      url: "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767714152/IMG-20251129-WA0047_2_lu7n5d.jpg",
      caption: "Sangat Effort Sekali Untuk Foto Ini 💪",
    },
  ],
};
