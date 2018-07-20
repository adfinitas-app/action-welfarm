
function sendData(q) {
    console.log("BEGIN");
    var data = {
        "db": {
            "schema": "welfarm_scoring",
            "db": {
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "sexe":getSexe(),
                "civility": getCivility(),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "language": "fr_FR",
                "quest_1_militant":q[0],
                "quest_2_accessibilite":q[1],
                "quest_3_famille":q[2],
                "quest_4_connaissance":q[3],
                "quest_5_communication":q[4],
                "nps":q[5],
            }
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
    if (!$('#f_optin').is(":checked"))
        data.push("fermes_sang");

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
