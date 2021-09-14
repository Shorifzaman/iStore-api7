const loadProducts = () => {

  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {

  // console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p class="text-warning">Category:<span class="text-dark"> ${product.category}</span></p>
      <h2 class="text-warning" >Price:<span class="text-dark"> $ ${product.price}</span></h2>
      <hr>
 
        <p class="text-info font-bold">
        <i class="fas fa-star fa-sm text-primary"></i>
        <i class="fas fa-star fa-sm text-primary"></i>
        <i class="fas fa-star fa-sm text-primary"></i>
        <i class="fas fa-star fa-sm text-primary"></i>
        <i class="fas fa-star fa-sm text-primary"></i>
        <span class="fw-normal p-3 mb-2 bg-light">${product.rating.rate}</span>
        </p>
        <p class="text-info"><i class="far fa-heart p-3 mb-2 bg-light text-dark"></i>
        <span class="p-3 mb-2 bg-secondary text-white">Rating : ${product.rating.count}</span></p>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
// input
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;

};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total-cost").innerText = grandTotal.toFixed(2);
  
};


