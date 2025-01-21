document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 23.44 },
    { id: 2, name: "Product 2", price: 53.44 },
    { id: 3, name: "Product 3", price: 89.567 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotalMsg = document.getElementById("cart-total");
  const totalPriceD = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      product.innerHTML += `<button remove-item="${product.id}">Remove Item</button>`;
      if (product) {
        addToCart(product);
        saveCart();
      }
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotalMsg.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-item" data-id="${item.id}">Remove item</button>
        `;

        cartItems.appendChild(cartItem);
        totalPriceD.textContent = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
      totalPriceD.textContent = `$0.00`;
      cartTotalMsg.classList.add("hidden");
    }
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const productToRemove = cart.find((item) => item.id === productId);
      if (productToRemove) {
        const productIndex = cart.indexOf(productToRemove);
        cart.splice(productIndex, 1);
        saveCart();
        renderCart();
      }
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("Checkout Successfully");
    renderCart();
  });

  renderCart();
});
