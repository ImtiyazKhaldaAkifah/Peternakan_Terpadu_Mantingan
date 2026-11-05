document.addEventListener('DOMContentLoaded', () => {
    
    // 1.Navbar Scroll Effect 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    // Jika di-scroll lebih dari 50px ke bawah
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        // Jika kembali ke paling atas
        navbar.classList.remove('scrolled');
    }
});

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Simple hamburger animation toggle
        hamburger.classList.toggle('open');
    });

    // 3. Typing Effect (Simulasi mengetik)
    const typingSpan = document.querySelector('.typing-text');
    const words = ["Cerdas.", "Efisien.", "Produktif.", "Untung."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Lebih cepat saat menghapus
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Kecepatan mengetik normal
        }

        // Logic warna text (Gradient effect pada text yang diketik)
        typingSpan.style.background = "linear-gradient(135deg, #10B981, #059669)";
        typingSpan.style.webkitBackgroundClip = "text";
        typingSpan.style.webkitTextFillColor = "transparent";

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause setelah selesai mengetik kata
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    // Jalankan typing effect
    type();

    // 4. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animasi hanya berjalan sekali
            }
        });
    }, {
        threshold: 0.15, // Elemen terlihat 15% baru animasi jalan
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

});
// --- Filter Produk ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus class active dari semua tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        // Tambah class active ke tombol yang diklik
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block'; // Munculkan
            } else {
                card.style.display = 'none'; // Sembunyikan
            }
        });
    });
});
// === LOGIC MODAL DETAIL PRODUK ===
const modalOverlay = document.getElementById('shopeeModal');
const closeModalBtn = document.querySelector('.close-modal');
const detailButtons = document.querySelectorAll('.btn-detail-view');

// Elemen di dalam modal yang mau diisi
const mImg = document.getElementById('m-image');
const mTitle = document.getElementById('m-title');
const mPrice = document.getElementById('m-price');
const mDesc = document.getElementById('m-desc');
const mSpec = document.getElementById('m-spec');
const mStok = document.getElementById('m-stok');
const mWaLink = document.getElementById('m-wa-link');

// 1. Saat tombol Detail diklik
detailButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Ambil data dari atribut tombol
        const img = this.getAttribute('data-img');
        const title = this.getAttribute('data-title');
        const price = this.getAttribute('data-price');
        const desc = this.getAttribute('data-desc');
        const spec = this.getAttribute('data-spec');
        const stok = this.getAttribute('data-stok');

        // Isi ke dalam modal
        mImg.src = img;
        mTitle.innerText = title;
        mPrice.innerText = price;
        mDesc.innerText = desc;
        mSpec.innerText = spec;
        mStok.innerText = stok;

        // Bikin Link WA Otomatis
        const textWA = `Halo Admin, saya tertarik membeli *${title}* seharga ${price}. Apakah stok masih ada?`;
        mWaLink.href = `https://wa.me/6281234567890?text=${encodeURIComponent(textWA)}`;

        // Tampilkan Modal
        modalOverlay.style.display = 'flex';
    });
});

// 2. Tutup Modal (Klik Silang)
closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// 3. Tutup Modal (Klik Luar Kotak)
window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});
// --- TESTIMONIAL AUTO SLIDER ---
const track = document.getElementById('sliderTrack');
const cards = document.querySelectorAll('.testi-card');
let currentIndex = 0;

// Cek lebar layar untuk menentukan mau geser berapa % (HP 100%, Laptop 50%)
function getCardWidth() {
    const containerWidth = document.querySelector('.slider-container').offsetWidth;
    // Jika layar lebar (laptop), kita asumsikan nampilin 2 kartu, jadi gesernya 50% + gap
    // Untuk simplenya, kita geser berdasarkan index dikali lebar 1 item
    return cards[0].offsetWidth + 30; // 30 adalah gap di CSS
}

function slideTestimonial() {
    currentIndex++;
    
    // Kalau sudah sampai kartu terakhir, balik ke awal
    // Logika: Jumlah kartu total dikurangi kartu yang tampil di layar
    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = cards.length - cardsPerView;

    if (currentIndex > maxIndex) {
        currentIndex = 0; // Reset ke awal
    }

    // Hitung jarak geser
    const slideAmount = currentIndex * getCardWidth();
    
    // Terapkan geseran
    track.style.transform = `translateX(-${slideAmount}px)`;
}

// Jalankan otomatis setiap 3000ms (1 detik)
let autoSlide = setInterval(slideTestimonial, 3000);

// Opsional: Berhenti geser kalau mouse diarahkan ke slider (biar user bisa baca)
track.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

// Lanjut jalan lagi kalau mouse keluar
track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(slideTestimonial, 3000);
});

// Update ukuran kalau layar di resize
window.addEventListener('resize', () => {
    // Reset posisi biar ga berantakan pas resize
    currentIndex = 0;
    track.style.transform = `translateX(0)`;
});
// --- LOGIC NAVBAR SCROLL & MOBILE --- //

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 1. Efek Scroll (Mengecil & Blur)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Kalau discroll lebih dari 50px, tambah class 'scrolled'
        navbar.classList.add('scrolled');
    } else {
        // Kalau balik ke atas, hapus class 'scrolled'
        navbar.classList.remove('scrolled');
    }
});

// 2. Logic Hamburger Menu (Buka Tutup di HP)
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 3. Tutup menu pas link diklik (Biar ga nutupin layar)
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));