let cart = {};

const prices = {
    "Bakso Sapi": 42500,
    "S Bakar Jumbo": 30500,
    "S Ayam Cocktail": 35500,
    "Chicken Karage": 38500,
    "Chicken Strips": 47000,
    "Chicken Nugget": 38500
};

function addToCart(productName) {
    if (cart[productName]) {
        cart[productName]++;
    } else {
        cart[productName] = 1;
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartList = document.getElementById('cartList');
    let totalItems = 0;
    let totalPrice = 0;
    cartList.innerHTML = '';

    for (let item in cart) {
        totalItems += cart[item];
        let itemPrice = prices[item] * cart[item];
        totalPrice += itemPrice;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${item} - Rp ${itemPrice.toLocaleString()}</span>
            <div>
                <button onclick="changeQuantity('${item}', -1)">-</button>
                <input type="number" value="${cart[item]}" min="1" style="width: 50px; text-align: center;" onchange="updateFromInput('${item}', this.value)">
                <button onclick="changeQuantity('${item}', 1)">+</button>
                <button onclick="removeFromCart('${item}')" style="background-color: red; color: white; border: none; cursor: pointer;">❌</button>
            </div>
        </div>`;
        cartList.appendChild(listItem);
    }

    cartCount.innerText = totalItems;
    document.getElementById('totalPrice').innerText = `Total: Rp ${totalPrice.toLocaleString()}`;
}

function changeQuantity(productName, change) {
    if (cart[productName]) {
        cart[productName] += change;
        if (cart[productName] <= 0) {
            delete cart[productName];
        }
    } else if (change > 0) {
        cart[productName] = change;
    }
    updateCartDisplay();
}

function updateFromInput(productName, value) {
    let newQty = parseInt(value);
    if (newQty > 0) {
        cart[productName] = newQty;
    } else {
        delete cart[productName];
    }
    updateCartDisplay();
}

function removeFromCart(productName) {
    delete cart[productName];
    updateCartDisplay();
}

function toggleCartWindow() {
    const cartWindow = document.getElementById('cartWindow');
    cartWindow.style.display = cartWindow.style.display === 'none' ? 'block' : 'none';
}

function sendToWhatsApp() {
    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();

    if (!name || !phone) {
        alert("Harap isi Nama dan Nomor HP sebelum memesan!");
        return;
    }

    let today = new Date();
    let formattedDate = today.toLocaleDateString('id-ID', {
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric'
    });

    let message = `🛒 Halo Celestia, saya mau beli:\n`;
    let totalHarga = 0;

    for (let item in cart) {
        let subtotal = prices[item] * cart[item];
        totalHarga += subtotal;
        message += `- ${item} x ${cart[item]} (Rp ${subtotal.toLocaleString()})\n`;
    }

    if (Object.keys(cart).length === 0) {
        alert("Keranjang belanja kosong!");
        return;
    }

    message += `\n💰 Total Harga: Rp ${totalHarga.toLocaleString()}`;
    message += `\n📅 Tanggal Pesan: ${formattedDate}`;
    message += `\n👤 Nama: ${name}\n📞 Nomor HP: ${phone}`;

    const whatsappURL = `https://wa.me/6285775042001?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

