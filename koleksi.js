document.addEventListener("DOMContentLoaded", function () {
    
    // Config URL (Pastikan nama file PHP nya bener)
    const API_URL = 'api_products.php'; 
    const container = document.getElementById('wadah-ternak'); // Pastikan ID ini ada di HTML

    // Fungsi Load Data
    async function loadData() {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();

            // Cek kalau error dari PHP
            if(products.error) {
                console.error("PHP Error:", products.error);
                container.innerHTML = `<p class='text-danger text-center'>Error Database: ${products.error}</p>`;
                return;
            }

            container.innerHTML = ''; // Hapus loading

            if (products.length === 0) {
                container.innerHTML = '<p class="text-center">Belum ada stok ternak.</p>';
                return;
            }

            products.forEach(produk => {
                // Format Harga Rp
                const harga = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(produk.harga);

                // Template Kartu HTML
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card product-card h-100">
                            <div class="card-img-wrapper">
                                <img src="${produk.img}" class="card-img-top" alt="${produk.nama}" onerror="this.src='https://via.placeholder.com/300'">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${produk.nama}</h5>
                                <p class="price-tag text-success fw-bold">${harga}</p>
                                <p class="small text-muted">Stok: ${produk.stok}</p>
                                <button class="btn btn-primary w-100 btn-detail-view" 
                                    data-title="${produk.nama}"
                                    data-price="${harga}"
                                    data-stok="${produk.stok}"
                                    data-desc="${produk.desc}"
                                    data-spec="${produk.spec}"
                                    data-img="${produk.img}">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>`;
                container.innerHTML += card;
            });

            initModal(); // Aktifkan tombol detail

        } catch (err) {
            console.error(err);
            container.innerHTML = '<p class="text-center text-danger">Gagal koneksi ke server.</p>';
        }
    }

    // Fungsi Modal (Popup)
    function initModal() {
        const modal = document.getElementById("productModal");
        const closeBtn = document.querySelector(".close-modal");
        
        document.querySelectorAll(".btn-detail-view").forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                // Isi data ke modal
                document.getElementById("m-image").src = this.dataset.img;
                document.getElementById("m-title").innerText = this.dataset.title;
                document.getElementById("m-price").innerText = this.dataset.price;
                document.getElementById("m-stok").innerText = this.dataset.stok;
                document.getElementById("m-desc").innerText = this.dataset.desc;
                document.getElementById("m-spec").innerText = this.dataset.spec;
                
                // Link WA
                const hp = "628123456789"; 
                const pesan = `Halo, saya minat ${this.dataset.title}`;
                document.getElementById("m-wa-link").href = `https://wa.me/${hp}?text=${encodeURIComponent(pesan)}`;
                
                modal.style.display = "flex";
            });
        });

        if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
    }

    loadData();
});