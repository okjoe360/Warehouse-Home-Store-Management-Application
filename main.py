import eel
from views.database import db, Store, Category, Item
from views.controllers import *

eel.init('views')

if __name__ == "__main__":
    db.connect()
    db.create_tables([Store, Category, Item])
    eel.start('templates/index.html', size=(800, 600))