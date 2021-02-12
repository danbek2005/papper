from tkinter import *
from tkinter import Button
from tkinter import messagebox
import os

root = Tk()
root.geometry('400x400')
root.title('Aloha')

def yes():
    i = 0;
    while(i < 100):
        print(i)
        i += 1
        gay_text = messagebox.showerror("YES", "YOU ARE GAY BOY")
def no():
    i = 0;
    while (i < 100):
        print(i)
        i += 1
        gay_text = messagebox.showerror("YES", "YOU ARE GAY BOY")
def exit():
    root.destroy()

btn_yes = Button(root, text="YES", bg="pink", fg="green", command=lambda: yes())
btn_yes.place(width=100, height=50, x=100, y=185)

btn_no = Button(root, text="NO", bg="pink", fg="green", command=lambda: no())
btn_no.place(width=100, height=50, x=200, y=185)

btn_exit = Button(root, text="EXIT", bg="pink", fg="gray", command=lambda: exit())
btn_exit.place(x=350, y=0, width=50, height=25)

root.mainloop()