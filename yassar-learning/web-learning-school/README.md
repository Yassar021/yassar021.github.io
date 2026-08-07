# 🎓 Website Guru IT SMP YPS Singkole

Platform pembelajaran digital untuk siswa Kelas 7 & 8 SMP YPS Singkole dalam mata pelajaran Teknologi Informasi dan Komputer.

## 📋 Fitur Utama

### 🏠 Halaman Website
- **Beranda** - Dashboard dengan akses cepat dan informasi terbaru
- **Tentang Saya** - Profil lengkap guru IT dengan kualifikasi dan pengalaman
- **Materi Ajar** - Koleksi materi pembelajaran per kelas dan semester
- **Kontak** - Formulir kontak dan informasi komunikasi

### 📚 Sistem Materi Pembelajaran
- **Kelas 7**
  - Semester 1: Dasar-dasar Komputer, Microsoft Office Dasar
  - Semester 2: Internet Dasar, Teknik Presentasi, Grafis Dasar
- **Kelas 8**
  - Semester 1: Pemrograman Dasar, Website Sederhana
  - Semester 2: Multimedia Dasar, Keamanan IT

### 🎯 Fitur Interaktif
- Pencarian materi pembelajaran
- Presentasi HTML interaktif
- Form kontak dengan validasi
- FAQ interaktif
- Responsive design untuk mobile dan desktop

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Animasi**: CSS Transitions & Animations
- **Icons**: Emoji dan Unicode Symbols
- **Font**: System Fonts (browser defaults)

## 📁 Struktur Folder

```
website-guru-it/
├── index.html                 # Halaman beranda
├── about.html                 # Halaman profil guru
├── materials.html             # Halaman materi ajar
├── contact.html               # Halaman kontak
├── README.md                  # Dokumentasi ini
├── assets/                    # Aset website
│   ├── css/
│   │   └── style.css         # CSS custom
│   ├── js/
│   │   └── main.js           # JavaScript utama
│   └── images/               # Folder gambar
└── materials/                # Materi pembelajaran
    ├── kelas-7/
    │   ├── semester-1/
    │   │   └── dasar-komputer.html
    │   └── semester-2/
    └── kelas-8/
        ├── semester-1/
        │   └── pemrograman-dasar.html
        └── semester-2/
```

## 🚀 Cara Menjalankan

### 1. Menggunakan Live Server (Recommended)
```bash
# Jika menggunakan VS Code:
1. Install extension "Live Server"
2. Klik kanan pada index.html
3. Pilih "Open with Live Server"
```

### 2. Menggunakan Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Lalu buka http://localhost:8000
```

### 3. Menggunakan Node.js
```bash
# Install http-server
npm install -g http-server

# Jalankan server
http-server

# Atau dengan port tertentu
http-server -p 8080
```

### 4. Membuka Langsung
Klik dua kali file `index.html` untuk membuka di browser.

## 📝 Cara Mengedit

### Mengedit Informasi Guru
Buka file `about.html` dan ubah:
- Nama dan foto guru
- Kualifikasi pendidikan
- Pengalaman mengajar
- Bidang keahlian
- Informasi kontak

### Menambah Materi Baru
1. Buat file HTML baru di folder `materials/`
2. Tambahkan link di `materials.html`
3. Ikuti template presentasi yang sudah ada

### Mengedit Konten
- **HTML**: Ubah struktur dan konten halaman
- **CSS**: Custom style di `assets/css/style.css`
- **JavaScript**: Fitur interaktif di `assets/js/main.js`

## 🎨 Kustomisasi

### Mengubah Warna Tema
Edit CSS variables di `assets/css/style.css`:
```css
:root {
  --primary-color: #3b82f6;    /* Biru utama */
  --secondary-color: #8b5cf6;  /* Ungu sekunder */
  --accent-color: #10b981;     /* Hijau aksen */
}
```

### Menambah Fitur Baru
1. **JavaScript**: Tambah fungsi baru di `main.js`
2. **CSS**: Tambah class baru di `style.css`
3. **HTML**: Tambah elemen baru di halaman yang relevan

## 📱 Responsive Design

Website sudah dioptimalkan untuk:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🔄 Update Konten

### Update Rutin
- Materi pembelajaran per semester
- Pengumuman terbaru
- Jadwal konsultasi
- Informasi kontak

### Best Practices
1. **Backup**: Selalu backup sebelum mengedit
2. **Test**: Test di berbagai browser dan device
3. **Validate**: Validasi HTML dan CSS
4. **Optimize**: Compress gambar dan optimalkan performa

## 🐶 Troubleshooting

### Masalah Umum
1. **Tidak tampil di browser**
   - Pastikan file HTML tidak error
   - Check path ke CSS dan JS files

2. **CSS tidak berfungsi**
   - Check link ke CSS file
   - Clear browser cache

3. **JavaScript tidak berjalan**
   - Check console untuk error
   - Pastikan script tag ada defer attribute

4. **Gambar tidak tampil**
   - Check path dan format gambar
   - Pastikan file gambar ada di folder yang benar

## 📞 Support

Untuk bantuan teknis:
- 📧 Email: guru.it@yps-singkole.sch.id
- 💬 WhatsApp: +62 812-3456-7890
- 📍 Lab Komputer SMP YPS Singkole

## 📄 Lisensi

Website ini dikembangkan untuk keperluan pendidikan di SMP YPS Singkole.
- ✅ Free untuk penggunaan edukasi
- ✅ Bisa dimodifikasi sesuai kebutuhan
- ✅ Open source untuk komunitas pendidikan

## 🙏 Kredit

Dikembangkan oleh:
- Tim IT SMP YPS Singkole
- Guru IT dan Tenaga Kependidikan
- Kontributor komunitas pendidikan digital

---

**📚 Mari majukan pendidikan digital Indonesia!**

*SMP YPS Singkole - Membangun Generasi Digital Unggul*