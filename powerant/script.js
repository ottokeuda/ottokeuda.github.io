var nextButtons = document.querySelectorAll('.next');
var previousButtons = document.querySelectorAll('.previous');
var submitButton = document.querySelector('.submit');

var current_fs, next_fs, previous_fs;
		var animating = false;
		var xStart = null;
		let currentFieldsetIndex = 1; // You start at index 1, which is the second fieldset

		// Initialize the "current" fieldset
		var fieldsets = document.querySelectorAll('fieldset');
		fieldsets[1].classList.add('current');

		function handleTouchStart(evt) {
			xStart = evt.touches[0].clientX;
		}

		function handleTouchMove(evt) {
			if (!xStart) {
				return;
			}

			var xDiff = xStart - evt.touches[0].clientX;

			if (xDiff > 50) {
				moveFieldset('next');
				xStart = null;
			} else if (xDiff < -50) {
				moveFieldset('previous');
				xStart = null;
			}
		}

		function handleTouchEnd(evt) {
			xStart = null;
		}

		// Add touch event listeners
		document.addEventListener('touchstart', handleTouchStart, false);
		document.addEventListener('touchmove', handleTouchMove, false);
		document.addEventListener('touchend', handleTouchEnd, false);

		function moveFieldset(direction) {
			if (animating) return false;
			animating = true;

			let fieldsets = document.querySelectorAll('fieldset');

			if (direction === 'next' && currentFieldsetIndex < fieldsets.length - 1) {
				fieldsets[currentFieldsetIndex].style.display = 'none';
				currentFieldsetIndex++;
				fieldsets[currentFieldsetIndex].style.display = 'block';

				let progressbar = document.getElementById('progressbar');
				progressbar.children[currentFieldsetIndex].classList.add('active');

			} else if (direction === 'previous' && currentFieldsetIndex > 0) {
				fieldsets[currentFieldsetIndex].style.display = 'none';
				currentFieldsetIndex--;
				fieldsets[currentFieldsetIndex].style.display = 'block';

				let progressbar = document.getElementById('progressbar');
				progressbar.children[currentFieldsetIndex + 1].classList.remove('active');

			} else {
				console.log("Either at the first or last step, can't move.");
			}

			animating = false;
		}
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

const translations = {
  english: {
    "yesterday-title": "Yesterday",
    "today-title": "Today is blue",
    "tomorrow-title": "Tomorrow",
    "next-button": "Next",
    "previous-button": "Previous",
    "yesterday-menu": "Yesterday",
    "today-menu": "Today",
    "tomorrow-menu": "Tomorrow",
    "today-subtitle": "Information about today's hours",
    "yesterday-subtitle": "Information about yesterday's hours",
    "tomorrow-subtitle": "Information about tomorrow's hours",
    "device-selection-text": "Select device",
    "add-device-text": "Add device"
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

