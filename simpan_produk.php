<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pastikan input 'aksi' ada agar tidak error
    $aksi = isset($_POST['aksi']) ? $_POST['aksi'] : "";
    $pesan = "Gagal memproses data."; // Pesan default jika query gagal

    // Ambil data dari form
    $nama      = mysqli_real_escape_string($conn, $_POST['nama']);
    $harga     = (int)$_POST['harga'];
    $stok      = (int)$_POST['stok'];
    $kategori  = mysqli_real_escape_string($conn, $_POST['kategori']);
    $gambar    = mysqli_real_escape_string($conn, $_POST['gambar']);
    $deskripsi = mysqli_real_escape_string($conn, $_POST['deskripsi']);

    if ($aksi == "tambah") {
        // GANTI 'hewan' JADI 'produk_ternak'
        $query = "INSERT INTO produk_ternak (nama, harga, stok, kategori, gambar, deskripsi) 
                  VALUES ('$nama', $harga, $stok, '$kategori', '$gambar', '$deskripsi')";
        if (mysqli_query($conn, $query)) $pesan = "✅ Data berhasil disimpan!";
    } 
    
    elseif ($aksi == "edit") {
        $id = $_POST['id'];
        // GANTI 'hewan' JADI 'produk_ternak'
        $query = "UPDATE produk_ternak SET 
                    nama='$nama', harga=$harga, stok=$stok, 
                    kategori='$kategori', gambar='$gambar', deskripsi='$deskripsi' 
                  WHERE id=$id";
        if (mysqli_query($conn, $query)) $pesan = "✏️ Data berhasil diperbarui!";
    } 
    
    elseif ($aksi == "hapus") {
        $id = $_POST['id_hapus'];
        // GANTI 'hewan' JADI 'produk_ternak'
        $query = "DELETE FROM produk_ternak WHERE id=$id";
        if (mysqli_query($conn, $query)) $pesan = "🗑️ Data berhasil dihapus!";
    }

    // Tampilkan alert dan pindah halaman
    echo "<script>
            alert('$pesan');
            window.location.href = 'admin.html';
          </script>";
}
?>