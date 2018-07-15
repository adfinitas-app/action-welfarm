
function sendData() {
    var data = {
        "db": {
            "schema": "cimade_petition_dublin2018",
            "db": {
                "civility": getCivility(),
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "language": "fr_FR",
                "utm_source": getUTM(),
            }
        },
        "woopra": {
            "host": "lacimade.org",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_email": pureField($('#f_email').val()),
            "cv_firstname": pureField($('#f_firstname').val().toUpperCase()),
            "cv_lastname": pureField($('#f_lastname').val().toUpperCase()),
            "cv_name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
            "cv_civility": getCivility(),

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "petition_dublin2018",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "ce_email": pureField($('#f_email').val()),
            "ce_firstname": pureField($('#f_firstname').val().toUpperCase()),
            "ce_lastname": pureField($('#f_lastname').val().toUpperCase()),
            "ce_name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
            "ce_utm_source": getUTM(),
            "ce_language": "fr_FR",
        },
        "mailjet": {
            "Email": pureField($('#f_email').val()),
            "Properties": {
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "name": pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "civility": getCivility(),
                "language": "fr_FR",
            },
            "addLists": getList(), // Noms de transmission des listes dans lesquelles ajouter le contact. Ne pas mettre les listes "Toute la base" et "Prospects" ici, le contact y est inséré par défaut (excepté dans "Prospect" si donateur).
            "delLists": []  // Noms de transmission des listes dans lesquelles supprimer le contact.
        }
    };
    if (pureField(getPhone()) != ""){
        data.woopra["cv_phone"] = pureField(getPhone());
        data.woopra["ce_phone"] = pureField(getPhone());
    }
    //console.log(data);
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
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/adc529c9-3414-4e80-8004-b2002885ee65/webhook/3a66a987-839b-4275-8149-109503eb09e1';
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

    data.push("petition_dublin2018");

    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#optin').is(":checked")) {
        return "true";
    }
    return "false";
}

function getSexe() {
    if ($('#f_female').is(":checked"))
        return "Femme";
    else {
        return 'Homme';
    }
}

function getCivility() {
    if ($('#f_female').is(":checked"))
        return "Mme";
    else {
        return 'M';
    }
}

function getCivilityDear() {
    if ($('#f_female').is(":checked"))
        return "Chère";
    else {
        return 'Cher';
    }
}

function getCivilityLong() {
    if ($('#f_female').is(":checked"))
        return "Madame";
    else {
        return 'Monsieur';
    }
}
