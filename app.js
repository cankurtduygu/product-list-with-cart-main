"use strict";
const productList = document.querySelector(".product-list");
const buttonConfirm = document.querySelector(".buttonConfirm");
const yourCardSection = document.querySelector(".your-card-section");
const emptyCardDiv = document.querySelector(".empty-card");

let productArray = [];
const cardMap = new Map(); // key: product.name, value: { ...product, quantity }


//Fetch product data from data.json

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
const renderProducts = () => {
  productList.innerHTML = "";
  productArray.forEach((product) => {
    productList.innerHTML += `<div class="product-card">
          <div class="product-img-section">
            <picture class="product-img">
              <source srcset="${product.image.desktop}" media="(min-width: 992px)">
              <source srcset="${product.image.tablet}" media="(min-width: 768px)">
              <img class="product-img" src="${product.image.mobile}" alt="${product.fullname}">
            </picture>
            <button class="product-add-button-first text-3">
            <img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
        <button class="button-second">
            <div class="decrement-div"><img src="./assets/images/icon-decrement-quantity.svg" alt=""></div>
          
            <span class="quantity-button text-2">1</span>

            <div class="increment-div"><img src="./assets/images/icon-increment-quantity.svg" alt=""></div>
          
        </button>
          </div>
          <div class="product-info">
            <p class="product-name">${product.category}</p>
            <p class="product-fullname">${product.name}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
         </div>`;
  });

  const productAddButtons = document.querySelectorAll(
    ".product-add-button-first",
  );
  // console.log(productAddButtons);

  updateCardData(productAddButtons);
};

function addToCard(product) {
  const key = product.name;

  if (cardMap.has(key)) {
    cardMap.get(key).quantity += 1;
  } else {
    cardMap.set(key, { ...product, quantity: 1 });
  }

  

}

function removeFromCard(product) {
  const key = product.name;

  if (!cardMap.has(key)) return;

  const item = cardMap.get(key);
  item.quantity -= 1;

  if (item.quantity <= 0) {
    cardMap.delete(key);
  }
}


const updateCardData = (productAddButtons) => {
  productAddButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const selectedProduct = productArray[index];


      button.style.display = "none";
      const quantityButton = button.nextElementSibling;
      quantityButton.style.display = "flex";

      addToCard(selectedProduct);

      let currentQuantity = cardMap.get(selectedProduct.name).quantity;


      const decrement = quantityButton.querySelector(".decrement-div");
      const increment = quantityButton.querySelector(".increment-div");
      const quantityDisplay = quantityButton.querySelector(".quantity-button");
      quantityDisplay.textContent = currentQuantity;

      increment.onclick = () => {
        addToCard(selectedProduct);
        currentQuantity = cardMap.get(selectedProduct.name).quantity;
        quantityDisplay.textContent = currentQuantity;

        updateCardDisplay(selectedProduct, "add");
      };

      decrement.onclick = () => {
        removeFromCard(selectedProduct);
         // Ürün sepetten tamamen çıktıysa UI geri dönsün
        if (!cardMap.has(selectedProduct.name)) {
          quantityButton.style.display = "none";
          button.style.display = "flex";
          updateCardDisplay(selectedProduct, "remove");
          return;
        }

        currentQuantity = cardMap.get(selectedProduct.name).quantity;
        quantityDisplay.textContent = currentQuantity;

        updateCardDisplay(selectedProduct, "remove");
      };

      updateCardDisplay(selectedProduct, "add");
    });
  });
};

function updateCardDisplay(product, action) {
  const cardItems = Array.from(cardMap.values());
  
  
  const totalPriceElement = document.querySelector(".total-price");

  const total = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  
  if (emptyCardDiv) {
    emptyCardDiv.style.display = "none";
    buttonConfirm.style.display = "block";
  }

  yourCardSection.innerHTML = "";

  cardMap.forEach((item)=>{

    yourCardSection.innerHTML += `<div class="your-card-product-container">
          <!-- Card Items -->
          <div class="your-card-product-name">
            <p class="text-2">${item.name}</p>

            <div class="your-card-product-details">
              <p class="yc-product-quantity textBold-4">${item.quantity}</p>
              <p class="yc-product-price">@ $${item.price.toFixed(2)}</p>
              <p class="yc-product-total-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
          <div class="your-card-image-remove">
            <img src="./assets/images/icon-remove-item.svg" alt="">
          </div>
        </div>`
    
  });

  const removeIcons = document.querySelectorAll(".your-card-image-remove");
  
  removeIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      const productToRemove = Array.from(cardMap.values())[index];
      removeItemFromCard(productToRemove);
    });
  });
}

function removeItemFromCard(product) {
  cardMap.delete(product.name);
  updateCardDisplay();

  // Eğer sepet boşaldıysa boş sepet mesajını göster
  if (cardMap.size === 0) {
    emptyCardDiv.style.display = "flex";
    buttonConfirm.style.display = "none";
  }

}

