let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    document.getElementById("cartCount").innerText =
        cart.reduce((sum, item) => sum + item.qty, 0);
}

// Open cart modal
function openCart() {
    displayCart();
    document.getElementById("cartModal").style.display = "flex";
}

// Close cart modal
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// Display cart items
function displayCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong> ($${item.price.toFixed(2)})<br>
                Quantity: 
                <button onclick="changeQty(${index}, -1)">−</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
                <br>Item Total: $${itemTotal.toFixed(2)}
                <hr>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total.toFixed(2);
}

// Change quantity
function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    displayCart();
    updateCartCount();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let summary = "Your Order:\n\n";
    cart.forEach(item => {
        summary += `${item.name} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });
    summary += `\nTotal: $${document.getElementById("cartTotal").innerText}`;

    alert(summary + "\n\n✔ Order Successful!");

    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
}

// Initialize cart count on page load
updateCartCount();
