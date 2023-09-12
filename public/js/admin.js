const deleteRestaurant = (btn) =>{
    
    // using asynchronous js to delete a product :

    prodId = btn.parentNode.querySelector('[name=restaurantId]').value;
    prodElement = btn.closest('.ok-product');

    fetch('/restaurant/product/' + prodId,{
                method:'DELETE'
    })
    .then(result =>{
        return result.json();
    })
    .then(val =>{
        prodElement.remove();
    })
    .catch(err =>{
         console.log(err);
    })
}

const editProduct = (btn) =>{
    // using asynchronous javascript to edit the product
    
}