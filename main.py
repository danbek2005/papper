from tkinter import *
from tkinter import Button
from tkinter import messagebox
import os

root = Tk()
root.geometry('360x360')
root.title('Aloha')

def yes():
    gay_text = messagebox.showerror("YES", "Yes you gay☺♥♥")
def no():
    gay_text_no = messagebox.showerror("!!!WHY?!!!", "You gay☺☻☺")
def exit():
    root.destroy()

btn_yes = Button(root, text="YES", bg="red", fg="green", command=lambda: yes())
btn_yes.place(x=145, y=160)

btn_no = Button(root, text="NO", bg="blue", fg="green", command=lambda: no())
btn_no.place(x=145, y=185)

btn_exit = Button(root, text="GOODBYE", bg="purple", fg="gray", command=lambda: exit())
btn_exit.place(x=200, y=200)

root.mainloop()