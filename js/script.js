let cart = {};

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
    cartList.innerHTML = '';

    for (let item in cart) {
        totalItems += cart[item];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>${item} x ${cart[item]}</span>
                <div>
                    <button onclick="changeQuantity('${item}', -1)">-</button>
                    <button onclick="changeQuantity('${item}', 1)">+</button>
                </div>
            </div>
        `;
        cartList.appendChild(listItem);
    }

    cartCount.innerText = totalItems;
}

function changeQuantity(productName, change) {
    if (cart[productName]) {
        cart[productName] += change;
        if (cart[productName] <= 0) {
            delete cart[productName];
        }
        updateCartDisplay();
    }
}

function toggleCartWindow() {
    const cartWindow = document.getElementById('cartWindow');
    cartWindow.style.display = cartWindow.style.display === 'none' ? 'block' : 'none';
}

function sendToWhatsApp() {
    const name = document.getElementById('cartName').value.trim();
    const phone = document.getElementById('cartPhone').value.trim();

    if (!name || !phone) {
        alert("Harap isi nama dan nomor HP!");
        return;
    }

    // Encode untuk menghindari karakter aneh di WhatsApp
    let message = `Halo, saya ingin memesan:\n\n`;
    for (let item in cart) {
        message += `${item} x ${cart[item]}\n`;
    }
    message += `\n📝 Nama: ${name}\n📞 No HP: ${phone}`;

    const whatsappNumber = "6285775042001";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Delay sebelum membuka WhatsApp
    setTimeout(() => {
        window.location.href = whatsappURL;
    }, 500);
}
