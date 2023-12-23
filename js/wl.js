// Community status API
const api = "http://eve-incursion.com/api";
const sentences = ["Unavailable: Technical Issue Encountered...", "Waitlist Closed: Not running :<", "Running: Waitlist Opened!"];
const colors = ["w3-sand", "bg-danger bg-gradient bg-opacity-50", "bg-success bg-gradient bg-opacity-75"];
const order = ["TLA", "CI", "TDF", "WTM"];

// app
var app = new Vue({
    el: '#waitlists',
    data: {
        state: [sentences[0], sentences[0], sentences[0], sentences[0]],
        color: ["w3-sand", "w3-sand", "w3-sand", "w3-sand"],
    }

});

// Get from api
fetch(api).then(response => response.json()).then(data => {
    new_state = [0,0,0,0]
    new_color = [0,0,0,0]
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
            new_state[i] = "Waitlist Open: Running for " + String(running_for / 60 | 0) + " Minutes";
            new_color[i] = colors[2];
        }
    }
    // update array
    console.log(new_state);
    app.state = new_state;
    app.color = new_color;
});

