import tkinker as tk
from tkinker import messagebox 

def get_button(windows,text,color,command,fg=white)
    button=tk.button(
                     windows,
                     text=text,
                     activebackground="black",
                     activeforeground="white",
                     fg=fg,
                     bg=color,
                     command=command,
                     height=2,
                     width=20
                     font=('helvetica bold',20)
                 )
    return button

    def get_image_label(window):
        label = tk.label(window)
        label.grid(row=0,coloumn=0)
        return label

def get_img_label(window.text):
    label=tk.label(window,text=text)
    label.config(font=("sans-serif",21),justify="left")
    retern label

def get_entry_text(window):
    inputtext = tk.text(window,
                        height=2,
                        width=15,font=("arial"),32)
                        return inputtext

                        def msg_box(title,description):
                            messagebox.showinfo(title,description)