let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totalPrice = document.getElementById('total-price');
let amount = document.getElementById('amount');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let globalID;

// Calculate Total Price
function getTotalPrice(){
    if(price.value != ''){
        let total = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totalPrice.innerHTML = total;
        totalPrice.style.background = 'green';
    }
    else{
        totalPrice.innerHTML = '';
        totalPrice.style.background = 'red';
    }
}

// Add Product
let productsData;
if(localStorage.product != null){
    productsData = JSON.parse(localStorage.product);
}
else{
    productsData = [];
}
submit.onclick = function(){
    // Create new product
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: totalPrice.innerHTML,
        amount: amount.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != '' && amount.value <= 100 && category.value != ''){
        if(mood === 'create'){
            if(newProduct.amount > 1){
                for(let i = 0; i < newProduct.amount; ++i){
                    productsData.push(newProduct); // Save 'amount' number to the array
                }
            }
            else{
                productsData.push(newProduct); // Save only one product to the array
            }
        }
        else{
            productsData[globalID] = newProduct;
            mood = 'create';
            amount.style.display = 'block';
            submit.innerHTML = 'Create';
        }
        resetData();
    }

    localStorage.product = JSON.stringify(productsData); // Save it to local storage
    showData();
}

// Clear Inputs
function resetData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totalPrice.innerHTML = '';
    amount.value = '';
    category.value = '';
}

// Read Product Data
function showData(){
    getTotalPrice();
    let table = '';
    for(let i = 0; i < productsData.length; ++i){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${productsData[i].title}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].taxes}</td>
            <td>${productsData[i].ads}</td>
            <td>${productsData[i].discount}</td>
            <td>${productsData[i].total}</td>
            <td>${productsData[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tBody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll');
    if(productsData.length > 0){
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All Products (${productsData.length})</button>
        `
    }
    else{
        deleteAll.innerHTML = '';
    }
}

// Show Data All Time
showData()

// Delete One Product
function deleteProduct(id){
    productsData.splice(id,1);
    localStorage.product = JSON.stringify(productsData);
    showData();
}

// Delete All Products
function deleteAll(){
    localStorage.clear();
    productsData.splice(0);
    showData();
}

// Update One Product
function updateProduct(id){
    globalID = id;
    title.value = productsData[id].title;
    price.value = productsData[id].price;
    taxes.value = productsData[id].taxes;
    ads.value = productsData[id].ads;
    discount.value = productsData[id].discount;
    getTotalPrice();
    amount.style.display = 'none';
    category.value = productsData[id].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// Get Serach Mood
let searchMood = 'title';
function getSearchMood(moodId){
    let searchInput = document.getElementById('search');
    if(moodId == 'searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood = 'category';
    }
    searchInput.placeholder = 'Search By ' + searchMood ;
    searchInput.focus();
    searchInput.value = '';
    showData();
}

// Search for Products
function searchForProducts(searchValue){
    let table = '';
    for(let i = 0; i < productsData.length; ++i){
        if(searchMood == 'title'){
            if(productsData[i].title.includes(searchValue.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
            }
        }
        else{
            if(productsData[i].category.includes(searchValue.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    

    document.getElementById('tBody').innerHTML = table;
}
