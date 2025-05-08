function loadLanguage(lang) {
    fetch(`/assets/lang/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });
            localStorage.setItem("lang", lang);
        })
        .catch(err => {
            console.error(`Error loading ${lang}.json:`, err);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelector = document.getElementById("language-selector");

    if (langSelector) {
        const savedLang = localStorage.getItem("lang") || "en";
        langSelector.value = savedLang;
        loadLanguage(savedLang);

        langSelector.addEventListener("change", function () {
            loadLanguage(this.value);
        });
    }
});
