import eel
import urllib3


http = urllib3.PoolManager()
r = http.request('GET', 'https://ftl.kherson.ua/')
if(r.status == 200):
    headers = r.headers
eel.init("web")

# todo: position and size doesn't work here
eel.start("main.html", geometry={'size': (200, 200), 'position': (0, 0)})

@eel.expose
def auth(mail, password):
    print(mail)
    print(password)








# import re
# import mechanize
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
#
# http = urllib3.PoolManager()
# r = http.request('GET', 'https://ftl.kherson.ua/')
# if(r.status == 200):
#     print(r.headers)
#
#
#
# # br = mechanize.Browser()
# # br.open("https://ftl.kherson.ua/")
# # br.click_link(link="https://ftl.kherson.ua/#logout")
# # br.select_form(name="lp-form")
# # br.form['username'] = ""
# # br.form['password'] = ""
# br.submit()
