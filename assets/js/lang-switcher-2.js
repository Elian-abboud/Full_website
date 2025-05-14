function loadLanguage(lang) {
    fetch(`/assets/lang/2nd_site/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });
            localStorage.setItem("2nd_site_lang", lang);
        })
        .catch(err => {
            console.error(`Error loading ${lang}.json:`, err);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelector = document.getElementById("language-selector");

    if (langSelector) {
        const savedLang = localStorage.getItem("2nd_site_lang") || "en";
        langSelector.value = savedLang;
        loadLanguage(savedLang);

        langSelector.addEventListener("change", function () {
            loadLanguage(this.value);
        });
    }
});
