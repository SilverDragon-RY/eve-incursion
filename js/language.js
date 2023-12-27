function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// change page based on cookie...
function changeLanguage() {
    let get_language_cookie = getCookie("Language");
    if (get_language_cookie == "") {
        // no cookie -> set cookie
        setCookie("Language", "ENG", 10);
        // trigger update
        eng_ver.hidden = false;
        cn_ver.hidden = true;
    } else if (get_language_cookie == "ENG") {
        // trigger update -> ENG 
        eng_ver.hidden = false;
        cn_ver.hidden = true;
    } else if (get_language_cookie == "CN") {
        // trigger update -> CN
        eng_ver.hidden = true;
        cn_ver.hidden = false;
    }
    console.log("changed", get_language_cookie);
}

// preload based on cookie
var eng_ver = document.getElementById("ENG");
var cn_ver = document.getElementById("CN");
changeLanguage();

// bind switcher
document.getElementById("language").onchange = function () {
    setCookie("Language", this.value, 10);
    changeLanguage();
}