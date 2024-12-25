class ClientAPI {
    async getStores(){
       await eel.get_all_stores()(function(res){
            if(res.status === 400 ){
                $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
            }
            if(res.status == 200){
                var storeListsHtml = "";
                res.data.map((item, idx) => {
                    storeListsHtml += `<button type="button" class="list-group-item list-group-item-action text-primary border border-primary border-2 my-1" data-storeID="${item.id}" onclick="setStore('${item.id}')">${item.store_name}</button>`;                
                })
                $('#storesList').html(storeListsHtml);
            }
        });
    }

    async getOneStore(storeID){
        await eel.get_one_store(storeID)(function(res){
             console.log(res);
             if(res.status === 400 ){
                $('#storeHeader').html(`
                    <div class="card-body">
                        <h3 class="text-primary">Store not Found...</h3>
                        <p class="fw-bold text-danger">${res.data}</p>
                    </div>
                    `)
                $('#storeBody').hide();
                console.error(res.errorMssg);
             }
             if(res.status == 200){
                $('#storeHeader').html(`
                    <div class="card-body">
                        <h3 class="text-primary" data-storeid="${storeID}">${res.data.store_name}</h3>
                        <p class="fw-bold text-primary">${res.data.description}</p>
                    </div>
                    `)

                if (res.data.items.length > 0){
                    var tableRows = '';
                    res.data.items.map((itm, idx)=>{
                        tableRows += `<tr>
                            <td>${itm.item_name}</td>
                            <td>${itm.description}</td>
                            <td>${itm.quantity}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="removeItemFxn('${itm.id}', '${storeID}')">EDIT</button>
                                <button class="btn btn-danger btn-sm" onclick="removeItemFxn('${itm.id}', '${storeID}')">DELETE</button>
                            </td>
                        </tr>`
                    })
                    $('#storeBodyContent').html(`
                                <table class="table">
                                    <thead>
                                        <tr class="table-primary">
                                            <td>NAME</td><td>DESC</td><td>QTY</td><td>ACTION</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tableRows}
                                    </tbody>
                                </table>
                        `)
                }else{
                    $("#storeBodyContent").html('<h3>No Items in Store...</h3>');
                }

                $('#storeBody').show();
                 console.log(res.data);
             }
         });
     }


    async createStore(store_name, store_description){
        if(!store_name || !store_description){
            $('#modalFormError').html('<span class="text-danger">Fill all Fields</span>');
            return
        }
        await eel.create_store(store_name, store_description)(function(res){
            console.log(res);
            if(res.status === 400 ){
                $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
            }
            
            if(res.status === 201){
                $('#modalFormError').html('<span class="text-success">Store Created Successfully</span>');

                setTimeout(()=>{
                    var client = new ClientAPI();
                    client.getStores();
                    $('#mainModal .btn-close').click();
                }, 1000);
            }
        });
     }


     getCategories(){
        eel.get_all_category()(async function(res){
            console.log('getCategories == ', res)
             if(res.status === 400 ){
                 $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
             }
             if(res.status == 200){
                return res.data;
             }

             return [];
         });
     }

     async createCategory(category_name, category_description){
        if(!category_name || !category_description){
            $('#modalFormError').html('<span class="text-danger">Fill all Fields</span>');
            return
        }
        await eel.create_category(category_name, category_description)(function(res){
            if(res.status === 400 ){
                $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
            }
            
            if(res.status === 201){
                $('#modalFormError').html('<span class="text-success">Category Created Successfully</span>');
                setTimeout(()=>$('#mainModal .btn-close').click(), 1000)
            }
        });

        setTimeout(()=>{
            eel.get_all_category()(function(res){ setTimeout(()=>localStorage.setItem("categories", JSON.stringify(res.data)), 2000); })
        }, 1000);
     }

     /** ITEMS  */
     async createItem(item_name, item_description, item_quantity, item_category, store_id){
        if(!item_name || !item_description || !item_quantity || !item_category || !store_id){
            $('#modalFormError').html('<span class="text-danger">Fill all Fields</span>');
            return
        }
        await eel.create_item(item_name, item_description, item_quantity, item_category, store_id)(function(res){
            if(res.status === 400 ){
                $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
            }
            
            if(res.status === 201){
                $('#modalFormError').html('<span class="text-success">Item Added Successfully</span>');
                setTimeout(()=>$('#mainModal .btn-close').click(), 1000);
                var client = new ClientAPI();
                client.getOneStore(store_id);
            }
        });
     }


     async removeItem(item_id, store_id){
        if(!item_id){
            $('#modalFormError').html('<span class="text-danger">Fill all Fields</span>');
            return
        }
        await eel.remove_item(item_id)(function(res){
            if(res.status === 400 ){
                $('#modalFormError').html(`<span class="text-danger">${res.data}</span>`);
            }
            
            if(res.status === 200){
                $('#modalFormError').html('<span class="text-success">Item Deleted Successfully</span>');                
            }
        });

        setTimeout(()=>{
            var client = new ClientAPI();
            client.getOneStore(store_id);
            $('#mainModal .btn-close').click();
        }, 1000);
     }

}