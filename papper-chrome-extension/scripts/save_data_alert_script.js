
draw_ui = (data) => {
    el = document.getElementById("save_data")
    el.innerHTML = ""
    data.forEach(e => {
        el.innerHTML += "<div class='item'>\
            <span class='name'>" + e.name + ": </span> \
            <span class='content'>" + e.value + "</span>\
        </div>"
    });
    el.innerHTML += "<div id='btns'>\
        <button id='save_btn'>Save</button>\
        <button id='close_btn'>Close</button>\
    </div>"
}

back_connect = () => {
    port = chrome.extension.connect({
        name: "Papper Communication"
    });
    port.onMessage.addListener((message) => {
        if(message.type == "save_data"){
            draw_ui(message.data)
            document.getElementById("save_btn").addEventListener("click", (e) => {
                port.postMessage("save_data")
            })
            document.getElementById("close_btn").addEventListener("click", (e) => {
                port.postMessage("close_window")
            })

        }
    });
}


window.onload = () => {
    back_connect()
}