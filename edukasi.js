// Ambil semua tombol filter dan semua kartu artikel
const filterBtns = document.querySelectorAll('.filter-btn');
const articles = document.querySelectorAll('.article-card');

// Tambahkan event click ke setiap tombol
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Hapus class 'active' dari semua tombol, tambah ke tombol yang diklik
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Ambil nilai filter dari tombol yang diklik
        const filterValue = btn.getAttribute('data-filter');

        // 3. Cek setiap artikel
        articles.forEach(article => {
            if (filterValue === 'all' || article.getAttribute('data-category') === filterValue) {
                article.style.display = 'block'; // Tampilkan
                
                // Efek animasi muncul pelan
                article.style.opacity = '0';
                setTimeout(() => article.style.opacity = '1', 50);
            } else {
                article.style.display = 'none'; // Sembunyikan
            }
        });
    });
});