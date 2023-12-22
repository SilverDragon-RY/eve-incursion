// vars
const port = 80;
const express = require('express');
const app = express(); 
const cors = require('cors');

app.use(cors());

// API
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/css", express.static(__dirname + '/css'));

app.get('/api', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(status);
}); 

app.get('/', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname+ "/view/waitlist.html");
}); 

app.get('/secret', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.sendFile(__dirname + "/view/secret.html");
}); 

app.get('/communities', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.sendFile(__dirname + "/view/communities.html");
}); 

app.get('/guides', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.sendFile(__dirname + "/view/guides.html");
}); 

app.get('/support', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.sendFile(__dirname + "/view/support.html");
}); 

app.get('/lp', function (req, res) {
    res.set('Cache-control', 'public, max-age=3000');
    res.sendFile(__dirname + "/view/lp.html");
}); 

// Setting the server to listen at port 3000 
app.listen(port, function (req, res) {
    console.log("Server is running at port", port);
}); 


// token set up
token_CI = "authToken=3iMcxVTCdTDdgaiOcMou8ootheNuO1hs0plWe12G1sIuhUa6hXfQLmBun4qlN1t9Q7wni7jtp8gw71Bx9Yj8O29HbM2WBGvv; current_user_id=XcR8LjHSFdbuSzwSZqG81c1c1rHj2jUmXbTNC2JqQJHMrmwXDaxwfckeo4jMXOtn7bQntVTQaa5vWiSHPNxhlxoUeQa8q%2FNZuBOsFr7gTpFDw88%3D--UcPF78kIk0cI%2BFdv--PjE3ZCfUNTbfywRUJ8GN1A%3D%3D";
token_TLA = "authToken=3iMcrgvF0Ppklmjl5XyJeJfW67cGhuEcdyz320MhCNLErUxV4nVPQE2Sis7vwdMmVts9VDkWoSheqyRICMUzaUlAXpVSLPTS"
token_TDF = "authToken=3iMdLQPOlLCdzTPnS8dwwlC2V8Xx9vQtYkRZJvNk14jqMKOeEvl1fPyOqbQqqkU3qcmVJhzFQhalzADjNJENVjxrSa6I8Og8"
token_WTM = "cf_clearance=r3dB6CT7Qpt4ma6jl_zjeq4NgmZQ_pjTcEi6LHRKpZ0-1703183231-0-2-6ea78f8f.6667f635.b89e8735-0.2.1703183231; _csrf_token=4de02503a99afc666fa7ba549f409649147303d9b44d9fff17a047a7e262b079; remember_token=char2121130109_1|00172a495be777335d47e60ac192c75b4c03c5ac701768dce93c295ff04688736c06cf606d900e262500480d6476137e59bd275f1a50dd540409d819319efd26; session=.eJxtjktqxEAMBe_S6xAk9UfWXMaoWxI2GZzgsRdDyN3jkE0WWT6KKt5nmsdjj_l4f_Mt3VIxB6qQVURjtNZCuWstEgWkFcHCGbJJL8UkIpAVCis7NerAkl7SHLs_lnQ79tOvtdqVJeiU2xAKZp00qHNm6ySVvUITcsJqI7pS74CKwU1rHdyYW7NBPmFIbgbWc44wHdZ98JTrta0r2MB2KUGm7jUwMkwZA-qVAf-5dT58_30zFt0JCTEDgsx40dV8O9bj-arnsczH88PTbTvv9z_kf_XrG4j2XiY.ZYSDjQ.uGkx9Z5L3m5WHpU2ZDhRyzsPK7k"

// var set up
let CI_open = -1;
let TLA_open = -1;
let TDF_open = -1;
let WTM_open = -1;
let status = { "TLA": TLA_open, "CI": CI_open, "TDF": TDF_open, "WTM": WTM_open };



// waitlist update functions.
// CI
function status_CI(token) {
    return new Promise((result) => {
        fetch("https://contingencyinc.com/api/waitlist", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": token,
                "Referer": "https://contingencyinc.com/?wl=1",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "Cache-Control": "no-store"
            },
            "body": null,
            "method": "GET"
        }).then((response) => {
            // status?
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status + 'Error');
            }
        }).then((data) => {
            if (data.open == false) {
                result(0);
            } else {
                result(1);
            }
        }).catch((error) => {
            result(-1);
        });
    });

};

// TLA
function status_TLA(token) {
    return new Promise((result) => {
        fetch("https://wl.tlaincursions.com/api/waitlist?waitlist_id=1", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": token,
                "Referer": "https://wl.tlaincursions.com/waitlist?wl=1",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then((response) => {
            // status?
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status + 'Error');
            }
        }).then((data) => {
            if (data.open == false) {
                result(0);
            } else {
                result(1);
            }
        }).catch((error) => {
            result(-1);
        });
    });

};

// TDF
function status_TDF(token) {
    return new Promise((result) => {
        fetch("https://t-d-f.one/api/waitlist?waitlist_id=1", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": token,
                "Referer": "https://t-d-f.one/waitlist?wl=1",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then((response) => {
            // status?
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status + 'Error');
            }
        }).then((data) => {
            if (data.open == false) {
                result(0);
            } else {
                result(1);
            }
        }).catch((error) => {
            result(-1);
        });
    });

};

// WTM
function status_WTM(token) {
    return new Promise((result) => {
        fetch("https://wl.warptome.net/", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "cross-site",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": token,
                "Referer": "https://login.eveonline.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then((response) => {
            // status?
            if (response.status == 200) {
                return response.text();
            } else {
                throw new Error(response.status + 'Error');
            }
        }).then((data) => {
            if (data.includes("All Waitlists are closed!")) {
                result(0);
            } else {
                result(1);
            }
        }).catch((error) => {
            result(-1);
        });
    });

};

// fetch loop !tmp!
function update_all() {
    query = [status_CI(token_CI), status_TLA(token_TLA), status_TDF(token_TDF), status_WTM(token_WTM)]
    query_R = []
    Promise.allSettled(query).then((results) => {
        results.forEach((result) => query_R.push(result.value));
        // update each one
        if (status["TLA"] > 0) {
            if (query_R[1] <= 0) {
                status["TLA"] = query_R[1];
            }
        } else {
            if (query_R[1] > 0) {
                query_R[1] = Date.now() / 1000 | 0;
            }
            status["TLA"] = query_R[1];
        }
        // CI
        if (status["CI"] > 0) {
            if (query_R[0] <= 0) {
                status["CI"] = query_R[0];
            }
        } else {
            if (query_R[0] > 0) {
                query_R[0] = Date.now() / 1000 | 0;
            }
            status["CI"] = query_R[0];
        }
        // TDF
        if (status["TDF"] > 0) {
            if (query_R[2] <= 0) {
                status["TDF"] = query_R[2];
            }
        } else {
            if (query_R[2] > 0) {
                query_R[2] = Date.now() / 1000 | 0;
            }
            status["TDF"] = query_R[2];
        }
        // WTM
        if (status["WTM"] > 0) {
            if (query_R[3] <= 0) {
                status["WTM"] = query_R[3];
            }
        } else {
            if (query_R[3] > 0) {
                query_R[3] = Date.now() / 1000 | 0;
            }
            status["WTM"] = query_R[3];
        }
    });
};
update_all();
setInterval(update_all, 60000);
