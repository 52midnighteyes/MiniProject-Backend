# GIT WORKFLOW GUIDE FOR TEAM

Panduan ini ditujukan untuk seluruh anggota tim yang bekerja dalam satu repository GitHub. Harap dibaca dengan seksama dan digunakan sebagai standar bersama untuk memastikan alur kerja yang rapi, konsisten, dan mudah dipahami semua pihak.

Dokumen ini diasumsikan kamu sudah meng-clone repository GitHub ke lokal (komputer masing-masing).

---

## 1. BUAT BRANCH SEBELUM NGODING

Sebelum mulai mengerjakan task apapun, **wajib membuat branch baru**.

### Kenapa harus bikin branch dulu?

- Supaya tidak mengganggu atau merusak kode utama (`main`)
- Memisahkan setiap fitur/perbaikan agar lebih rapi
- Bisa dikerjakan paralel oleh banyak orang tanpa konflik

### Cara membuat branch:

```bash
git checkout -b feature/nama-fitur
```

Contoh:

```bash
git checkout -b feature/login-api
```

Branch akan langsung aktif begitu dibuat.

---

## 2. KERJAKAN FITUR DI BRANCH TERSEBUT

Pastikan kamu tetap berada di branch yang baru kamu buat. Semua perubahan dan coding dilakukan di branch ini, **bukan di `main`**.

---

## 3. ADD DAN COMMIT PERUBAHAN

Setelah kamu menyelesaikan bagian dari pekerjaanmu, commit dengan standar berikut.

### Tambahkan file:

```bash
git add .
```

### Commit dengan pesan:

```bash
git commit -m "tipe: deskripsi singkat"
```

Contoh:

```bash
git commit -m "feat: implement login endpoint with JWT"
```

---

## 4. PUSH BRANCH KE GITHUB

Setelah commit, dorong branch kamu ke GitHub agar bisa dilihat dan direview tim:

```bash
git push origin feature/nama-fitur
```

Contoh:

```bash
git push origin feature/login-api
```

---

## 5. BUAT PULL REQUEST (PR)

Setelah branch berhasil di-push:

1. Buka repository di GitHub.
2. Akan muncul tombol “Compare & pull request”. Klik.
3. Tambahkan deskripsi fitur atau perbaikan yang kamu buat.
4. Assign reviewer jika diperlukan.
5. Klik “Create pull request”.

> Jangan melakukan merge ke `main` tanpa review atau persetujuan dari tim.

---

## 6. SINKRONKAN DENGAN MAIN (JIKA PERLU)

Jika branch `main` sudah mengalami perubahan karena orang lain sudah merge, kamu bisa menyelaraskan branch kamu dengan `main` menggunakan rebase.

### Langkah:

1. Pastikan kamu berada di branch `main`

```bash
git checkout main
git pull origin main
```

2. Kembali ke branch fitur:

```bash
git checkout feature/nama-fitur
```

3. Rebase:

```bash
git rebase main
```

Jika terjadi konflik:

- Selesaikan konflik di file
- Simpan file
- Jalankan:

```bash
git add .
git rebase --continue
```

---

## 7. STANDAR PENAMAAN BRANCH

Gunakan format berikut agar konsisten:

- `feature/nama-fitur` → untuk penambahan fitur
- `fix/nama-bug` → untuk perbaikan bug
- `chore/nama-setup` → untuk setup tooling atau konfigurasi
- `docs/nama-dokumen` → untuk dokumentasi

Contoh:

- `feature/register-user`
- `fix/login-error`
- `chore/setup-eslint`
- `docs/update-readme`

---

## 8. STANDAR PENULISAN COMMIT

Gunakan format commit berikut agar mudah dilacak:

```
tipe: deskripsi singkat
```

### Tipe commit yang umum digunakan:

| Tipe       | Kegunaan                                      |
| ---------- | --------------------------------------------- |
| `feat`     | Menambahkan fitur baru                        |
| `fix`      | Memperbaiki bug                               |
| `chore`    | Perubahan minor seperti setup, config, dll    |
| `docs`     | Perubahan pada dokumentasi                    |
| `refactor` | Perombakan kode tanpa mengubah fungsionalitas |
| `style`    | Perubahan format penulisan (bukan CSS)        |
| `test`     | Menambahkan atau mengubah test                |

### Contoh:

- `feat: add register endpoint`
- `fix: handle expired token correctly`
- `chore: setup dotenv config`
- `docs: update project README`

---

## 9. HAL-HAL YANG HARUS DIHINDARI

- Jangan coding di branch `main`.
- Jangan merge langsung ke `main` tanpa proses PR.
- Jangan push ke branch orang lain.
- Jangan rebase branch yang sudah di-push orang lain tanpa izin.

---

## 10. KESIMPULAN

- Selalu buat branch baru sebelum mengerjakan sesuatu.
- Gunakan penamaan branch dan commit yang konsisten.
- Lakukan push ke GitHub secara berkala.
- Semua perubahan harus melalui Pull Request.
- Rebase digunakan jika kamu perlu menyamakan branch-mu dengan branch `main`.

Dengan mengikuti alur ini, kerja tim akan lebih terstruktur dan kolaborasi antar anggota menjadi lebih aman dan terkontrol.
