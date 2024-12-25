import eel
from views.database import db, Store, Category, Item
from playhouse.shortcuts import model_to_dict

@eel.expose
def get_all_stores():
    try:
        stores = list(Store.select().dicts())
        return {"status":200, "data":stores}
    except:
        return {"status":400, "data":"Database error"}


@eel.expose
def get_one_store(storeID):
    try:
        store = Store.get_by_id(storeID)
        return {"status":200, "data": store.to_json()}
    except Exception as e:
        return {"status":400, "data":"Database error", "errorMssgs": str(e)}


@eel.expose
def create_store(store, description):
    try:
        new_store = Store.create(store_name=store, description=description)
        return {"status":201, "data":new_store}
    except:
        return {"status":400, "data":"Database error"}

""" CATEGORY """
@eel.expose
def get_all_category():
    try:
        categories = list(Category.select().dicts())
        return {"status":200, "data":categories}
    except Exception as e:
        return {"status":400, "data":"Database error", "errorMssgs": str(e)}


@eel.expose
def create_category(category_name, description):
    try:
        new_category = Category.create(category_name=category_name, description=description)
        return {"status":201, "data":new_category}
    except Exception as e:
        return {"status":400, "data":"Database error", "errorMssgs": str(e)}


""" ITEMS """
@eel.expose
def create_item(item_name, item_description, item_quantity, item_category, store_id):
    try:
        new_item = Item.create(item_name=item_name, description=item_description, quantity=item_quantity, category=item_category, store=store_id)
        return {"status":201, "data":new_item}
    except Exception as e:
        return {"status":400, "data":"Database error", "errorMssgs": str(e)}

@eel.expose
def remove_item(item_id):
    try:
        item = Item.get_by_id(item_id)
        item.delete_instance()
        return {"status":200, "data":""}
    except Exception as e:
        return {"status":400, "data":"Database error", "errorMssgs": str(e)}