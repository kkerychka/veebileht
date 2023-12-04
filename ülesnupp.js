// Samuti, nagu küsimustiga, ma leidsin internetis paar näited ja hakkasin suhtlema Chat GPT-ga, et muuta neid oma lehe jaoks.
// Näite internetist, mida ma kasutasin: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

// sündmuskuulaja, mis ootab, kuni kogu HTML-dokument on laaditud
document.addEventListener("DOMContentLoaded", function () {
    var keriülesNupp = document.getElementById("keriülesNupp");
    var rootElement = document.documentElement;
    
    // funktsioon, mis käivitatakse iga kord, kui lehekülge keritakse
    function handleScroll() {
        if (rootElement.scrollTop > 100) {
            keriülesNupp.style.display = "block";
        } else {
            keriülesNupp.style.display = "none";
        }
    }

    // funktsioon, mis viib lehekülje ülaosale sujuva liikumisega
    function scrollToTop() {
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    // sündmuskuulaja lisamine, mis reageerib kerimisele, käivitades funktsiooni "handleScroll"
    window.addEventListener("scroll", handleScroll);
    // sündmuskuulaja lisamine, mis reageerib nupule "scrollToTopBtn" klõpsamisele, käivitades funktsiooni "scrollToTop"
    keriülesNupp.addEventListener("click", scrollToTop);
});