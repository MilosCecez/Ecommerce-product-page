//cart open
let cartLogo = document.querySelector('.cart-logo');
let cartMenu = document.querySelector('.cart-menu');

cartLogo.addEventListener('click', ()=>{
    cartMenu.classList.toggle('opened');
});

//counter action

let decrementBtn = document.getElementById('minus');
let incrementBtn = document.getElementById('plus');
let counter = document.getElementsByClassName('counter'); 
let counterValue = document.getElementsByClassName('counter-value');


decrementBtn.addEventListener('click', ()=>{
    let value = parseInt(counterValue[0].innerText);
    if(value > 0){
        value --;
        counterValue[0].innerText = value;
    } 
});

incrementBtn.addEventListener('click', ()=>{
    let value = parseInt(counterValue[0].innerText);
    value ++;
    counterValue[0].innerText = value;   
});

//change main img

let modalImages = document.querySelectorAll('.modal-img');
let mainImg = document.querySelector('.main-img');
let overlay = document.querySelector('.overlay');
let mainImgOverlay = document.querySelector('.main-img-overlay');
let modalImagesOverlay = document.querySelectorAll('.modal-img-overlay');

    modalImages.forEach(modalImg =>{
        modalImg.addEventListener('click', e =>{
            let clickedImg = e.currentTarget;
            let id = clickedImg.getAttribute('id');
            changeModal(id);
        })
    })


let closeBtn = document.querySelector('.close-btn');
let prevBtn = document.querySelector('.previous-btn');
let nextBtn = document.querySelector('.next-btn');


closeBtn.addEventListener('click', ()=>{
    overlay.style.display = 'none';
    let activeImg = overlay.querySelector('.active');
    const id = activeImg.getAttribute('id');
    mainImg.src = `images/image-product-${id}.jpg`;
    modalImages.forEach(modalImg =>{
        modalImg.classList.remove('active');
    })
    modalImages[id - 1].classList.add('active');
    modalImagesOverlay.forEach(modalImg =>{
        modalImg.classList.remove('active');
    });
});

nextBtn.addEventListener('click', ()=>{
                let activeImg = overlay.querySelector('.active');
                let nextElement = activeImg.nextElementSibling || activeImg.parentElement.firstChild.nextSibling;
                activeImg.classList.remove('active');
                nextElement.classList.add('active');
                const id = nextElement.getAttribute('id');
                mainImgOverlay.src = `images/image-product-${id}.jpg`;      
    });

prevBtn.addEventListener('click', ()=>{
        let activeImg = overlay.querySelector('.active');
        let prevElement = activeImg.previousElementSibling || activeImg.parentElement.lastChild.previousSibling;
        activeImg.classList.remove('active');
        prevElement.classList.add('active');
        const id = prevElement.getAttribute('id');
        mainImgOverlay.src = `images/image-product-${id}.jpg`;    
});





function changeModal (id) {
    overlay.style.display = 'flex';
    mainImgOverlay.src = `images/image-product-${id}.jpg`;
    modalImagesOverlay[id - 1].classList.add('active');
    modalImagesOverlay.forEach(modalImg =>{
        modalImg.addEventListener('click', e=>{
            modalImagesOverlay.forEach(item =>{
                item.classList.remove('active');
               }) 
           e.currentTarget.classList.add('active');
           let id = e.currentTarget.getAttribute('id');
           mainImgOverlay.src = `images/image-product-${id}.jpg`;     
        })
    })
}










