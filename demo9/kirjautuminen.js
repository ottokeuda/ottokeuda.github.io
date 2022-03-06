document.addEventListener("DOMContentLoaded", onkoKirjautunut);

function onkoKirjautunut() {
    if (localStorage.getItem("kirjautunut") === "kylla") {
        document.getElementById("tervetulo_teksti").textContent += localStorage.getItem("nimi");
        document.getElementById("nimi").style.display = "none";
        document.getElementById("kirjaudu_nappi").style.display = "none";
        
    }else{
        document.getElementById("uloskirjautumis_nappi").style.display = "none";
    }
}

function kirjaudu() {
    localStorage.setItem("nimi", document.getElementById("nimi").value);
    localStorage.setItem("kirjautunut", "kylla");
}

function kirjauduUlos() {
    localStorage.setItem("nimi", "");
    localStorage.setItem("kirjautunut", "ei");
}