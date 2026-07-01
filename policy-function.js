document.querySelectorAll('.main-sub-head').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.toggle-icon');

        // if content is visible, then hide the content
        if (content.classList.contains('collapsed')) {
            content.classList.remove('collapsed');
            // changing icon
            icon.classList.remove('bi-plus-lg');
            icon.classList.add('bi-dash-lg');
        } else {
            content.classList.add('collapsed');
            // changing icon
            icon.classList.remove('bi-dash-lg');
            icon.classList.add('bi-plus-lg');
        }
    });
});


// translate.js

window.addEventListener('load', () => {
    console.log("Unlimited Translation Script Initialized!");

    const countryLanguages = {
        "CA": [{ code: "en", label: "English (en)" }, { code: "fr", label: "French (fr)" }],
        "US": [{ code: "en", label: "English (en)" }],
        "BR": [{ code: "pt", label: "Brazilian Portuguese (pt)" }],
        "AT": [{ code: "de", label: "German (de)" }],
        "BE": [{ code: "nl", label: "Dutch (nl)" }, { code: "fr", label: "French (fr)" }],
        "BG": [{ code: "bg", label: "Bulgarian (bg)" }],
        "HR": [{ code: "hr", label: "Croatian (hr)" }],
        "CY": [{ code: "el", label: "Greek (el)" }],
        "CZ": [{ code: "cs", label: "Czechia (cs)" }],
        "DK": [{ code: "da", label: "Denmark (da)" }],
        "EE": [{ code: "et", label: "Estonian (et)" }],
        "FI": [{ code: "fi", label: "Finland (fi)" }],
        "FR": [{ code: "fr", label: "French (fr)" }],
        "DE": [{ code: "de", label: "German (de)" }],
        "GR": [{ code: "el", label: "Greek (el)" }],
        "HU": [{ code: "hu", label: "Hungary (hu)" }],
        "IE": [{ code: "en", label: "English (en)" }],
        "IT": [{ code: "it", label: "Italy (it)" }],
        "LV": [{ code: "lv", label: "Latvia (lv)" }],
        "LT": [{ code: "lt", label: "Lithuania (lt)" }],
        "PL": [{ code: "pl", label: "Polish (pl)" }],
        "RO": [{ code: "ro", label: "Romanian (ro)" }],
        "SK": [{ code: "sk", label: "Slovakia (sk)" }],
        "SI": [{ code: "sl", label: "Slovenia (sl)" }],
        "SE": [{ code: "sv", label: "Sweden (sv)" }],
        "JP": [{ code: "ja", label: "Japanese (ja)" }]
    };

    const countrySelect = document.getElementById("countrySelect");
    const languageSelect = document.getElementById("languageSelect");

    const translatableElements = document.querySelectorAll('.main h1, .main h4, .main p, .main li, .main h3');
    const originalTexts = [];

    translatableElements.forEach((el) => {
        originalTexts.push(el.innerText);
    });

    function updateLanguageDropdown(countryCode) {
        if (!languageSelect) return;
        languageSelect.innerHTML = "";
        const languages = countryLanguages[countryCode] || [{ code: "en", label: "English (en)" }];

        languages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.label;
            languageSelect.appendChild(option);
        });

        translatePage(languageSelect.value);
    }

    async function translatePage(targetLang) {
        if (targetLang === 'en') {
            translatableElements.forEach((el, index) => {
                el.innerText = originalTexts[index];
            });
            return;
        }

        translatableElements.forEach(el => el.style.opacity = "0.4");

        try {

            const baseUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + targetLang + "&dt=t";

            const translationPromises = originalTexts.map(async (textToTranslate, i) => {
                if (!textToTranslate.trim()) return;

                const url = `${baseUrl}&q=${encodeURIComponent(textToTranslate)}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data && data[0]) {
                    let translatedText = data[0].map(item => item[0]).join('');
                    translatableElements[i].innerText = translatedText;
                }
            });

            await Promise.all(translationPromises);

        } catch (error) {
            console.error("Google Client API Error:", error);
        } finally {
            translatableElements.forEach(el => el.style.opacity = "1");
        }
    }

    if (countrySelect) {
        countrySelect.addEventListener("change", (e) => {
            updateLanguageDropdown(e.target.value);
        });
        updateLanguageDropdown(countrySelect.value);
    }

    if (languageSelect) {
        languageSelect.addEventListener("change", (e) => {
            translatePage(e.target.value);
        });
    }
});