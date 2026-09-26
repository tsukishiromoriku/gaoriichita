<div align="center">

<!-- ========================================== -->
<!-- HERO & BANNER (Pixel-perfect exact replica) -->
<!-- ========================================== -->
<a href="#about-me">
  <img src="./github-profile.svg" alt="Full-stack Developer Profile" width="100%" style="max-width: 840px;" />
</a>

<br/><br/>

<!-- ========================================== -->
<!-- QUICK INTERACTIVE CONTACT & SOCIAL LINKS   -->
<!-- ========================================== -->
<p align="center">
  <a href="https://github.com/gaoriichita" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-18181b?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/nikita-khvatov" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="https://t.me/nikitakhvatov" target="_blank">
    <img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" />
  </a>
  &nbsp;
  <a href="https://facebook.com" target="_blank">
    <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" />
  </a>
  &nbsp;
  <a href="https://instagram.com" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
  </a>
</p>

</div>

---

<details>
<summary><b>🛠️ Cara Kustomisasi Data &amp; Foto Profil Kamu (Klik untuk Buka)</b></summary>
<br/>

Kamu bisa dengan sangat mudah mengubah seluruh nama, skill, riwayat pekerjaan, dan link sosial menjadi data milikmu sendiri:

### 1. Edit Data Profil
Buka file `profile-config.json` dan ganti isinya dengan data kamu:
- **`nameLine1` & `nameLine2`**: Nama depan & belakang kamu (contoh: `Dio`, `Pratama`).
- **`heroRole1` & `heroRole2`**: Judul profesi kamu (contoh: `Full-stack`, `Developer`).
- **`skillsFrontend`, `skillsBackend`, `skillsStyles`, `skillsDevops`**: Daftar teknologi yang kamu kuasai.
- **`works`**: Daftar riwayat pekerjaan & durasinya (ubah `active: true` pada baris pekerjaan yang ingin di-highlight putih seperti di foto).

### 2. Ganti Foto Profil Kamu
Simpan foto kamu di dalam folder `assets/profile.jpg`, lalu jalankan resize otomatis:
```powershell
Add-Type -AssemblyName System.Drawing
function Resize-Image($src, $dst, $w, $h) {
    $img = [System.Drawing.Image]::FromFile($src)
    $ratio = [Math]::Min($w / $img.Width, $h / $img.Height)
    $bmp = New-Object System.Drawing.Bitmap([int]($img.Width * $ratio), [int]($img.Height * $ratio))
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, 0, 0, $bmp.Width, $bmp.Height)
    $bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
Resize-Image "assets\profile.jpg" "assets\profile_thumb.jpg" 450 600
```

### 3. Generate Ulang SVG
Jalankan perintah ini di terminal:
```bash
node generate_profile_svg.js
```
File `github-profile.svg` beserta seluruh aset di `assets/` akan otomatis ter-update secara instan!

</details>

---

<div align="center">
  <sub>Designed with precision &amp; modern dark aesthetics. Feel free to star ⭐ this repository!</sub>
</div>
