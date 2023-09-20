

 let card =localStorage.getItem("card")
 ? JSON.parse(localStorage.getItem("card"))
  : [];






function displayCardProduct(){
    const cardWrapper =document.querySelector(".card-wrapper");
    let result ="";
    card.forEach((item) => {
        result+=`
        <tr class="card-item">
            <td></td>
            <td class="card-image">
            <img src=${item.img.singleImage} alt="" />
            <i class="bi bi-x delete-card" data-id=${item.id}></i>
            </td>
            <td>${item.name}</td>
            <td>$${item.price.newPrice.toFixed(2)}</td>
            <td class="product-quantity">${item.quantity}</td>
            <td class="product-subtotal">$${(item.price.newPrice * item.quantity
             ).toFixed(2)}</td>

         </tr>
      `;
    });
    cardWrapper.innerHTML=result;
    removeCardItem();
}

displayCardProduct();

function removeCardItem(){
    
    const btnDeleteCard =document.querySelectorAll(".delete-card");
    let cardItems = document.querySelector(".header-card-count");

    btnDeleteCard.forEach((button) => {
        button.addEventListener("click",function(e){
            const id = e.target.dataset.id;
            card = card.filter((item)=> item.id !== Number(id));
            displayCardProduct();
            localStorage.setItem("card",JSON.stringify(card));
            cardItems.innerHTML=card.length;
            saveCardValues();
            //fiyatın güncellenmesi icin bu fonksiyonu cagırıyoruz.
        });
});
}

function saveCardValues(){
    const cardTotal =document.getElementById("card-total");
    const subTotal =document.getElementById("subtotal");
    const fastCargo =document.getElementById("fast-cargo");

    let itemsTotal =0;

    card.length > 0 && card.map((item)=> (itemsTotal += item.price.newPrice * item.quantity));
    
    subTotal.innerHTML= `$${itemsTotal.toFixed(2)}`;
    cardTotal.innerHTML= `$${itemsTotal.toFixed(2)}`;
    const fastCargoPrice = 15;
    fastCargo.addEventListener("change",function(e){
        if(e.target.checked){
        cardTotal.innerHTML= `$${(itemsTotal + fastCargoPrice).toFixed(2)}`;

        } else{
        cardTotal.innerHTML= `$${itemsTotal.toFixed(2)}`;
        }
    })
}

saveCardValues();
