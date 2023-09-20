import { thumbsActiveFunc } from "./single-product/thumbsActive.js";
import { singleThumbs } from "./glide.js";
import zoomFunc from "./single-product/zoom.js";
import colorsFunc from "./single-product/colors.js";
import valuesFunc from "./single-product/values.js";
import tabsFunc from "./single-product/tabs.js";
import commentsFunc from "./single-product/comments.js";


const productId = localStorage.getItem("productId")
 ? JSON.parse(localStorage.getItem("productId"))
 : localStorage.setItem("productId",JSON.stringify(1));


 const products =localStorage.getItem("products")
 ? JSON.parse(localStorage.getItem("products"))
 : localStorage.setItem("productId",JSON.stringify([]));

 
 const findProduct = products.find((item)=> item.id === Number(productId));

//!  product title
 const productTitle = document.querySelector(".product-title");

 productTitle.innerHTML= findProduct.name;

//!  product price
 const newPriceDOM = document.querySelector(".new-price");
 const oldPriceDOM = document.querySelector(".old-price");

 newPriceDOM.innerHTML=`$${findProduct.price.newPrice.toFixed(2)}`;
 oldPriceDOM.innerHTML=`$${findProduct.price.oldPrice.toFixed(2)}`;

//!  product gallery
const singleImageDOM = document.querySelector("#single-image");

singleImageDOM.src=findProduct.img.singleImage;

const galleryThumbs = document.querySelector(".gallery-thumbs");
let result = "";
findProduct.img.thumbs.forEach((item)=>{
    result +=`
    <li class="glide__slide">
     <img src=${item} alt="" class="img-fluid "/>
    </li>
    `;
});

galleryThumbs.innerHTML= result;
singleThumbs();
thumbsActiveFunc();

const productThumbs = document.querySelectorAll(".product-thumb .glide__slide img");

productThumbs[0].classList.add("active");

//! add to card
let card =localStorage.getItem("card") ?
 JSON.parse(localStorage.getItem("card"))
 : [];



 const findCard = card.find((item) => item.id === findProduct.id);
 const btnAddToCard = document.getElementById("add-to-card");
 const quantityDOM = document.getElementById("quantity");
 let cardItems = document.querySelector(".header-card-count");

 if(findCard){
    btnAddToCard.setAttribute("disabled","disabled");
 } else{
    btnAddToCard.addEventListener("click",function(){
        card.push({...findProduct,quantity: Number(quantityDOM.value) });
        btnAddToCard.setAttribute("disabled","disabled");
        localStorage.setItem("card",JSON.stringify(card));
        cardItems.innerHTML=card.length;
        
    })
 }


