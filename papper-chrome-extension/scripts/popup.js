
class PopupUI {

    life = this
    STREAM = {
        start: () => {
            life.port = chrome.extension.connect({
                name: "POPUP STREAM"
            });
        },
        send: (message) => {
            life.port.postMessage(message)
        },
        get: (conditionType, callback) => {
            life.port.onMessage(message => {
                if (message.type == conditionType) {
                    callback(message.data)
                }
            })
        }
    }
    UI = {
        switch_el = {
            get: () => {
                return document.getElementById("switch_status").checked
            },
            set: (bool) => {
                document.getElementById("switch_status").checked = bool
            }
        },
        show_auth_status_el = () => {
                el = document.getElementById("status")
                if (!life.IS_AUTH) {
                    el.innerHTML = "<img src='../images/error_el.png' class='status_img'><h4>Not authorized</h4>"
                } else {
                    el.innerHTML = "<img src='../images/200.png' class='status_img'><h4>Authorization is successful</h4>"
                }
            }

    }
    appStatus = {
        get: () => {
            life.STREAM.send({ type: "GET-APP-STATUS" })
            return life.STREAM.get("RETURN-APP-STATUS", (data) => {
                return data;
            })
        },
        set: (data) => {
            life.STREAM.send({ type: "SET-APP-STATUS", data: data })
        }
    }
    authStatus = {
        get: () => {
            life.STREAM.send({ type: "GET-AUTH-STATUS" })
            return life.STREAM.get("RETURN-AUTH-STATUS", (data) => {
                return data;
            })
        }
    }
    constructor() {
        this.startStream()
        this.UI.switch_el = this.appStatus
        this.IS_AUTH = this.authStatus
        this.UI.show_auth_status_el()
    }
}



app_status = localStorage.getItem("APP_STATUS")
main_auth_status = false
data = {}

switch_auth_form = (bool) => {
    if (bool) {
        auth.style.display = "block";
    } else {
        auth.style.display = "none";
    }
}

switch_status = (bool) => {
    el = document.getElementById("status")
    if (bool) {
        el.style.display = "block"
    } else {
        el.style.display = "none"
    }
}

set_ui_status = () => {
    el = document.getElementById("status")
    if (!main_auth_status) {
        el.innerHTML = "<img src='../images/error_el.png' class='status_img'><h4>Not authorized</h4>"
    } else {
        el.innerHTML = "<img src='../images/200.png' class='status_img'><h4>Authorization is successful</h4>"
    }
}

setInterval(() => {
    app_status = localStorage.setItem("APP_STATUS")
}, 1000)

openstream = () => {
    port = 
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("auth_btn").addEventListener("click", () => {
        data.mail = mail.value
        data.password = password.value
        alert(data.mail)
    })

    set_ui_status()
    if (!main_auth_status) {
        switch_auth_form(true)
    }
    port = chrome.extension.connect({
        name: "POPUP STREAM"
    });
    port.postMessage("YOYO")
    // switch_el = document.getElementById("switch_status")
    // switch_parent = document.getElementsByClassName("switch")[0]

    // if(localStorage.getItem("APP_STATUS") == false){
    //     switch_parent.innerHTML = "<input type='checkbox' id='switch_status'>\
    //     <span class='slider round'></span>"
    // }

    // switch_el.addEventListener("click", (el) => {
    //     console.log(app_status)
    //     app_status = !app_status
    //     localStorage.setItem("APP_STATUS", app_status);
    //     port.postMessage({type: "switch_app_status", status: app_status})
    // })
})