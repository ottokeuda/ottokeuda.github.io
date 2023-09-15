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
    "yesterday-title": "Eilen",
    "today-title": "Tänään",
    "tomorrow-title": "Huomenna",
    "next-button": "Seuraava",
    "previous-button": "Edellinen",
    "yesterday-menu": "Eilen",
    "today-menu": "Tänään",
    "tomorrow-menu": "Huomenna",
    "today-subtitle": "Tietoa tämän päivän tunneista",
    "yesterday-subtitle": "Tietoa eilisen tunneista",
    "tomorrow-subtitle": "Tietoa huomisen tunneista",
    "device-selection-text": "Valitse laite",
    "add-device-text": "Lisää laite" 

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

  document.getElementById("yesterday-menu").textContent = translation["yesterday-menu"];
  document.getElementById("today-menu").textContent = translation["today-menu"];
  document.getElementById("tomorrow-menu").textContent = translation["tomorrow-menu"];
  document.getElementById("yesterday-title").textContent = translation["yesterday-title"];
  document.getElementById("today-title").textContent = translation["today-title"];
  document.getElementById("tomorrow-title").textContent = translation["tomorrow-title"];
  document.getElementById("yesterday-subtitle").textContent = translation["yesterday-subtitle"];
  document.getElementById("today-subtitle").textContent = translation["today-subtitle"];
  document.getElementById("tomorrow-subtitle").textContent = translation["tomorrow-subtitle"];
  document.getElementById("device-selection-text").textContent = translation["device-selection-text"];
  document.getElementById("add-device-text").textContent = translation["add-device-text"];


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

document.addEventListener("DOMContentLoaded", function() {
  const deviceSelector = document.getElementById("device-selector");
  
  // Initialize dropdown from local storage
  const savedDevices = JSON.parse(localStorage.getItem("devices") || "[]");
  savedDevices.forEach(device => {
    const option = new Option(device.name, device.code);
    deviceSelector.add(option);
  });

  deviceSelector.addEventListener("change", function() {
    if (this.value === "add-device") {
      const deviceName = prompt("Enter device name:");
      const deviceCode = prompt("Enter device code:");

      if (deviceName && deviceCode) {
        const option = new Option(deviceName, deviceCode);
        deviceSelector.add(option);

        // Save to local storage
        const newDevice = { name: deviceName, code: deviceCode };
        const devices = JSON.parse(localStorage.getItem("devices") || "[]");
        devices.push(newDevice);
        localStorage.setItem("devices", JSON.stringify(devices));
      }
      this.value = "default";
    } else {
      updateTitles(this.options[this.selectedIndex].text);
    }
  });

  function updateTitles(deviceName) {
    if (deviceName && deviceName !== "Select Device") {
      document.getElementById("yesterday-title").innerText = ` ${deviceName}`;
      document.getElementById("today-title").innerText = ` ${deviceName}`;
      document.getElementById("tomorrow-title").innerText = ` ${deviceName}`;
    } else {
      document.getElementById("yesterday-title").innerText = "Yesterday";
      document.getElementById("today-title").innerText = "Today";
      document.getElementById("tomorrow-title").innerText = "Tomorrow";
    }
  }
});

