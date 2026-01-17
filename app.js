const prouductList = document.querySelector(".product-list");

const getProduct = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

getProduct();