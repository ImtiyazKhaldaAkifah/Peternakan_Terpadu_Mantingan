document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. NAVBAR RESPONSIVE (Wajib ada di setiap halaman) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Ubah icon hamburger jadi X (silang) saat aktif (Opsional)
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    }

    // --- 2. SCROLL ANIMATION (Biar card muncul pelan-pelan) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Animasi jalan saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target); // Hanya animasi sekali
            }
        });
    }, observerOptions);

    // Pilih semua elemen yang mau dianimasikan
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));

});