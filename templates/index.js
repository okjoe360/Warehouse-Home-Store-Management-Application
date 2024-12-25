var client = new ClientAPI();

$(function(){
    console.log("DOM is ready!!!");
    client.getStores();
    eel.get_all_category()(function(res){ setTimeout(()=>localStorage.setItem("categories", JSON.stringify(res.data)), 8000); })
    $('#storeBody').hide();
    setTimerCounter();
})


$('#modalForm').on('submit', async function(e){
    e.preventDefault();
    $('#modalFormError').text();
    var formName = $('#form-name').val();
    if(formName === 'createStore'){
        await client.createStore($('#store_name').val(), $('#store_description').val());
    } else if(formName === 'createCategory'){
        await client.createCategory($('#category_name').val(), $('#category_description').val());
    } else if(formName === 'addItem'){
        await client.createItem($('#item_name').val(), $('#item_description').val(), $('#item_quantity').val(), $('#item_category').val(), $('#store_id').val());
    }
    
})


async function setStore(storeID){
    console.log(storeID);
    await client.getOneStore(storeID);
}


async function openModel(target, title=""){
    $('#mainModal .modal-title').text(title);
    var formHtml = '';
    if (target === 'createStore'){
        formHtml = `
            <div class="mb-3">
                <label for="store_name" class="form-label">Store Name</label>
                <input type="text" class="form-control" id="store_name">
            </div>
            <div class="mb-3">
                <label for="store_description" class="form-label">Description</label>
                <textarea class="form-control" id="store_description" rows="3"></textarea>
            </div>
        `
    }

    if (target === 'createCategory'){
        formHtml = `
            <div class="mb-3">
                <label for="category_name" class="form-label">Category Name</label>
                <input type="text" class="form-control" id="category_name">
            </div>
            <div class="mb-3">
                <label for="category_description" class="form-label">Description</label>
                <textarea class="form-control" id="category_description" rows="3"></textarea>
            </div>
        `
    }

    if(target === 'addItem'){
        
        var categoriesOptionString = "";
        var categories = client.getCategories() || JSON.parse(localStorage.getItem('categories'));
        console.log('categories', categories);
        categories.map((item, idx) => {
            categoriesOptionString += `<option value="${item.id}">${item.category_name}</option>`
        })

        var storeID = $("#storeHeader h1").data( "storeid" );
        formHtml = `
            <div class="mb-3">
                <label for="item_name" class="form-label">Item Name</label>
                <input type="text" class="form-control" id="item_name">
            </div>
            <div class="mb-3">
                <label for="item_description" class="form-label">Description</label>
                <textarea class="form-control" id="item_description" rows="3"></textarea>
            </div>
            <div class="row">
                    <div class="col-4 mb-3">
                        <label for="item_quantity" class="form-label">Quantity</label>
                        <input type="number" min="0" class="form-control" id="item_quantity">
                    </div>
                    <div class="col-8 mb-3">
                        <label for="item_category" class="form-label">Category</label>
                        <select class="form-control" id="item_category">
                            <option value=""></option>
                            ${categoriesOptionString}
                        </select>
                    </div>
            </div>
            <input type="hidden" value="${storeID}" id="store_id" />
        `
    }


    if(target === 'aboutApp'){
        formHtml = `
            <h3>About the App</h3>
            <p>A Simple Desktop Warehouse / Home Application built using Python eel and Peewee</p>
        `
    }

    formHtml += `<input value="${target}" id="form-name" type="hidden"/>`

    $('#modalFormContent').html(formHtml);
    $('#mainModal').modal("show");
}


function removeItemFxn(itm_id, storeID){
    console.log("removeItemFxn(==", itm_id, storeID)
    client.removeItem(itm_id, storeID);
}


function setTimerCounter(){
    setInterval(()=>$('#timerCounter').text(new Date().toLocaleString()), 1000)
}
