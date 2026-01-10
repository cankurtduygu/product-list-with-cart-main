const productList = document.querySelector(".product-list");


let menu = [];
let productsInCart = [];

fetch("./data.json")
  .then((res) => res.json())
  .then((products) => {
    
    menu = products;
     console.log(menu);
     renderProducts();
  })
  .catch((err) => console.error("JSON okunamadı:", err));




const renderProducts = () => {
  menu.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML += `
      <div class="card">
        <img 
          src="${product.image.desktop}" 
          alt="${product.name}" 
          class="card-img"
        />
        <button class="buttonAdd textbold-4" data-product-id="${index}">
          <img src="./assets/images/icon-add-to-cart.svg" alt="">
          Add to Cart
        </button>
        <div class="buttonSecond textBold-4" data-product-id="${index}">
          <img class="decrement" src="./assets/images/icon-decrement-quantity.svg" alt=""> 
          <span class="buttonSecondSpan">1</span>
          <img class="increment" src="./assets/images/icon-increment-quantity.svg" alt="">
        </div>
      </div>
      <div class="card-defination">
        <p class="product-type text-4">${product.category}</p>
        <h2 class="product-name text-3">${product.name}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;
    productList.appendChild(card);
  });

  // Product list'e tek bir listener ekle
  productList.addEventListener("click", (e) => {
    const button = e.target.closest(".buttonAdd");
    if (button) {
      const productId = parseInt(button.dataset.productId);
      const product = menu[productId];
      const card = button.closest(".card");
      handleAddToCart(product, card, productId);
    }
  });
};

// Sepete ekleme işlemlerini yöneten fonksiyon
function handleAddToCart(product, card, index) {
  const buttonSecond = card.querySelector(".buttonSecond");
  const button = card.querySelector(".buttonAdd");
  button.style.display = "none";
  buttonSecond.style.display = "block";

  // Elementleri bul
  const incrementBtn = card.querySelector(".increment");
  const decrementBtn = card.querySelector(".decrement");
  const quantitySpan = card.querySelector(".buttonSecondSpan");
  const satilanProduct = document.querySelector(".satilan-product");

  // Ürün detayını oluştur ve ekle
  const productDetailElements = createProductDetail(product, satilanProduct);
  let quantity = 1;

  // Toplam fiyatı güncelleyen fonksiyon
  function updateTotal() {
    let totalPrice = product.price * quantity;
    productDetailElements.soldProductTotal.textContent = `$${totalPrice.toFixed(2)}`;
    productDetailElements.soldProductQuantity.textContent = `${quantity}x`;
    productDetailElements.totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // İlk bilgileri set et
  productDetailElements.soldProductName.textContent = product.name;
  productDetailElements.soldProductPrice.textContent = `@$${product.price.toFixed(2)}`;
  updateTotal();

  // Event listenerları ekle
  addQuantityListeners(incrementBtn, decrementBtn, quantitySpan, () => {
    quantity++;
    quantitySpan.textContent = quantity;
    updateTotal();
  }, () => {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateTotal();
    }
  });
}

// Ürün detayını oluşturan fonksiyon
function createProductDetail(product, container) {
  const productDetail = document.createElement("div");
  productDetail.className = "ürün-detay";
  productDetail.innerHTML += `
    <p class="satilan-Ürün-Adi textBold-4"></p>
    <p>
      <span class="satilan-Ürün-Adet textBold-4"></span>
      <span class="satilan-Ürün-Fiyat"></span>
      <span class="satilan-Ürün-Toplam"></span>
      <img src="./assets/images/icon-remove-item.svg" alt="">
    </p>`;
  container.appendChild(productDetail);
  return {
    soldProductQuantity: productDetail.querySelector(".satilan-Ürün-Adet"),
    soldProductName: productDetail.querySelector(".satilan-Ürün-Adi"),
    soldProductPrice: productDetail.querySelector(".satilan-Ürün-Fiyat"),
    soldProductTotal: productDetail.querySelector(".satilan-Ürün-Toplam"),
    totalPriceElement: document.querySelector(".total-fiyat")
  };
}

// Miktar arttırma/azaltma event listenerlarını ekleyen fonksiyon
function addQuantityListeners(incrementBtn, decrementBtn, quantitySpan, onIncrement, onDecrement) {
  incrementBtn.addEventListener("click", onIncrement);
  decrementBtn.addEventListener("click", onDecrement);
}


