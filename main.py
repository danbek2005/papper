from tkinter import *
from tkinter import Button
import os

root = Tk()
root.geometry('360x360')
root.title('Aloha')

def gay():
    text = Label(root, text="You really gay")
    text.pack()

btn = Button(root, text="GAY", bg="red", fg="green", command=lambda: gay())
btn.place(x=145, y=160)

root.mainloop()