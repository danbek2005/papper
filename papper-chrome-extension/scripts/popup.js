function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }



class PopupUI {

    life = this
    STREAM = {
        start: () => {
            this.life.port = chrome.extension.connect({
                name: "POPUP STREAM"
            });
        },
        send: (message) => {
            this.life.port.postMessage(message)
        },
        get: (conditionType, callback) => {
            this.life.port.onMessage.addListener(message => {
                if (message.type == conditionType) {
                    callback(message.data)
                }
            })
        }
    }
    UI = {
        switch_el: {
            get: () => {
                return document.getElementById("switch_status").checked
            },
            set: (bool) => {
                console.log(bool)
                document.getElementById("switch_status").checked = bool
            }
        },
        show_auth_status_el: () => {
                let el = document.querySelector("#auth_status")
                if (!this.life.IS_AUTH) {
                    el.innerHTML = "<h4 class='auth_msg'>#Not authorized</h4><img class='auth_img' src='images/red.svg'/>"
                } else {
                    el.innerHTML = "<h4 class='auth_msg'>#Authorization is successful</h4><img class='auth_img' src='images/green.svg'/>"
                }
            }

    }
    appStatus = {
        get: () => {
            this.life.STREAM.send({ type: "GET-APP-STATUS" })
            this.life.STREAM.get("RETURN-APP-STATUS", (data) => {
                this.life.UI.switch_el.set(data)
            })
        },
        set: (data) => {
            this.life.STREAM.send({ type: "SET-APP-STATUS", data: data })
        }
    }
    authStatus = {
        get: () => {
            this.life.STREAM.send({ type: "GET-AUTH-STATUS" })
            return this.life.STREAM.get("RETURN-AUTH-STATUS", (data) => {
                return data;
            })
        }
    }
    constructor() {
        this.STREAM.start()
        this.appStatus.get()
        this.IS_AUTH = this.authStatus
        this.UI.show_auth_status_el()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    popup = new PopupUI()
})