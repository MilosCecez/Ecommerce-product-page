let cartBtn = document.querySelector('.cart-btn');
let cartContent = document.querySelector('.cart-content');
let emptyCart = document.querySelector('.empty-cart');
let cartCounter = document.querySelector('.cart-counter');
let checkoutBtn = document.querySelector('.checkout-btn');

let itemsCount = 0;
let i = 0;

cartBtn.addEventListener('click',addItem);
checkoutBtn.addEventListener('click',deleteAll);
window.addEventListener('DOMContentLoaded',setupItems);


function addItem(){
    let value = parseInt(counterValue[0].innerText);
    const id = new Date().getTime().toString();
    let parent = cartBtn.closest('.section');
    let image = parent.querySelector('.active');

if(value == 0){
    cartCounter.style.display = 'none';
    checkoutBtn.style.display = 'none';
}
else{
createListItem(id,value,image.src);

addToLocalStorage(id,value,image.src);


let textElement = cartContent.querySelector('.empty-cart');
textElement.remove();

}
}


function deleteItem(e){
    e.preventDefault();
    let element = e.currentTarget.parentElement.parentElement;
    let id = element.getAttribute('data-id');
    element.remove();
    if(cartContent.children.length == 0){
        deleteAll();
    }
    let removeMultiple = element.querySelector('.cart-multiple');
    let multiple = parseInt(removeMultiple.innerText.charAt(10));
    itemsCount -=multiple
    cartCounter.innerHTML = itemsCount;
    i --;
    removeFromLocalStorage(id);
}


function deleteAll(){
        cartCounter.style.display = 'none';
        checkoutBtn.style.display = 'none';
        let textElement = document.createElement('p');
        textElement.innerText = 'Your cart is empty';
        textElement.classList.add('empty-cart');
        cartContent.append(textElement);
        let elements = cartContent.querySelectorAll('.cart-item');
        elements.forEach(element =>{
            element.remove();
        });
        localStorage.removeItem('list');

}

function cartConterCount(){
    let cartMultiples = [...cartContent.querySelectorAll('.cart-multiple')];
            let multiple = parseInt(cartMultiples[i].innerText.charAt(10));
            itemsCount += multiple;
            cartCounter.innerText = itemsCount;
            i++;
}



function createListItem(id,value,image){
    cartContent.innerHTML += `<div class="cart-item" data-id="${id}"><div class="cart-menu-info">
    <img src="${image}" alt="">
    <div class="cart-menu-text">
      <p class="cart-title">Fall Limited Edition Sneakers</p>
      <div class="cart-multiple">$125.00 x ${value}<span>$${parseFloat((125.00 * value)).toFixed(2)}</span></div>
    </div>
    <div class="delete-product" onclick="deleteItem(event)"><svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg></div>
  </div>
</div>
</div>`
cartConterCount();
checkoutBtn.style.display = 'block';
cartCounter.style.display = 'block';

}







// local storage

function addToLocalStorage(id,value,image){
    const product = {id,value,image};
    let items = getLocalStorage();
    items.push(product);
    localStorage.setItem('list', JSON.stringify(items));
    console.log(items);
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items.forEach(item =>{
        if(item.id == id){
            let index = items.indexOf(item);
            items.splice(index,1);
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
    console.log(items);
}


function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(item =>{
            createListItem(item.id,item.value,item.image);
        });
    }
    else{
        let textElement = document.createElement('p');
        textElement.innerText = 'Your cart is empty';
        textElement.classList.add('empty-cart');
        cartContent.append(textElement);
    }

}



function getLocalStorage(){
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')) : [];
}


