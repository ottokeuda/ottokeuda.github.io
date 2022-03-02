// Uuden Käyttäjätunnuksen ja salasanan tallentaminen selaimen paikalliseen välimuistiin (local storage).
document.addEventListener("DOMContentLoaded", onkoKirjautunut);

//Tarkistetaan onko käyttäjä kirjautunut.
function onkoKirjautunut() {
    var kirjautunut = localStorage.getItem('kirjautunut');
    if (kirjautunut == "kylla") {
        document.getElementById('rekisteroitymis_lomake').style.display = "none";
        document.getElementById("kirjautumis_lomake").style.display = "none";
        document.getElementById("landing").style.display = "none";
    }
    else {
        document.getElementById('rekisteroitymis_lomake').style.display = "none";
        document.getElementById("kirjautumis_lomake").style.display = "none";
    }
}
function avaaKirjautumislomake() {
    document.getElementById("kirjautumis_lomake").style.display = "block";
    document.getElementById("landing").style.display = "none";

}
function avaaRekisteroitymislomake() {
    document.getElementById("rekisteroitymis_lomake").style.display = "block";
    document.getElementById("landing").style.display = "none";

}
function luoTunnus() {

    // Kirjautumistunnus ja salasana, jotka haetaan kirjautumislomakkeesta.
    var uusiTunnus = document.getElementById('uusi_tunnus');
    var uusiSalasana = document.getElementById('uusi_salasana');

    //
    localStorage.setItem('tallennettuTunnus', uusiTunnus.value);
    localStorage.setItem('tallennettuSalasana', uusiSalasana.value);
    alert('Olet luonut käyttäjän: ' + uusiTunnus.value);
}

// Käyttäjätunnuksen ja salasanan tarkistus, joka ajetaan kun käyttäjä yrittää kirjautua sivulle.
function tarkistaTunnus() {

    // stored data from the register-form
    var tallennettuTunnus = localStorage.getItem('tallennettuTunnus');
    var tallennettuSalasana = localStorage.getItem('tallennettuSalasana');

    // entered data from the login-form
    var kirjautumisTunnus = document.getElementById('kirjautumis_tunnus');
    var kirjautumisSalasana = document.getElementById('kirjautumis_salasana');

    // check if stored data from register-form is equal to data from login form
    if (kirjautumisTunnus.value == tallennettuTunnus && kirjautumisSalasana.value == tallennettuSalasana) {
        alert('Olet kirjautunut sisään käyttäjällä: ' + kirjautumisTunnus.value);
        localStorage.setItem('kirjautunut', 'kylla');
    } else {
        alert('Salasana tai käyttäjätunnus on väärin');
    }
}