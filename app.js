const productList = document.querySelector(".product-list");

let productArray=[];

const getProduct = async () => {
  try {
    const response = await fetch("data.json");
    productArray = await response.json();
  
    renderProducts();
  
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};
getProduct();



//Render a productList

const renderProducts = ()=>{

  productList.innerHTML = "";

  productArray.forEach((product)=>{
  productList.innerHTML += `<div class="product-card">
          <div class="product-img-section">
            <picture class="product-img">
              <source srcset="${product.image.desktop}" media="(min-width: 992px)">
              <source srcset="${product.image.tablet}" media="(min-width: 768px)">
              <img class="product-img" src="${product.image.mobile}" alt="${product.fullname}">
            </picture>
            <button class="product-add-button"><img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
          </div>
          <div class="product-info">
            <p class="product-name">${product.name}</p>
            <p class="product-fullname">${product.fullname}</p>
            <p class="product-price">$${(product.price).toFixed(2)}</p>
          </div>
         </div>`

})
};

