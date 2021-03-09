import eel
import urllib3

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome = webdriver.Chrome()

waiter = WebDriverWait(chrome, 300)



url = "https://ftl.kherson.ua"
domain = url.split('/')[2]
_http = urllib3.PoolManager()
r = _http.request('GET', url)
if r.status == 200:
    headers = r.headers
    print(headers)

eel.init("web")
eel.start("main.html", block=False)


@eel.expose
def auth(username, password):
    pass


while True:
    eel.sleep(10)