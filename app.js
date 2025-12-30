fetch("./data.json")
  .then(res => res.json())
  .then(products => {
    const productList = document.querySelector(".product-list");

    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML += `
        <div class="card">
          <img 
            src="${product.image.desktop}" 
            alt="${product.name}" 
            class="card-img"
          >

          <button class="buttonAdd textbold-4" data-product-id="${index}">
            <img src="./assets/images/icon-add-to-cart.svg" alt="">
            Add to Cart
          </button>

          <div class="buttonSecond textBold-4" data-product-id="${index}">
  <img class="decrement" src="./assets/images/icon-decrement-quantity.svg" alt=""> 
  <span class="buttonSecondSpan">1</span>
  <img  class="increment" src="./assets/images/icon-increment-quantity.svg" alt="">

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
        const product = products[productId];

        // Aynı card içindeki buttonSecond'u bul
        const card = button.closest(".card");
        const buttonSecond = card.querySelector(".buttonSecond");

        button.style.display = "none";
        buttonSecond.style.display = "block";

        // Elementleri bul
        const cardElement = button.closest(".card");
        const incrementBtn = cardElement.querySelector(".increment");
        const decrementBtn = cardElement.querySelector(".decrement");
        const quantitySpan = cardElement.querySelector(".buttonSecondSpan");
        const satilanProduct = document.querySelector(".satilan-product");

        satilanProduct.innerHTML = `<div class="ürün-detay">
            <p class="satilan-Ürün-Adi textBold-4"></p>
            <p>
              <span class="satilan-Ürün-Adet textBold-4"></span>
              <span class="satilan-Ürün-Fiyat"></span>
              <span class="satilan-Ürün-Toplam"></span>
            </p>
          </div>
            <img src="./assets/images/icon-remove-item.svg" alt="">`;


        let satilanÜrünAdet = document.querySelector(".satilan-Ürün-Adet");
        let satilanÜrünAdi = document.querySelector(".satilan-Ürün-Adi");
        let satilanÜrünFiyat = document.querySelector(".satilan-Ürün-Fiyat");
        let satilanÜrünToplam = document.querySelector(".satilan-Ürün-Toplam");

        let totalFiyatSon = document.querySelector(".total-fiyat");

        let quantity = 1;

        // Toplam fiyatı güncelleyen fonksiyon
        const updateTotal = () => {
          let totalPrice = product.price * quantity;
          satilanÜrünToplam.textContent = `$${totalPrice.toFixed(2)}`;
          satilanÜrünAdet.textContent = `${quantity}x`;
          totalFiyatSon.textContent = `$${totalPrice.toFixed(2)}`;
          
        };

        // İlk bilgileri set et
        satilanÜrünAdi.textContent = product.name;
        satilanÜrünFiyat.textContent = `@$${product.price.toFixed(2)}`;
        updateTotal(); // İlk toplam

        // Increment butonuna tıklandığında
        incrementBtn.addEventListener("click", () => {
          quantity++;
          quantitySpan.textContent = quantity;
          updateTotal(); // Toplamı güncelle
        });

        // Decrement butonuna tıklandığında
        decrementBtn.addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateTotal(); // Toplamı güncelle
          }
        });

        
      }
    });

  })
  .catch(err => console.error("JSON okunamadı:", err));






