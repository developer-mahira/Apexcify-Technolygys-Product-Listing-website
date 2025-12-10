 // Products Data
        const products = [
            {
                id: 1,
                name: 'SilkSculpt Serum',
                category: 'Skin Care',
                categorySlug: 'skin-care',
                price: 35.00,
                originalPrice: 70.00,
                discount: 50,
                rating: 4.9,
                image: 'assets/product1.jpeg'
            },
            {
                id: 2,
                name: 'SilkSkin Serum',
                category: 'Skin Care',
                categorySlug: 'skin-care',
                price: 48.00,
                originalPrice: 60.00,
                discount: 20,
                rating: 4.8,
                image: 'assets/product2.jpeg'
            },
            {
                id: 3,
                name: 'Argan Glow',
                category: 'Hair Care',
                categorySlug: 'hair-care',
                price: 63.00,
                originalPrice: 90.00,
                discount: 30,
                rating: 5.0,
                image: 'assets/product6.jpeg'
            },
            {
                id: 4,
                name: 'Nephrolepis Exaltata',
                category: 'Body Care',
                categorySlug: 'body-care',
                price: 45.00,
                originalPrice: 60.00,
                discount: 10,
                rating: 5.0,
                image: 'assets/product9.jpeg'
            },
            {
                id: 5,
                name: 'Smooth Foundation',
                category: 'Makeup',
                categorySlug: 'makeup',
                price: 20.00,
                originalPrice: 40.00,
                discount: 50,
                rating: 5.0,
                image: 'assets/product3.jpeg'
            },
            {
                id: 6,
                name: 'Smooth Body Cream',
                category: 'Body Care',
                categorySlug: 'body-care',
                price: 30.00,
                originalPrice: 60.00,
                discount: 50,
                rating: 5.0,
                image: 'assets/product4.jpeg'
            },
            {
                id: 7,
                name: 'Flux Intense',
                category: 'Fragrances',
                categorySlug: 'fragrances',
                price: 30.00,
                originalPrice: 60.00,
                discount: 50,
                rating: 4.8,
                image: 'product7.jpeg'
            },
            {
                id: 8,
                name: 'Velvet Rose',
                category: 'Makeup',
                categorySlug: 'makeup',
                price: 10.00,
                originalPrice: 20.00,
                discount: 50,
                rating: 4.9,
                image: 'assets/product8.jpeg'
            },
            {
                id: 9,
                name: 'Herbal Haven',
                category: 'Makeup',
                categorySlug: 'makeup',
                price: 10.00,
                originalPrice: 20.00,
                discount: 50,
                rating: 5.0,
                image: 'assets/product5.jpeg'
            },
            {
                id: 10,
                name: 'Essence Body Gel',
                category: 'Body Care',
                categorySlug: 'body-care',
                price: 30.00,
                originalPrice: 60.00,
                discount: 50,
                rating: 4.8,
                image: 'assets/product10.jpeg'
            },
            {
                id: 11,
                name: 'HydraLuxe Serum',
                category: 'Skin Care',
                categorySlug: 'skin-care',
                price: 20.00,
                originalPrice: 40.00,
                discount: 50,
                rating: 4.9,
                image: 'assets/product9.jpeg'
            },
            {
                id: 12,
                name: 'OceanMist Moisturizer',
                category: 'Skin Care',
                categorySlug: 'skin-care',
                price: 20.00,
                originalPrice: 40.00,
                discount: 50,
                rating: 4.8,
                image: 'assets/product4.jpeg'
            }
        ];

        // Cart Management
        let cart = [];
        let wishlist = [];

        // Initialize
        displayProducts(products);

        // Display Products
        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            productsToShow.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="discount-badge">${product.discount}% off</div>
                        <div class="wishlist-btn" onclick="toggleWishlist(event, ${product.id})">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <div class="product-rating">
                            ${generateStars(product.rating)}
                            <span class="rating-value">${product.rating}</span>
                        </div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">
                            <span class="current-price">${product.price.toFixed(2)}</span>
                            <span class="original-price">${product.originalPrice.toFixed(2)}</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-bag"></i>
                            Add to Cart
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Generate Star Rating
        function generateStars(rating) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<i class="fas fa-star${i <= rating ? '' : ' empty'}"></i>`;
            }
            return stars;
        }

        // Add to Cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }

            updateCart();
            showNotification();
        }

        // Update Cart Display
        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartFooter = document.getElementById('cartFooter');
            const cartCount = document.getElementById('cartCount');

            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');

                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                document.getElementById('cartTotal').textContent = `${total.toFixed(2)}`;
                cartFooter.style.display = 'block';
            }
        }

        // Update Quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCart();
                }
            }
        }

        // Remove from Cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Toggle Cart
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        // Toggle Wishlist
        function toggleWishlist(event, productId) {
            event.stopPropagation();
            const btn = event.currentTarget;
            const icon = btn.querySelector('i');

            if (wishlist.includes(productId)) {
                wishlist = wishlist.filter(id => id !== productId);
                icon.className = 'far fa-heart';
                btn.classList.remove('active');
            } else {
                wishlist.push(productId);
                icon.className = 'fas fa-heart';
                btn.classList.add('active');
            }
        }

        // Show Notification
        function showNotification() {
            const notification = document.getElementById('notification');
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Filter by Category
        function filterByCategory(category) {
            const filtered = category === 'all' ? products : products.filter(p => p.categorySlug === category);
            displayProducts(filtered);
        }

        // Filter by Skin Type
        function filterBySkinType(skinType) {
            displayProducts(products);
        }

        // Filter by Rating
        function filterByRating(rating) {
            const filtered = products.filter(p => p.rating >= rating);
            displayProducts(filtered);
        }

        // Filter by Promotion
        function filterByPromotion(promotion) {
            displayProducts(products);
        }

        // Price Range
        document.getElementById('priceRange').addEventListener('input', function(e) {
            document.getElementById('maxPrice').textContent = `${e.target.value}.00`;
        });