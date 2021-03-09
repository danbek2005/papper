APP_STATUS = false
AUTH_STATUS = false


get_domain = (url) => {
    domain = (new URL(url))
    domain = domain.hostname
    return domain
}

put_script = (name) => {
    chrome.tabs.executeScript(null, { file: "scripts/" + name + ".js" })
}

track_rebooting = (id, d) => {
    chrome.tabs.query({ status: "loading", tabId: id }, () => {
        if (domain.get() == d) {
            put_script("foreground")
        }
    })
}

interval = () => {
    console.log(APP_STATUS)
    chrome.tabs.query({ active: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "PING" }, res => {
            console.log(res)
            if (!res) {
                chrome.tabs.get(tabs[0].id, info => {
                    if (/^https:\/\/ftl\.kherson\.ua\//.test(info.url)) {
                        put_script("foreground")
                        clearInterval(interval)
                        chrome.extension.onConnect.addListener((port) => {
                            port.postMessage({ type: "status" })
                            port.onMessage.addListener(message => {
                                console.log(message)
                                if (message == "200") {
                                    setInterval(interval)
                                }
                            })
                        })
                    }
                })
            }
        })
    })
}

chrome.extension.onConnect.addListener((port) => {
    if (port.name == "POPUP STREAM") {
        port.onMessage.addListener(message => {
            console.log(message)
            if (message.type == "GET-AUTH-STATUS") {
                port.postMessage({type: "RETURN-AUTH-STATUS", data: AUTH_STATUS})
            }
            if(message.type == "GET-APP-STATUS"){
                port.postMessage({type: "RETURN-APP-STATUS", data: APP_STATUS})
            }
        })
    }
})
    //setInterval(interval, 1000)

//----------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "send_user_data") {
        chrome.windows.create({
            'url': 'ui_content/save_data_alert.html',
            'type': 'popup',
            'width': 360,
            'height': 360,
            'top': 100,
            'left': (4 * 360)
        }, (window) => {
            chrome.extension.onConnect.addListener((port) => {
                port.postMessage({ type: "save_data", data: request.data })
                port.onMessage.addListener(message => {
                    if (message == "close_window") {
                        chrome.windows.remove(window.id, () => { })
                    }
                    else if (message == "save_data") {
                        chrome.storage.sync.set(message.data, () => { })
                        chrome.windows.remove(window.id, () => { })
                    }
                })
            })
        });
    }
})


//chrome.windows.create({url: "https://" + request.url, focused: false, type: "popup"})