document.getElementById('formKonseling').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

// --- BAGIAN UPDATE FETCH ---
const formData = new FormData(this);

fetch('konsultasi.php', {
    method: 'POST',
    body: formData
})
.then(response => response.text())
.then(data => {
    console.log("Respon Server:", data); // Lihat di console F12, muncul tulisan apa?
})
.catch(error => {
    console.error('Koneksi Terputus:', error);
});
    // --- AKHIR BAGIAN BARU ---

    // 1. AMBIL DATA DARI INPUT (Lanjutkan kode lama kamu...)
    let nama = document.getElementById('nama').value;
    let ternak = document.getElementById('jenis_ternak').value;
    let modal = document.getElementById('modal').value;
    let lahan = parseFloat(document.getElementById('ukuran_lahan').value);

    // ... (Sisa kode dataSolusi dan logika tampilan kamu tetap sama di bawahnya) ...
    // Validasi lahan (kalo user isi 0 atau kosong)
    if (isNaN(lahan) || lahan <= 0) {
        alert("Mohon isi ukuran lahan dengan benar.");
        return;
    }

    // 2. DATA SOLUSI (DATABASE SEDERHANA)
    let dataSolusi = {
        'lele': {
            judul: "Juragan Lele Bioflok / Kolam",
            deskripsi: "Lele adalah pilihan tepat untuk lahan terbatas & perputaran modal cepat. Dengan lahan " + lahan + "m², Anda bisa memulai sistem padat tebar.",
            strategi_pakan: "Gunakan pelet apung protein 30-32%. Bisa dicampur probiotik agar air tidak cepat bau. Alternatif: Maggot BSF.",
            kapasitas_rumus: function(l) { return Math.floor(l * 150) + " - " + Math.floor(l * 200) + " Ekor (Sistem Bioflok)"; },
            langkah: [
                "Siapkan kolam terpal bulat/kotak sesuai ukuran lahan.",
                "Isi air dan endapkan selama 5-7 hari (Penting!).",
                "Beli bibit ukuran 5-7 cm agar daya hidup tinggi.",
                "Lakukan sortir ukuran setiap 2 minggu sekali."
            ],
            tips: "Jaga kualitas air. Air hijau muda itu bagus, kalau sudah bau busuk segera ganti 30% airnya.",
            risiko: "Kanibalisme tinggi jika telat makan. Jamur pada kulit ikan."
        },
        'ayam_petelur': {
            judul: "Peternak Telur Mandiri",
            deskripsi: "Bisnis stabil dengan pendapatan harian. Lahan " + lahan + "m² cocok untuk kandang baterai. Fokus utama adalah kualitas pakan.",
            strategi_pakan: "Wajib pakan jadi/konsentrat khusus petelur (Jagung 50%, Konsentrat 35%, Bekatul 15%). Jangan telat air minum!",
            kapasitas_rumus: function(l) { return Math.floor(l * 8) + " - " + Math.floor(l * 12) + " Ekor (Sistem Baterai bertingkat)"; },
            langkah: [
                "Bangun kandang atap monitor (sirkulasi udara lancar).",
                "Siapkan kandang baterai kawat.",
                "Beli ayam fase 'Pullet' (siap bertelur) usia 13-16 minggu.",
                "Vaksinasi rutin ND/IB wajib dilakukan."
            ],
            tips: "Lampu penerangan malam hari penting untuk merangsang produksi telur.",
            risiko: "Ayam stress (berhenti bertelur) karena suara gaduh/panas. Penyakit Snot/Flu Burung."
        },
        'sapi': {
            judul: "Juragan Sapi Penggemukan",
            deskripsi: "Investasi jangka panjang dengan keuntungan besar saat Idul Adha. Lahan " + lahan + "m² bisa digunakan untuk kandang koloni.",
            strategi_pakan: "70% Hijauan (Rumput Gajah/Odot), 30% Konsentrat (Ampas tahu, dedak). Fermentasi jerami sangat disarankan.",
            kapasitas_rumus: function(l) { return Math.floor(l / 4) + " Ekor Sapi (Asumsi 4m² per ekor)"; },
            langkah: [
                "Buat kandang dengan lantai semen kasar (agar tidak terpeleset).",
                "Buat saluran pembuangan kotoran ke belakang.",
                "Cari bibit Sapi Limosin/Simental kurus tapi sehat tulangannya.",
                "Berikan obat cacing di awal masuk kandang."
            ],
            tips: "Mandikan sapi setiap pagi agar nafsu makan naik. Kebersihan kandang adalah kunci bobot naik.",
            risiko: "Kembung perut (Bloat) karena pakan basah/muda. Penyakit Kuku Mulut (PMK)."
        },
        'kambing': {
            judul: "Peternak Kambing Modern",
            deskripsi: "Cocok untuk breeding atau penggemukan aqiqah. Kandang panggung wajib di lahan " + lahan + "m² agar kesehatan terjaga.",
            strategi_pakan: "Legum (Indigofera, Kaliandra) dan silase rumput. Berikan garam beryodium/mineral block.",
            kapasitas_rumus: function(l) { return Math.floor(l / 1.5) + " Ekor (Asumsi 1.5m² per ekor)"; },
            langkah: [
                "Buat kandang panggung (jarak lantai ke tanah min. 50cm).",
                "Sekat kandang per ekor (untuk penggemukan) atau koloni (untuk breeding).",
                "Siapkan bank pakan (tanam rumput) sebelum beli kambing.",
                "Pilih bibit Jawa Randu atau PE yang adaptif."
            ],
            tips: "Kotoran kambing (Srilntil) bisa difermentasi jadi pupuk bernilai jual tinggi.",
            risiko: "Kembung (Masuk angin), Kudis (Scabies), dan Cacingan."
        }
    };

    // 3. PROSES & TAMPILKAN HASIL
    let hasil = dataSolusi[ternak];

    if(hasil) {
        // Isi teks ke HTML
        document.getElementById('nama_profil').innerText = hasil.judul;
        document.getElementById('deskripsi_profil').innerText = hasil.deskripsi;
        document.getElementById('rekomendasi_ternak').innerText = hasil.strategi_pakan;
        
        // Hitung Kapasitas
        let kapasitas = hasil.kapasitas_rumus(lahan);
        document.getElementById('estimasi_modal').innerText = "Potensi muat: " + kapasitas;

        // Render List Langkah
        let listLangkah = document.getElementById('langkah_memulai');
        listLangkah.innerHTML = ""; // Bersihkan dulu
        hasil.langkah.forEach(function(item) {
            let li = document.createElement('li');
            li.innerText = item;
            li.classList.add("list-group-item");
            listLangkah.appendChild(li);
        });

        // Tips & Risiko
        document.getElementById('tips_edukasi').innerText = hasil.tips;
        document.getElementById('risiko').innerText = hasil.risiko;

        // Munculkan Box Hasil
        document.getElementById('hasil').style.display = 'block';
        document.getElementById('hasil').scrollIntoView({ behavior: 'smooth' });
    }
});

// 4. FUNGSI KIRIM KE WA (Supaya data masuk ke kamu)
function konsultasiKeWA() {
    let nama = document.getElementById('nama').value;
    let wa = document.getElementById('whatsapp').value;
    let ternak = document.getElementById('jenis_ternak').value;
    let profil = document.getElementById('nama_profil').innerText;
    let deskripsi = document.getElementById('deskripsi_profil').innerText;

    // GANTI NOMOR ADMIN DI SINI (Format 628...)
    let nomorAdmin = "6282325875785"; 

    let pesan = `Halo Admin, saya *${nama}* (${wa}).%0A` +
                `Saya sudah cek potensi ternak di website.%0A%0A` +
                `*Hasil Analisis:* ${profil}%0A` +
                `*Rencana Ternak:* ${ternak}%0A` +
                `*Ringkasan:* ${deskripsi}%0A%0A` +
                `Saya ingin konsultasi lebih lanjut untuk pengadaan bibit/pakan. Mohon dibantu.`;

    window.open(`https://wa.me/${nomorAdmin}?text=${pesan}`, "_blank");
}