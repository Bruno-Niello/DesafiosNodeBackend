# import pyautogui
# import threading
# import sys

# running = True
# screenSize = pyautogui.size()

# def moveMouse(x, y, duration):
#     pyautogui.moveTo(x, y, duration = duration)

# try:
#     while running:
#         moveMouse(100, 200, 1)
# except KeyboardInterrupt:
#     running = False
#     print("Script detenido manualmente.")
#     sys.exit()

import pyautogui
import time
from pynput import keyboard

running = True  # Control para detener el bucle

def move_in_pattern():
    global running
    screen_width, screen_height = pyautogui.size()

    positions = [
        (screen_width // 2, screen_height // 2),  # Centro de la pantalla
        (screen_width - 100, screen_height // 2),  # Lado derecho
        (100, screen_height // 2),  # Lado izquierdo
        (screen_width // 2, 100),  # Parte superior
        (screen_width // 2, screen_height - 100)  # Parte inferior
    ]

    while running:
        for pos in positions:
            if not running:
                break
            pyautogui.moveTo(pos[0], pos[1], duration=1)
            time.sleep(0.5)

def on_press(key):
    global running
    try:
        if key.char == 'q':  # Detener si se presiona 'q'
            running = False
            print("\nMovimiento detenido por el usuario.")
            return False  # Detener el listener
    except AttributeError:
        pass

try:
    print("Presiona 'q' para detener el movimiento.")
    listener = keyboard.Listener(on_press=on_press)
    listener.start()
    move_in_pattern()
    listener.join()  # Esperar a que se detenga el listener
except KeyboardInterrupt:
    running = False
