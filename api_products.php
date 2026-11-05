<?php
// 1. Header agar bisa dibaca JavaScript (Frontend)
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// 2. Panggil koneksi database
require 'db.php';

// 3. Query ambil data dari tabel produk_ternak
// Pakai ORDER BY id DESC supaya produk terbaru muncul di atas
$query  = "SELECT id, nama, harga, stok, kategori, gambar, deskripsi FROM produk_ternak ORDER BY id DESC";
$result = mysqli_query($conn, $query);

$data = [];

// 4. Masukkan hasil query ke dalam array $data
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

// 5. Ubah array PHP menjadi format JSON
echo json_encode($data);

?>

