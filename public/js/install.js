"use strict";
let deferredInstallPrompt = null;
const installButton = document.getElementById("btnInstall");
installButton.addEventListener("click", installPwa);

// Codigo para guardar antes de instalar
window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

// Guarda el evento y luego muestra el botón de instalar
function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute("hidden");
}

// Evento que instala la pwa
function installPwa(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute("hidden", true);

  deferredInstallPrompt.userChoice.then((choice) => {
    if (choice.outcome === "accepted") {
      console.log("User accepted the A2HS prompt", choice);
    } else {
      console.log("User demised the A2HS prompt", choice);
    }
    deferredInstallPrompt = null;
  });
}

// Evento cuando se intale la app
window.addEventListener("appinstalled", logAppInstalled);

// Hace un log de la instalacion o guarda el evento
function logAppInstalled(evt) {
  console.log("Anilist app was installed", evt);
}
