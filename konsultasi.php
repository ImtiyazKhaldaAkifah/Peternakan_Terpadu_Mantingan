<?php
$host = "localhost";
$user = "root"; 
$pass = "";
$db   = "db_mantingan"; // Pastikan nama database ini benar

$conn = mysqli_connect($host, $user, $pass, $db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari $_POST
    $nama         = mysqli_real_escape_string($conn, $_POST['nama_lengkap']);
    $whatsapp     = mysqli_real_escape_string($conn, $_POST['whatsapp']);
    $jenis_ternak = mysqli_real_escape_string($conn, $_POST['jenis_ternak']);
    $modal_awal   = mysqli_real_escape_string($conn, $_POST['modal_awal']);
    $luas_lahan   = mysqli_real_escape_string($conn, $_POST['luas_lahan']);

    $sql = "INSERT INTO konsultasi (nama_lengkap, whatsapp, jenis_ternak, modal_awal, luas_lahan) 
            VALUES ('$nama', '$whatsapp', '$jenis_ternak', '$modal_awal', '$luas_lahan')";

    if (mysqli_query($conn, $sql)) {
        echo "Berhasil Simpan ke Database";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
mysqli_close($conn);
?>