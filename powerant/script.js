var current_fs, next_fs, previous_fs; // fieldsets
var animating; // flag to prevent quick multi-click glitches

var nextButtons = document.querySelectorAll('.next');
var previousButtons = document.querySelectorAll('.previous');
var submitButton = document.querySelector('.submit');

nextButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    if (animating) return false;
    animating = true;

    current_fs = this.parentElement;
    next_fs = this.parentElement.nextElementSibling;

    // activate next step on progressbar using the index of next_fs
    var progressbar = document.getElementById('progressbar');
    var fieldsets = document.querySelectorAll('fieldset');
    var index = Array.from(fieldsets).indexOf(next_fs);
    progressbar.children[index].classList.add('active');

    // fade out the current fieldset
    fadeOut(current_fs, function () {
      // show the next fieldset
      next_fs.style.display = 'block';

      // fade in the next fieldset
      fadeIn(next_fs);

      // hide the current fieldset
      current_fs.style.display = 'none';

      animating = false;
    });
  });
});

previousButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    if (animating) return false;
    animating = true;

    current_fs = this.parentElement;
    previous_fs = this.parentElement.previousElementSibling;

    // de-activate current step on progressbar
    var progressbar = document.getElementById('progressbar');
    var fieldsets = document.querySelectorAll('fieldset');
    var index = Array.from(fieldsets).indexOf(current_fs);
    progressbar.children[index].classList.remove('active');

    // fade out the current fieldset
    fadeOut(current_fs, function () {
      // show the previous fieldset
      previous_fs.style.display = 'block';

      // fade in the previous fieldset
      fadeIn(previous_fs);

      // hide the current fieldset
      current_fs.style.display = 'none';

      animating = false;
    });
  });
});

submitButton.addEventListener('click', function () {
  // Submit the form
  form.submit();
});

// Fade out an element
function fadeOut(element, callback) {
  var opacity = 1;
  var timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer);
      element.style.display = 'none';
      callback();
    }
    element.style.opacity = opacity;
    opacity -= opacity * 0.1;
  }, 10);
}

// Fade in an element
function fadeIn(element) {
  var opacity = 0.1;
  element.style.opacity = 0;
  element.style.display = 'block';

  var timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    opacity += opacity * 0.1;
  }, 10);
}

const translations = {
  english: {
    "language-title": "Select your language",
    "wifi-title": "Select your wifi network",
    "wifi-password": "Wifi password",
    "country-title": "Country/area",
    "country-subtitle": "The device downloads prices for your selected country/area",
    "hours-title": "Active hours",
    "hours-subtitle": "Select the number of daily active hours for the device. The device will turn on during the cheapest hours of the day",
    "maxprice-title": "Maximum price",
    "maxprice-subtitle": "Input your maximum price for electricity in cents/KWh",
    "phone-title": "Phone number",
    "phone-subtitle": "You can receive daily price notifications through Whatsapp",
    "whatsapp-title": "Whatsapp code",
    "whatsapp-subtitle": "Input your Whatsapp code to receive notifications. Check the guide below on how to get your code.",
    "instructions-title": "INSTRUCTIONS",
    "next-button": "Next",
    "previous-button": "Previous",
    "submit-button": "Save",
    "instructions-step1": "Open your phone contacts and add +34 611 048 748 as Powerant.",
    "instructions-step2": "Open Whatsapp and find the previously added Powerant contact.",
    "instructions-step3": "Send it the following Whatsapp message: 'I allow callmebot to send me messages'.",
    "instructions-step4": "You will receive a 7 number API-key as a response. Input the key to the form above.",
    "language-menu": "Language",
    "wifi-menu": "Wifi",
    "country-menu": "County",
    "hours-menu": "Hours",
    "price-menu": "Price",
    "phone-menu": "Phone",
    "whatsapp-menu": "Whatsapp",
    "password-placeholder": "Wifi password"

    // Add more translations here
  },
  finnish: {
    "language-title": "Valitse kieli",
    "wifi-title": "Valitse Wifi-verkko",
    "wifi-password": "Wifi-salasana",
    "country-title": "Maa/alue",
    "country-subtitle": "Laite lataa hintatiedot valitsemallesi maalle/alueelle",
    "hours-title": "Aktiiviset tunnit",
    "hours-subtitle": "Valitse laitteen päivittäiset aktiiviset tunnit. Laite käynnistyy halvimmilla tunneilla päivän aikana",
    "maxprice-title": "Enimmäishinta",
    "maxprice-subtitle": "Syötä enimmäishintasi sähköstä sentteinä/KWh",
    "phone-title": "Puhelinnumero",
    "phone-subtitle": "Voit vastaanottaa päivittäisiä hintailmoituksia Whatsappin kautta",
    "whatsapp-title": "Whatsapp-koodi",
    "whatsapp-subtitle": "Syötä Whatsapp-koodisi vastaanottaaksesi ilmoituksia. Katso alla oleva ohje, miten saat koodin.",
    "instructions-title": "Ohjeet",
    "next-button": "Seuraava",
    "previous-button": "Edellinen",
    "submit-button": "Tallenna",
    "instructions-step1": "Avaa puhelimen yhteystiedot ja lisää +34 611 048 748 nimellä Powerant.",
    "instructions-step2": "Avaa Whatsapp ja etsi aiemmin lisätty Powerant-yhteystieto.",
    "instructions-step3": "Lähetä seuraava Whatsapp-viesti: 'I allow callmebot to send me messages.",
    "instructions-step4": "Saat vastauksena 7-numeroisen API-avaimen. Syötä avain yllä olevaan lomakkeeseen.",
    "yesterday-menu": "Eilen",
    "today-menu": "Tänään",
    "tomorrow-menu": "Huomenna",
    "hours-menu": "Tunnit",
    "price-menu": "Hinta",
    "phone-menu": "Puhelin",
    "whatsapp-menu": "Whatsapp",
    "password-placeholder": "Wifi salasana"

    // Add more translations here
  },
  swedish: {
    "language-title": "Välj ditt språk",
    "wifi-title": "Välj ditt wifi-nätverk",
    "wifi-password": "Wifi lösenord",
    "country-title": "Land/område",
    "country-subtitle": "Enheten laddar ner priser för ditt valda land/område",
    "hours-title": "Aktiva timmar",
    "hours-subtitle": "Välj antalet dagliga aktiva timmar för enheten. Enheten kommer att slås på under de billigaste timmarna på dagen",
    "maxprice-title": "Maximalt pris",
    "maxprice-subtitle": "Ange ditt maximala pris för el i cent/kWh",
    "phone-title": "Telefonnummer",
    "phone-subtitle": "Du kan få dagliga prismeddelanden via Whatsapp",
    "whatsapp-title": "Whatsapp-kod",
    "whatsapp-subtitle": "Ange din Whatsapp-kod för att få meddelanden. Se guiden nedan om hur du får din kod.",
    "instructions-title": "INSTRUKTIONER",
    "next-button": "Nästa",
    "previous-button": "Föregående",
    "submit-button": "Spara",
    "instructions-step1": "Öppna dina telefonkontakter och lägg till +34 611 048 748 som Powerant.",
    "instructions-step2": "Öppna Whatsapp och hitta den tidigare tillagda Powerant-kontakten.",
    "instructions-step3": "Skicka följande Whatsapp-meddelande till den: 'Jag tillåter callmebot att skicka mig meddelanden'.",
    "instructions-step4": "Du kommer att få ett API-nyckel med 7 siffror som svar. Ange nyckeln i formuläret ovan.",
    "language-menu": "Språk",
    "wifi-menu": "Wifi",
    "country-menu": "Land",
    "hours-menu": "Timmar",
    "price-menu": "Pris",
    "phone-menu": "Telefon",
    "whatsapp-menu": "Whatsapp",
    "password-placeholder": "Wifi lösenord"
  },
  norwegian: {
    "language-title": "Velg språk",
    "wifi-title": "Velg ditt Wi-Fi-nettverk",
    "wifi-password": "Wi-Fi-passord",
    "country-title": "Land/område",
    "country-subtitle": "Enheten laster ned priser for det valgte landet/området",
    "hours-title": "Aktive timer",
    "hours-subtitle": "Velg antall daglige aktive timer for enheten. Enheten vil slå seg på i løpet av de billigste timene på dagen",
    "maxprice-title": "Maksimal pris",
    "maxprice-subtitle": "Skriv inn maksimalprisen for strøm i cent/kWh",
    "phone-title": "Telefonnummer",
    "phone-subtitle": "Du kan motta daglige prisvarsler via WhatsApp",
    "whatsapp-title": "WhatsApp-kode",
    "whatsapp-subtitle": "Skriv inn WhatsApp-koden din for å motta varsler. Se guiden nedenfor for hvordan du får koden din.",
    "instructions-title": "INSTRUKSJONER",
    "next-button": "Neste",
    "previous-button": "Forrige",
    "submit-button": "Lagre",
    "instructions-step1": "Åpne kontaktene på telefonen din og legg til +34 611 048 748 som Powerant.",
    "instructions-step2": "Åpne WhatsApp og finn den tidligere lagt til kontakten Powerant.",
    "instructions-step3": "Send følgende WhatsApp-melding til den: 'Jeg tillater callmebot å sende meg meldinger'.",
    "instructions-step4": "Du vil motta en API-nøkkel med 7 tall som svar. Skriv inn nøkkelen i skjemaet ovenfor.",
    "language-menu": "Språk",
    "wifi-menu": "Wi-Fi",
    "country-menu": "Land",
    "hours-menu": "Timer",
    "price-menu": "Pris",
    "phone-menu": "Telefon",
    "whatsapp-menu": "WhatsApp",
    "password-placeholder": "Wi-Fi-passord"
  },
  danish: {
    "language-title": "Vælg dit sprog",
    "wifi-title": "Vælg dit Wi-Fi-netværk",
    "wifi-password": "Wi-Fi-adgangskode",
    "country-title": "Land/område",
    "country-subtitle": "Enheden downloader priser for dit valgte land/område",
    "hours-title": "Aktive timer",
    "hours-subtitle": "Vælg antallet af daglige aktive timer for enheden. Enheden vil tænde i løbet af de billigste timer på dagen",
    "maxprice-title": "Maksimal pris",
    "maxprice-subtitle": "Indtast din maksimale pris for elektricitet i cent/kWh",
    "phone-title": "Telefonnummer",
    "phone-subtitle": "Du kan modtage daglige prismeddelelser via WhatsApp",
    "whatsapp-title": "WhatsApp-kode",
    "whatsapp-subtitle": "Indtast din WhatsApp-kode for at modtage meddelelser. Se vejledningen nedenfor om, hvordan du får din kode.",
    "instructions-title": "INSTRUKTIONER",
    "next-button": "Næste",
    "previous-button": "Forrige",
    "submit-button": "Gem",
    "instructions-step1": "Åbn dine telefonkontakter og tilføj +34 611 048 748 som Powerant.",
    "instructions-step2": "Åbn WhatsApp og find den tidligere tilføjede Powerant-kontakt.",
    "instructions-step3": "Send følgende WhatsApp-besked til den: 'Jeg tillader callmebot at sende mig beskeder'.",
    "instructions-step4": "Du vil modtage en 7-cifret API-nøgle som svar. Indtast nøglen i formularen ovenfor.",
    "language-menu": "Sprog",
    "wifi-menu": "Wi-Fi",
    "country-menu": "Land",
    "hours-menu": "Timer",
    "price-menu": "Pris",
    "phone-menu": "Telefon",
    "whatsapp-menu": "WhatsApp",
    "password-placeholder": "Wi-Fi-adgangskode"
  },
  estonian: {
    "language-title": "Valige oma keel",
    "wifi-title": "Valige oma WiFi-võrk",
    "wifi-password": "WiFi-parool",
    "country-title": "Riik/piirkond",
    "country-subtitle": "Seade laadib alla hindu valitud riigi/piirkonna jaoks",
    "hours-title": "Aktiivsed tunnid",
    "hours-subtitle": "Valige seadme igapäevaste aktiivsete tundide arv. Seade lülitub sisse päeva odavaimatel tundidel",
    "maxprice-title": "Maksimaalne hind",
    "maxprice-subtitle": "Sisestage oma elektri maksimaalne hind sentides/kWh",
    "phone-title": "Telefoninumber",
    "phone-subtitle": "Saate igapäevaseid hinnateavitusi WhatsAppi kaudu",
    "whatsapp-title": "WhatsAppi kood",
    "whatsapp-subtitle": "Sisestage oma WhatsAppi kood teadete saamiseks. Vaadake allpool juhendit, kuidas oma koodi saada.",
    "instructions-title": "JUHISED",
    "next-button": "Järgmine",
    "previous-button": "Eelmine",
    "submit-button": "Salvesta",
    "instructions-step1": "Avage oma telefoni kontaktid ja lisage Powerant +34 611 048 748 nime all.",
    "instructions-step2": "Avage WhatsApp ja leidke varem lisatud Powerant kontakt.",
    "instructions-step3": "Saada sellele järgmine WhatsAppi sõnum: 'Luba callmebotil saata mulle teateid'.",
    "instructions-step4": "Saate vastuseks 7-kohalise API võtme. Sisestage võti ülaltoodud vormi.",
    "language-menu": "Keel",
    "wifi-menu": "WiFi",
    "country-menu": "Riik",
    "hours-menu": "Tunnid",
    "price-menu": "Hind",
    "phone-menu": "Telefon",
    "whatsapp-menu": "WhatsApp",
    "password-placeholder": "WiFi-parool"
  }
  // add translations
};

function getBrowserLanguage() {
  const browserLanguage = navigator.language || navigator.userLanguage;
  if (browserLanguage.startsWith('en')) {
    return 'english';
  } else if (browserLanguage.startsWith('fi')) {
    return 'finnish';
  }
  return 'english'; // Default to English
}

function updateFormLanguage() {
  const selectedLanguage = getBrowserLanguage();
  const translation = translations[selectedLanguage];

  // Update the headings
  document.getElementById("wifi-title").textContent = translation["wifi-title"];
  document.getElementById("language-title").textContent = translation["language-title"];
  document.getElementById("wifi-title").textContent = translation["wifi-title"];
  document.getElementById("wifi-password").textContent = translation["wifi-password"];
  document.getElementById("country-title").textContent = translation["country-title"];
  document.getElementById("country-subtitle").textContent = translation["country-subtitle"];
  document.getElementById("hours-title").textContent = translation["hours-title"];
  document.getElementById("hours-subtitle").textContent = translation["hours-subtitle"];
  document.getElementById("maxprice-title").textContent = translation["maxprice-title"];
  document.getElementById("maxprice-subtitle").textContent = translation["maxprice-subtitle"];
  document.getElementById("phone-title").textContent = translation["phone-title"];
  document.getElementById("phone-subtitle").textContent = translation["phone-subtitle"];
  document.getElementById("whatsapp-title").textContent = translation["whatsapp-title"];
  document.getElementById("whatsapp-subtitle").textContent = translation["whatsapp-subtitle"];
  document.getElementById("instructions-title").textContent = translation["instructions-title"];
  document.getElementById("instructions-step1").textContent = translation["instructions-step1"];
  document.getElementById("instructions-step2").textContent = translation["instructions-step2"];
  document.getElementById("instructions-step3").textContent = translation["instructions-step3"];
  document.getElementById("instructions-step4").textContent = translation["instructions-step4"];
  document.getElementById("language-menu").textContent = translation["language-menu"];
  document.getElementById("wifi-menu").textContent = translation["wifi-menu"];
  document.getElementById("country-menu").textContent = translation["country-menu"];
  document.getElementById("hours-menu").textContent = translation["hours-menu"];
  document.getElementById("price-menu").textContent = translation["price-menu"];
  document.getElementById("phone-menu").textContent = translation["phone-menu"];
  document.getElementById("whatsapp-menu").textContent = translation["whatsapp-menu"];
  document.getElementById("password").placeholder = translation["password-placeholder"];

  // Update the button texts
  const nextButtons = document.querySelectorAll("input[name='next']");
  nextButtons.forEach(button => {
    button.value = translation["next-button"];
  });

  const previousButtons = document.querySelectorAll("input[name='previous']");
  previousButtons.forEach(button => {
    button.value = translation["previous-button"];
  });

  const submitButtons = document.querySelectorAll("input[name='submit']");
  submitButtons.forEach(button => {
    button.value = translation["submit-button"];
  });

  // Update more headings here
}



// Call the updateFormLanguage() function to initially set the language
updateFormLanguage();
