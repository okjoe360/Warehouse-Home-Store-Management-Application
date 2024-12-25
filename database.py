from peewee import *
import datetime


db = SqliteDatabase('my_database.db')

class BaseModel(Model):
    class Meta:
        database = db

class Store(BaseModel):
    store_name = CharField()
    description = TextField()
    created_date = DateTimeField(default=datetime.datetime.now)
    is_active = BooleanField(default=True)

    def to_json(self):
        return {
            "id": self.id, "store_name": self.store_name, "description": self.description, "created_date":self.created_date, "is_active": self.is_active,
            "items": [i.to_json() for i in self.items]
        }


class Category(BaseModel):
    category_name = CharField()
    description = TextField()
    created_date = DateTimeField(default=datetime.datetime.now)
    is_active = BooleanField(default=True)


class Item(BaseModel):
    item_name = CharField()
    description = TextField()
    quantity = IntegerField(default=0)
    store = ForeignKeyField(Store, backref='items')
    category = ForeignKeyField(Category, backref='items')
    created_date = DateTimeField(default=datetime.datetime.now)
    is_active = BooleanField(default=True)


    def to_json(self):
        return {
            "item_name": self.item_name, "description": self.description,
            "created_date":self.created_date, "is_active": self.is_active,
            "quantity":self.quantity, "id": self.id,
            "category": {
                "category_name": self.category.category_name, 
                "category_description": self.category.description
                }
        }