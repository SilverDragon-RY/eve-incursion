// app
let sentences = ["Unavailable: Technical Issue Encountered...", "Waitlist Closed: Not running :<", "Waitlist Open: Running for ", "Minutes"];
const colors = ["w3-sand", "bg-danger bg-gradient bg-opacity-50", "bg-success bg-gradient bg-opacity-75"];
const order = ["TLA", "CI", "TDF", "WTM"];

var app = new Vue({
    el: '#waitlists',
    data: {
        state: [sentences[0], sentences[0], sentences[0], sentences[0]],
        color: ["w3-sand", "w3-sand", "w3-sand", "w3-sand"],
    }

});
// Community status API
const api = "https://eve-incursion.com/api";

// Helper
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

// pre-page cookie setting
// change page based on cookie...
function changeLanguage() {
    let get_language_cookie = getCookie("Language");
    if (get_language_cookie == "") {
        // no cookie -> set cookie
        setCookie("Language", "ENG", 10);
        // trigger update
        return ["Unavailable: Technical Issue Encountered...", "Waitlist Closed: Not running :<", "Waitlist Open: Running for ", "Minutes"];
    } else if (get_language_cookie == "ENG") {
        // trigger update -> ENG 
        return ["Unavailable: Technical Issue Encountered...", "Waitlist Closed: Not running :<", "Waitlist Open: Running for ", "Minutes"];
    } else if (get_language_cookie == "CN") {
        // trigger update -> CN
        return ["出错了...", "没起队", "开队了，已经打了 ", "分钟"];
    }
}
// bind update function...
document.getElementById("language").onchange = function () {
    let sentences = changeLanguage();
    // Get from api
    fetch(api).then(response => response.json()).then(data => {
        new_state = [0, 0, 0, 0]
        new_color = [0, 0, 0, 0]
        for (let i = 0; i < order.length; i++) {
            if (data[order[i]] == -1) {
                new_state[i] = sentences[0];
                new_color[i] = colors[0];
            }
            if (data[order[i]] == 0) {
                new_state[i] = sentences[1];
                new_color[i] = colors[1];
            }
            if (data[order[i]] > 0) {
                running_for = (Date.now() / 1000 | 0) - data[order[i]];
                new_state[i] = sentences[2] + String(running_for / 60 | 0) + sentences[3];
                new_color[i] = colors[2];
            }
        }
        // update array
        console.log(new_state);
        app.state = new_state;
        app.color = new_color;
    });
}

// Get from api
let sentences = changeLanguage();
fetch(api).then(response => response.json()).then(data => {
    new_state = [0, 0, 0, 0];
    new_color = [0, 0, 0, 0];
    for (let i = 0; i < order.length; i++) {
        if (data[order[i]] == -1) {
            new_state[i] = sentences[0];
            new_color[i] = colors[0];
        }
        if (data[order[i]] == 0) {
            new_state[i] = sentences[1];
            new_color[i] = colors[1];
        }
        if (data[order[i]] > 0) {
            running_for = (Date.now() / 1000 | 0) - data[order[i]];
            new_state[i] = sentences[2] + String(running_for / 60 | 0) + sentences[3];
            new_color[i] = colors[2];
        }
    }
    // update array
    console.log(new_state);
    app.state = new_state;
    app.color = new_color;
});

