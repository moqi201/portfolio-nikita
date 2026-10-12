// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    // Library ini menangani animasi "fade-in-up" ketika user menscroll ke bagian About, Cards, dan Footer.
    AOS.init({
        once: true,           // Animasi hanya berjalan sekali saat pertama kali di-scroll
        offset: 100,          // Jarak (dalam px) dari elemen asal sebelum animasi dipicu
        duration: 800,        // Durasi animasi
        easing: 'ease-out-cubic', 
    });

    // 2. Set Dynamic Year on Footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Slideshow Logic for Project Cards
            const slideshowContainers = document.querySelectorAll('.slideshow-container');

            slideshowContainers.forEach(container => {
                const wrapper = container.querySelector('.slides-wrapper');
                const slides = container.querySelectorAll('.slide');
                const prevBtn = container.querySelector('.prev-btn');
                const nextBtn = container.querySelector('.next-btn');
                const dots = container.querySelectorAll('.dot');
                
                let currentIndex = 0;
                const totalSlides = slides.length;

                // Jika hanya ada 1 slide, sembunyikan tombol panah
                if (totalSlides <= 1) {
                    if(prevBtn) prevBtn.style.display = 'none';
                    if(nextBtn) nextBtn.style.display = 'none';
                    return; // Hentikan eksekusi script untuk container ini
                }

                function updateSlide(index) {
                    // Geser wrapper menggunakan transform translateX
                    wrapper.style.transform = `translateX(-${index * 100}%)`;
                    
                    // Update tampilan dots
                    dots.forEach((dot, i) => {
                        if (i === index) {
                            dot.classList.add('bg-white', 'scale-125');
                            dot.classList.remove('bg-white/50');
                        } else {
                            dot.classList.remove('bg-white', 'scale-125');
                            dot.classList.add('bg-white/50');
                        }
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Mencegah event click merambat
                        currentIndex = (currentIndex + 1) % totalSlides;
                        updateSlide(currentIndex);
                    });
                }

                if (prevBtn) {
                    prevBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                        updateSlide(currentIndex);
                    });
                }

                // Opsional: Klik pada dot untuk langsung menuju ke slide tertentu
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentIndex = index;
                        updateSlide(currentIndex);
                    });
                });
            });
    

            // 4. Interaksi Klik pada Polaroid Stack
    const polaroids = document.querySelectorAll('.polaroid-item');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke document
            
            // Cek apakah foto yang diklik sedang aktif (sudah naik)
            const isActive = polaroid.classList.contains('polaroid-active');

            // 1. Turunkan semua foto terlebih dahulu
            polaroids.forEach(p => p.classList.remove('polaroid-active'));

            // 2. Jika foto yang diklik sebelumnya belum aktif, naikkan!
            if (!isActive) {
                polaroid.classList.add('polaroid-active');
            }
        });
    });

    // Opsional: Klik di sembarang tempat (di luar foto) untuk mengembalikan foto ke tumpukan semula
    document.addEventListener('click', () => {
        polaroids.forEach(p => p.classList.remove('polaroid-active'));
    });
});