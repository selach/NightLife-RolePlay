// Existující kód pro slider
let currentIndex = 0;
const slides = document.querySelectorAll('.slider-item');
const totalSlides = slides.length;
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.slider-dots');
let autoSlideInterval;

// Funkce pro přechod na konkrétní snímek
function goToSlide(index) {
    const offset = -index * 100 / totalSlides; // Posunout o šířku obrázku
    sliderContainer.style.transform = `translateX(${offset}%)`;
    updateDots(index);
}

// Funkce pro přechod na další snímek
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

// Funkce pro aktualizaci puntíků
function updateDots(index) {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Funkce pro kliknutí na puntík
function onDotClick(event) {
    if (event.target.classList.contains('slider-dot')) {
        const index = Array.from(dotsContainer.children).indexOf(event.target);
        currentIndex = index;
        goToSlide(currentIndex);
        resetAutoSlide();
    }
}

// Funkce pro resetování automatického přepínání snímků
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 10000); // Změna každých 10 sekund
}

// Inicializace puntíků
function initDots() {
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });
}

// Nastavení automatického přepínání snímků
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 10000); // Změna každých 10 sekund
}

// Inicializace slideru
function initSlider() {
    goToSlide(currentIndex);
    initDots();
    startAutoSlide();
}

// Přidání události kliknutí na puntíky
dotsContainer.addEventListener('click', onDotClick);

// Spuštění slideru
initSlider();
