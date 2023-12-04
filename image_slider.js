// Osa sellest koodist on võetud järgnevalt lehetl: https://www.geeksforgeeks.org/creating-custom-image-slider-javascript/. 
//Siiski olen ise seda päris palju muutnud vastavalt vajadusele.

// JavaScript for Image Slider
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide) => (slide.style.display = 'none'));
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Add event listeners for arrow navigation
    document.getElementById('next-arrow').addEventListener('click', nextSlide);
    document.getElementById('prev-arrow').addEventListener('click', prevSlide);

    showSlide(currentSlide);
})