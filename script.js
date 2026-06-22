document.addEventListener('DOMContentLoaded', () => {
    // IBAN Kopyalama İşlevi (Kutunun Tıklanmasıyla)
    const ibanBox = document.getElementById('iban-box');
    const ibanNumber = document.getElementById('iban-number').innerText.replace(/\s+/g, ''); // Extract raw IBAN without spaces
    const toast = document.getElementById('toast');

    ibanBox.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(ibanNumber);

            // Görsel geribildirim (Toast sağ altta)
            toast.classList.add('show');

            // 3 saniye sonra geri sakla
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } catch (err) {
            console.error('Kopyalama başarısız oldu!', err);
            toast.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Kopyalama hatası!';
            toast.style.background = '#e6554d';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                // Eski haline döndür
                setTimeout(() => {
                    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> IBAN kopyalandı';
                    toast.style.background = '#4caf50';
                }, 500);
            }, 3000);
        }
    });

    // Tema Değiştirme
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Arkaplan Pati Animasyonu
    const bgAnimation = document.getElementById('bg-animation');
    const pawCount = 12; // Ekranda süzülecek pati sayısı

    for (let i = 0; i < pawCount; i++) {
        createPaw(bgAnimation);
    }
});

function createPaw(container) {
    const paw = document.createElement('i');

    // Rastgele ikon seçimi (Pati, Köpek, Kedi)
    const icons = ['fa-paw', 'fa-dog', 'fa-cat'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    paw.classList.add('fa-solid', randomIcon, 'paw-icon');

    // Rastgele özellikler ata
    const size = Math.random() * 2.5 + 1.5; // 1.5rem ile 4rem arası (biraz daha büyük logolar)
    const left = Math.random() * 100; // 0% ile 100% arası pozisyon
    const duration = Math.random() * 20 + 15; // 15s ile 35s arası (yavaş süzülme)
    const delay = Math.random() * 15; // 0s ile 15s arası gecikme

    paw.style.fontSize = `${size}rem`;
    paw.style.left = `${left}vw`;
    paw.style.animationDuration = `${duration}s`;
    paw.style.animationDelay = `${delay}s`;

    container.appendChild(paw);
}

// Yaşam Alanımız 3'lü Carousel Animasyonu
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let centerIndex = 0; // Ortadaki resmin indexi

if (slides.length > 0) {

    function updateGallery() {
        // Önce tüm classları temizle
        slides.forEach(slide => {
            slide.className = 'slide'; // Sadece 'slide' kalır
        });

        // Eğer resim sayısı en az 3 ise 3'lü gösterimi yaparız
        // Aksi durumda sadece center gösteririz ama bizde 3 resim var garanti
        let leftIndex = (centerIndex - 1 + slides.length) % slides.length;
        let rightIndex = (centerIndex + 1) % slides.length;

        slides[leftIndex].classList.add('active-left');
        slides[centerIndex].classList.add('active-center');
        slides[rightIndex].classList.add('active-right');
    }

    // İlk açılışta yerleşim
    updateGallery();

    nextBtn.addEventListener('click', () => {
        centerIndex = (centerIndex + 1) % slides.length;
        updateGallery();
    });

    prevBtn.addEventListener('click', () => {
        centerIndex = (centerIndex - 1 + slides.length) % slides.length;
        updateGallery();
    });

    // Sağdaki veya soldaki resme tıklayınca o resmi ortaya alma
    // Ortadaki resme tıklayınca resmi büyütme (Lightbox)
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (centerIndex === index) {
                // Ortadaki (aktif) resme tıklandıysa büyüt
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                if (lightbox && lightboxImg) {
                    lightboxImg.src = slide.querySelector('img').src;
                    lightbox.style.display = "block";
                }
            } else {
                // Kenardaki resme tıklandıysa onu ortaya al
                centerIndex = index;
                updateGallery();
            }
        });
    });
}

// Lightbox'ı Kapatma İşlemleri
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxClose) {
    // Çarpıya basınca yavaşça kapat (display none)
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    // Resim dışındaki siyah alana tıklayınca da kapat
    lightbox.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('lightbox-img')) {
            lightbox.style.display = "none";
        }
    });
}
