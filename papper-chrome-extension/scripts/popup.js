main_auth_status = false
data = {}

set_ui_status = () => {
    el = document.getElementById("status")
    if (!main_auth_status){
        el.innerHTML = "<img src='../images/error_el.png' class='status_img'><h4>Not authorized</h4>"
    }else{
        el.innerHTML = "<img src='../images/200.png' class='status_img'><h4>Authorization is successful</h4>"
    }
}


document.addEventListener("DOMContentLoaded", () => {
    set_ui_status()
    if(!main_auth_status){
        auth.style.display = "block";
        document.getElementById("auth_btn").addEventListener("click", () => {
            data.mail = mail.value
            data.password = password.value
            alert(data.mail)
        })
    }
})

chrome.browserAction.onClicked.addListener(function(tab) {
    alert("Hello")
  });