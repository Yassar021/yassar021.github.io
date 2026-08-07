# Personal Website Guru IT SMP YPS Singkole

## 🎯 **Target Pengguna Spesifik**

- **Siswa Kelas 7 & 8** SMP YPS Singkole
- **Orang Tua/Wali** siswa
- **Rekan Guru** dan tenaga kependidikan

## 🚀 **Alur Aplikasi yang Disempurnakan**

### Struktur Navigasi Utama

```
Beranda
├── Tentang Saya (Biografi Guru)
├── Materi Kelas 7
│   ├── [Semester 1]
│   └── [Semester 2]
├── Materi Kelas 8
│   ├── [Semester 1]
│   └── [Semester 2]
└── Kontak & Media Sosial
```

## ✨ **Fitur Khusus untuk Guru IT**

### 1. **Sistem Materi Berbasis Kelas**

```html
<!-- Struktur Navigasi Materi -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Kelas 7 -->
  <div class="class-card">
    <h3>Kelas 7</h3>
    <ul>
      <li>
        Semester 1
        <ul>
          <li><a href="#dasar-komputer">Dasar-dasar Komputer</a></li>
          <li><a href="#office-dasar">Microsoft Office Dasar</a></li>
        </ul>
      </li>
      <li>
        Semester 2
        <ul>
          <li><a href="#internet-dasar">Internet Dasar</a></li>
          <li><a href="#presentasi">Teknik Presentasi</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- Kelas 8 -->
  <div class="class-card">
    <h3>Kelas 8</h3>
    <ul>
      <li>
        Semester 1
        <ul>
          <li><a href="#pemrograman-dasar">Pemrograman Dasar</a></li>
          <li><a href="#web-sederhana">Website Sederhana</a></li>
        </ul>
      </li>
      <li>
        Semester 2
        <ul>
          <li><a href="#multimedia">Multimedia Dasar</a></li>
          <li><a href="#keamanan-it">Keamanan IT</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
```

### 2. **Sistem Presentasi Hybrid (HTML + Canva)**

#### Untuk File HTML:

```html
<div class="presentation-card">
  <h4>Pengenalan Komputer</h4>
  <p>Materi tentang komponen dasar komputer</p>
  <a
    href="presentations/computer-basics.html"
    target="_blank"
    class="bg-blue-500 text-white px-4 py-2 rounded"
  >
    📊 Buka Presentasi HTML
  </a>
</div>
```

#### Untuk Link Canva:

```html
<div class="presentation-card">
  <h4>Sejarah Internet</h4>
  <p>Perkembangan internet dari masa ke masa</p>
  <a
    href="https://www.canva.com/design/example"
    target="_blank"
    class="bg-purple-500 text-white px-4 py-2 rounded"
  >
    🎨 Buka Presentasi Canva
  </a>
</div>
```

### 3. **Biografi Guru IT yang Komprehensif**

```html
<section id="biography">
  <div class="teacher-profile">
    <img src="profile.jpg" alt="Foto Guru IT" class="profile-img" />
    <div class="profile-info">
      <h2>Guru IT SMP YPS Singkole</h2>
      <div class="credentials">
        <h3>Kualifikasi:</h3>
        <ul>
          <li>📚 Pendidikan: S1/S2 bidang IT/Komputer</li>
          <li>🏆 Sertifikasi: Guru Professional</li>
          <li>⏰ Pengalaman Mengajar: X tahun</li>
        </ul>
      </div>
      <div class="expertise">
        <h3>Bidang Keahlian:</h3>
        <div class="skill-tags">
          <span class="tag">Pemrograman Dasar</span>
          <span class="tag">Office Application</span>
          <span class="tag">Web Development</span>
          <span class="tag">Multimedia</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 🎨 **Struktur Folder yang Direkomendasikan**

```
website-guru-it/
├── index.html (Beranda)
├── about.html (Biografi)
├── materials/
│   ├── kelas-7/
│   │   ├── semester-1/
│   │   │   ├── presentasi-1.html
│   │   │   └── presentasi-2.html
│   │   └── semester-2/
│   └── kelas-8/
│       ├── semester-1/
│       └── semester-2/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── profile.jpg
│       └── thumbnails/
└── contact.html
```

## 💡 **Fitur Tambahan yang Berguna**

### 4. **Dashboard Siswa**

- Kalender akademik
- Deadline tugas/tugas
- Pengumuman penting
- Link resources tambahan

### 5. **Tools Pembelajaran**

```html
<!-- Quick Access Tools -->
<div class="tools-grid">
  <a href="#" class="tool-card">
    <span>📅</span>
    <span>Jadwal Pelajaran</span>
  </a>
  <a href="#" class="tool-card">
    <span>📝</span>
    <span>Download Modul</span>
  </a>
  <a href="#" class="tool-card">
    <span>🎬</span>
    <span>Video Tutorial</span>
  </a>
  <a href="#" class="tool-card">
    <span>💬</span>
    <span>Forum Tanya Jawab</span>
  </a>
</div>
```

### 6. **Sistem Pencarian Materi**

```javascript
// Fitur pencarian sederhana
function searchMaterials() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const materials = document.querySelectorAll(".material-card");

  materials.forEach((material) => {
    const title = material.querySelector("h4").textContent.toLowerCase();
    const description = material.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      material.style.display = "block";
    } else {
      material.style.display = "none";
    }
  });
}
```

## 📱 **Responsive Design dengan Tailwind**

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guru IT - SMP YPS Singkole</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-blue-600 text-white p-4">
      <div
        class="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-xl font-bold mb-4 md:mb-0">
          Guru IT SMP YPS Singkole
        </div>
        <div class="flex space-x-4">
          <a href="index.html" class="hover:underline">Beranda</a>
          <a href="about.html" class="hover:underline">Tentang Saya</a>
          <a href="materials.html" class="hover:underline">Materi Ajar</a>
          <a href="contact.html" class="hover:underline">Kontak</a>
        </div>
      </div>
    </nav>

    <!-- Content akan disesuaikan per halaman -->

    <footer class="bg-blue-600 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        &copy; 2024 Guru IT SMP YPS Singkole. All rights reserved.
      </div>
    </footer>
  </body>
</html>
```

## 🎯 **Rencana Implementasi Tahapan**

### **Fase 1 (Minggu 1-2)**

- Setup struktur dasar website
- Halaman beranda dan biografi
- Upload 2-3 materi per kelas

### **Fase 2 (Minggu 3-4)**

- Sistem navigasi kelas 7 & 8
- Fitur pencarian materi
- Responsive design optimization

### **Fase 3 (Minggu 5-6)**

- Tools pembelajaran tambahan
- Integrasi media sosial
- Testing dan feedback dari siswa

Website ini akan menjadi **platform pembelajaran digital** yang sangat membantu proses belajar mengajar IT di SMP YPS Singkole! 🚀
