
function sendData() {
    var data = {
        "db": {
            "schema": "welfarm_poules_2019",
            "db": {
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField(getFirstname().toUpperCase()),
                "lastname": pureField(getLastname().toUpperCase()),
                "name":  pureField($('#f_name').val()),
                "language": "fr_FR",
            }
        },
        "mailjet": {
            "Email": pureField($('#f_email').val()),
            "Properties": {
                "firstname": pureField(getFirstname().toUpperCase()),
                "lastname": pureField(getLastname().toUpperCase()),
                "name":  pureField($('#f_name').val()),
                "language": "fr_FR"
            },
            "addLists": getList(), // Noms de transmission des listes dans lesquelles ajouter le contact. Ne pas mettre les listes "Toute la base" et "Prospects" ici, le contact y est inséré par défaut (excepté dans "Prospect" si donateur).
            "delLists": []  // Noms de transmission des listes dans lesquelles supprimer le contact.
        }
    };
    console.log(data);
    makeCorsRequest(data);
}

/*
 * Debut de la lib
 */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/c2ff768a-aa71-4234-b082-3c5f67318cd7/webhook/a8d03cd4-f87e-4a3c-b898-bb0876da1269';
    var body = JSON.stringify(data);
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
}

/*
 * Fin de la lib
 */
function getUTM() {
    var p = extractUrlParams();

    if (p['utm_source'] && p['utm_source'] !== "undefined")
        return p['utm_source'];
    else
        return "";
}

function getPhone() {
    return $('#f_phone').intlTelInput("getNumber");
}

function getPersonnalisationCourte() {
    return getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getPersonnalisation() {
    return getCivilityDear() + " " + getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getList() {
    var data = [];

    data.push('petitionpoules2019');
    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#f_optin').is(":checked")) {
        return "false";
    }
    return "true";
}

function getSexe() {
    if ($('#f_female').attr("checked") === "checked")
        return "Femme";
    else
        return 'Homme';
}
function getFirstname() {
    return $('#f_name').val().split(' ')[0];
}
function getLastname() {
    if ($('#f_name').val().split(' ')[1] != null)
        return $('#f_name').val().split(' ')[1];
    else
        return "";
}
function getCivility() {
    if ($('#f_female').attr("checked") === "checked")
        return "Mme";
    else
        return 'M';
}

function getCivilityDear() {
    if ($('#f_female').attr("checked") === "checked")
        return "Chère";
    else
        return 'Cher';
}

function getCivilityLong() {
    if ($('#f_female').attr("checked") === "checked")
        return "Madame";
    else
        return 'Monsieur';
}
