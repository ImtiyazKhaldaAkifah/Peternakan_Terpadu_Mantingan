<?php
require 'db.php'; 

// Ambil data log, yang terbaru ada di paling atas
$query  = "SELECT * FROM log_produk ORDER BY waktu DESC";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Log Aktivitas Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
</head>
<body class="bg-light">

<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold"><i class="bi bi-journal-text text-success"></i> Riwayat Perubahan Data</h3>
        <a href="admin.html" class="btn btn-outline-secondary rounded-pill px-4">
            <i class="bi bi-arrow-left"></i> Kembali ke Dashboard
        </a>
    </div>

    <div class="card shadow-sm border-0" style="border-radius: 15px;">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th class="ps-4">Waktu</th>
                        <th>Aksi</th>
                        <th>Nama Produk</th>
                        <th>Detail Perubahan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row = mysqli_fetch_assoc($result)): ?>
                    <tr>
                        <td class="ps-4 small text-muted"><?= date('d M, H:i', strtotime($row['waktu'])) ?></td>
                        <td>
                            <?php 
                                $class = "bg-success";
                                if($row['aksi'] == 'UPDATE') $class = "bg-warning text-dark";
                                if($row['aksi'] == 'HAPUS') $class = "bg-danger";
                            ?>
                            <span class="badge <?= $class ?>"><?= $row['aksi'] ?></span>
                        </td>
                        <td><strong><?= $row['nama_produk_log'] ?></strong></td>
                        <td class="text-secondary small"><?= $row['keterangan'] ?></td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

</body>
</html>