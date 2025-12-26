fetch("./data.json")
  .then(res => res.json())
  .then(products => {
    const productList = document.querySelector(".product-list");

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <div class="card">
          <img 
            src="${product.image.desktop}" 
            alt="${product.name}" 
            class="card-img"
          >

          <button class="buttonAdd textbold-4">
            <img src="./assets/images/icon-add-to-cart.svg" alt="">
            Add to Cart
          </button>
        </div>

        <div class="card-defination">
          <p class="product-type text-4">${product.category}</p>
          <h2 class="product-name text-3">${product.name}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      `;

      productList.appendChild(card);
    });
  })
  .catch(err => console.error("JSON okunamadı:", err));
