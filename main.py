import eel
import urllib3
import mechanize
import http.cookiejar

# headers
url = "https://ftl.kherson.ua/index.php?option=com_users&view=login&Itemid=985"
_http = urllib3.PoolManager()
r = _http.request('GET', url)
if r.status == 200:
    headers = r.headers
    print(headers)

eel.init("web")
eel.start("main.html", block=False)


@eel.expose
def auth(username, password):
    br = mechanize.Browser()

    # Cookie Jar
    cj = http.cookiejar.LWPCookieJar()
    br.set_cookiejar(cj)

    # options
    br.set_handle_robots(False)
    br.set_handle_redirect(True)
    br.set_handle_refresh(False)
    br.set_handle_referer(True)
    br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 '
                                    'Fedora/3.0.1-1.fc9 Firefox/3.0.1')]

    br.open(url)

    for form in br.forms():
        print(form)
    br.select_form(nr=2)
    br.form['username'] = username
    br.form['password'] = password
    br.find_control("remember").items[0].selected = True
    br.submit()



while True:
    eel.sleep(10)

# print("Connect to " + url.split('/')[2] + "...")
# import re
# import urllib3
# from nerodia.browser import Browser
#
#
# browser = Browser(browser='chrome')
# browser.goto('https://ftl.kherson.ua/')
#
# browser.link(value='#logout').click()
# username_input = browser.text_field(title='username')
# username_input.value = ''
# password_input = browser.text_field(title='password')
# password_input.value = ''
# browser.button(value="lp-button").click()
# browser.close()
# br.submit()
