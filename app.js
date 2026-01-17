const productList = document.querySelector(".product-list");
const buttonConfirm = document.querySelector(".buttonConfirm");

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

//ürünlerin sayfaya basildigi yer
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
      buttonConfirm.style.display = "block";
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

  // Sepete eklenen ürünü productsInCart dizisine ekle
  productsInCart.push({
    id: index,
    product: product,
    quantity: quantity,
    productDetailElements: productDetailElements,
  });

  // Toplam fiyatı güncelleyen fonksiyon
  function updateTotal() {
    let totalPrice = product.price * quantity;
    productDetailElements.soldProductTotal.textContent = `$${totalPrice.toFixed(2)}`;
    productDetailElements.soldProductQuantity.textContent = `${quantity}x`;
    updateCartTotal(); // Tüm sepetin toplamını güncelle
  }

  // İlk bilgileri set et
  productDetailElements.soldProductName.textContent = product.name;
  productDetailElements.soldProductPrice.textContent = `@$${product.price.toFixed(2)}`;
  updateTotal();

  // Event listenerları ekle
  addQuantityListeners(
    incrementBtn,
    decrementBtn,
    quantitySpan,
    () => {
      quantity++;
      quantitySpan.textContent = quantity;
      // productsInCart dizisindeki quantity'yi de güncelle
      const cartItem = productsInCart.find((item) => item.id === index);
      if (cartItem) cartItem.quantity = quantity;

      updateTotal();
    },
    () => {
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        // productsInCart dizisindeki quantity'yi de güncelle
        const cartItem = productsInCart.find((item) => item.id === index);
        if (cartItem) cartItem.quantity = quantity;

        updateTotal();
      } else if (quantity === 1) {
        // quantity 1 iken tekrar azaltılırsa

        // Diziden ürünü sil
        const itemIndex = productsInCart.findIndex((item) => item.id === index);
        if (itemIndex !== -1) {
          // Ekrandan da kaldır
          const detailDiv =
            productsInCart[
              itemIndex
            ].productDetailElements.soldProductTotal.closest(".ürün-detay");
          if (detailDiv) detailDiv.remove();
          productsInCart.splice(itemIndex, 1);
        }

        button.style.display = "block";
        buttonSecond.style.display = "none";
      }
    }
  );
  // Tüm sepetin toplamını güncelleyen fonksiyon
  function updateCartTotal() {
    const totalPriceElement = document.querySelector(".total-fiyat");
    let total = productsInCart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    if (totalPriceElement) {
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
  }
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
    totalPriceElement: document.querySelector(".total-fiyat"),
  };
}

// Miktar arttırma/azaltma event listenerlarını ekleyen fonksiyon
function addQuantityListeners(
  incrementBtn,
  decrementBtn,
  quantitySpan,
  onIncrement,
  onDecrement
) {
  incrementBtn.addEventListener("click", onIncrement);
  decrementBtn.addEventListener("click", onDecrement);
}


const modalBody = document.querySelector(".modal-body");
const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
buttonConfirm.addEventListener("click", () => {

  modal.style.display = "block";
  console.log(productsInCart);



  productsInCart.forEach((item) => {
    modalBody.innerHTML += `
      <div class="modal-body-content">
        <div class="ürün-detay">
          <div class="ürün-sol">
            <img src="${item.product.image.desktop}" alt="${item.product.name}" class="modal-ürün-img"/>
            <div class="ürün-detay-info">
              <p class="satilan-Ürün-Adi textBold-4">${item.product.name}</p>
              <div class="ürün-adet-fiyat">
                <p><span class="textBold-4" style="color:var(--red);">${item.quantity}x</span></p>
                <p><span class="satilan-Ürün-Fiyat" style="color:var(--rose-500);">@ $${item.product.price.toFixed(2)}</span></p>
              </div>
            </div>
          </div>
          <div class="ürün-sağ">
            <p><span class="satilan-Ürün-Toplam text-3">$${(item.product.price * item.quantity).toFixed(2)}</span></p>
          </div>
        </div>
      </div>`;
  });

  const totalPrice = document.createElement("div");
  totalPrice.className = "order-total-container";
  totalPrice.innerHTML = ` <p>Order Total</p>
          <p class="text-2">$${productsInCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</p>`;
  modalBody.appendChild(totalPrice);
});

