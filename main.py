import eel
import urllib3

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