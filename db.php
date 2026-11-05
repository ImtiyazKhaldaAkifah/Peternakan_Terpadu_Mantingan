<?php
$host = "localhost";
$user = "root"; // Default XAMPP adalah root
$pass = "";     // Default XAMPP adalah kosong
$db   = "db_mantingan";

$conn = new mysqli($host, $user, $pass, $db);

// Cek apakah koneksi berhasil
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>