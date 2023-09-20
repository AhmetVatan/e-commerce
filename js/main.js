import headerFunc from "./header.js";
import productsFunc from "./product.js";
import searchFunc from "./search.js";

//! add products to localStorage start
(async function (){
    const photos = await fetch("../js/data.json");
    const data = await photos.json();

    data ? localStorage.setItem("products",JSON.stringify
    (data)) : []
    // eğer trueysa yani data varsa ürünleri ekle yoksa boş dizi döndür
    productsFunc(data);
    searchFunc(data);
})();

//! add products to localStorage end

//! add cardItems to localStorage start

const cardItems = document.querySelector(".header-card-count");

cardItems.innerHTML= localStorage.getItem("card")
 ? JSON.parse(localStorage.getItem("card")).length
  : "0" ;

//! add cardItems to localStorage end

//! modal dialog start
const modalDialogDOM = document.querySelector(".modal-dialog");
const modalContentDOM = document.querySelector(".modal-dialog .modal-content");
const btnCloseDialog = document.querySelector(".modal-dialog .modal-close");

setTimeout(() =>{
  modalDialogDOM.classList.add("show");
},2000);

btnCloseDialog.addEventListener("click",function(){
  modalDialogDOM.classList.remove("show");
});

document.addEventListener("click", (e) =>{
 if(!e.composedPath().includes(modalContentDOM)){
  modalDialogDOM.classList.remove("show");
 }
});



//! modal dialog end

