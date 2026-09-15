/**
 * Dairy Pure & Organic (DPO) - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Constants & Config ---
  const WHATSAPP_NUMBER = '8801775002340';
  
  // Default fallback product catalog
  let PRODUCTS = {
    '119': {
      id: '119',
      name: 'খাঁটি কাঁচা তরল দুধ (১ লিটার)',
      price: 100,
      memberPrice: 95,
      unit: '১ লিটার বোতল',
      image: 'assets/images/milk-1l.jpg',
      category: 'তরল দুধ',
      description: 'খামারের প্রতিদিনের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ। ১০০% প্রাকৃতিক ও ভেজালমুক্ত।'
    },
    '122': {
      id: '122',
      name: 'খাঁটি কাঁচা তরল দুধ – RAW Milk (৫০০ মি.লি. প্যাকেট)',
      price: 50,
      memberPrice: 48,
      unit: '৫০০ মি.লি. প্যাকেট',
      image: 'assets/images/milk-500ml.jpg',
      category: 'তরল দুধ',
      description: 'পূর্ণ ননীযুক্ত গাভীর খাঁটি কাঁচা তরল দুধ। ১০০% প্রাকৃতিক ও বিশুদ্ধ পাউচ প্যাকেট।'
    },
    '120': {
      id: '120',
      name: 'খাঁটি কাঁচা তরল দুধ (৫ লিটার ফ্যামিলি প্যাক)',
      price: 475,
      oldPrice: 500,
      memberPrice: 450,
      unit: '৫ লিটার জার',
      image: 'assets/images/milk-5l.jpg',
      category: 'ফ্যামিলি প্যাক',
      description: 'পরিবারের জন্য সবচেয়ে সাশ্রয়ী ফ্যামিলি প্যাক। ৫ লিটার তাজা তরল দুধ। মেম্বারদের জন্য বিশেষ ছাড়।'
    },
    '121': {
      id: '121',
      name: 'DPO গোল্ড মেম্বারশিপ কার্ড (লাইফটাইম)',
      price: 50,
      memberPrice: 50,
      unit: 'এককালীন ফি',
      image: 'assets/images/gold-card.jpg',
      category: 'লাইফটাইম মেম্বারশিপ',
      description: 'আজীবন মেম্বারশিপ সুবিধা। প্রতি লিটার দুধে ৫ টাকা নিশ্চিত আজীবন ছাড়!'
    }
  };

  // --- Dynamic Product Loader from Backend API ---
  async function loadProductsFromAPI() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const newCatalog = {};
          json.data.forEach(p => {
            newCatalog[p.id.toString()] = p;
          });
          PRODUCTS = newCatalog;
          renderDynamicShopGrid(json.data);
        }
      }
    } catch (e) {
      console.log('API not reachable, using default product catalog.');
    }
  }

  // --- Dynamic Shop Page Renderer ---
  function renderDynamicShopGrid(productList) {
    const grid = document.getElementById('dynamic-products-grid');
    const noticeCount = document.getElementById('shop-product-count');
    if (!grid) return;

    if (noticeCount) {
      noticeCount.innerHTML = `<i class="fa-solid fa-bottle-droplet" style="color: var(--dpo-green); margin-right: 8px;"></i> মোট ${productList.length}টি অফিসিয়াল প্যাকেজ ও প্রোডাক্ট`;
    }

    grid.innerHTML = productList.map(prod => {
      const isGold = prod.category === 'লাইফটাইম মেম্বারশিপ' || prod.name.includes('মেম্বারশিপ');
      const cardBorder = isGold ? 'style="border: 2px solid #f59e0b; background: #fffcf5;"' : '';
      const badgeStyle = isGold ? 'style="background: linear-gradient(135deg, #d97706, #b45309);"' : '';
      const priceColor = isGold ? 'style="color: #d97706;"' : '';
      const btnStyle = isGold ? 'style="font-size: 13px; padding: 10px 12px; background: linear-gradient(135deg, #d97706, #b45309); border-color: #b45309;"' : 'style="font-size: 13px; padding: 10px 12px;"';

      const imgSrc = prod.image || 'assets/images/milk-1l.jpg';
      const oldPriceHtml = prod.oldPrice ? `<span class="product-old-price">৳ ${prod.oldPrice}</span>` : '';
      const memberSpecialHtml = prod.memberPrice && prod.memberPrice < prod.price 
        ? `<div class="special-badge-box"><i class="fa-solid fa-tag"></i><span>মেম্বারশিপ স্পেশাল: ৳ ${prod.memberPrice} (${prod.price - prod.memberPrice} টাকা ছাড়)</span></div>`
        : '';

      const waText = encodeURIComponent(`হ্যালো Dairy Pure & Organic, আমি ${prod.name} (৳${prod.price}) অর্ডার করতে চাই।`);

      return `
        <div class="product-card" ${cardBorder}>
            <div class="product-image-wrap ${isGold ? 'gold-theme-wrap' : ''}" data-product-id="${prod.id}" ${isGold ? 'style="background: #1e1b18;"' : ''} title="সম্পূর্ণ ছবি দেখতে ক্লিক করুন">
                <span class="product-badge" ${badgeStyle}>${prod.featured ? 'স্পেশাল প্যাকেজ' : (prod.category || 'ফার্ম ফ্রেশ')}</span>
                <button class="product-quickview-btn" data-quickview="${prod.id}" title="সম্পূর্ণ ছবি ও বিস্তারিত দেখুন" aria-label="ফুল ভিউ দেখুন">
                    <i class="fa-solid fa-expand"></i> <span>ফুল ভিউ</span>
                </button>
                <img src="${imgSrc}" alt="${prod.name}" loading="lazy">
            </div>
            <div class="product-body">
                <span class="product-cat" ${isGold ? 'style="color: #d97706;"' : ''}>${prod.category || 'সাধারণ'}</span>
                <h3 class="product-name" ${isGold ? 'style="color: #92400e;"' : ''}>${prod.name}</h3>
                <div class="product-meta">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${prod.description || '১০০% প্রাকৃতিক, খাঁটি ও ফ্রেশ কোয়ালিটি নিশ্চয়তা।'}</span>
                </div>
                ${memberSpecialHtml}
                <div class="product-pricing">
                    <span class="product-price" ${priceColor}>৳ ${prod.price}</span>
                    ${oldPriceHtml}
                    <span class="product-unit">/ ${prod.unit || '১ পিস'}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" data-add-to-cart="${prod.id}" ${btnStyle}>
                        <i class="fa-solid fa-cart-shopping"></i> কার্টে যোগ করুন
                    </button>
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waText}" class="btn btn-whatsapp" target="_blank" style="padding: 10px 12px;">
                        <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ
                    </a>
                </div>
            </div>
        </div>
      `;
    }).join('');
  }

  // --- Cart State Management (LocalStorage) ---
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem('dpo_cart');
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart:', e);
      cart = [];
    }
    updateCartUI();
  }

  function saveCart() {
    try {
      localStorage.setItem('dpo_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
    updateCartUI();
  }

  function addToCart(productId, qty = 1) {
    const prod = PRODUCTS[productId.toString()];
    if (!prod) {
      console.warn('Product not found in catalog:', productId);
      return;
    }

    const existingIndex = cart.findIndex(item => item.id.toString() === productId.toString());
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: prod.id.toString(),
        name: prod.name,
        price: prod.price,
        unit: prod.unit || '১ পিস',
        image: prod.image || 'assets/images/milk-1l.jpg',
        quantity: qty
      });
    }

    saveCart();
    showToast(`"${prod.name}" কার্টে যোগ করা হয়েছে!`);
    openCartDrawer();
  }

  function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id.toString() === productId.toString());
    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      saveCart();
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id.toString() !== productId.toString());
    saveCart();
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে');
  }

  function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // --- Cart UI Rendering ---
  function updateCartUI() {
    // Update Badge
    const badges = document.querySelectorAll('.cart-badge');
    const totalCount = getCartCount();
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount >= 0 ? 'flex' : 'none';
    });

    // Update Drawer Body
    const drawerBody = document.getElementById('cart-drawer-items');
    const drawerSubtotal = document.getElementById('cart-drawer-subtotal');
    const drawerFooter = document.getElementById('cart-drawer-footer');

    if (drawerBody) {
      if (cart.length === 0) {
        drawerBody.innerHTML = `
          <div class="cart-empty-state">
            <i class="fa-solid fa-cart-shopping"></i>
            <p>আপনার কার্ট বর্তমানে খালি আছে।</p>
            <a href="shop.html" class="btn btn-primary" style="margin-top: 15px; font-size: 13.5px; padding: 10px 18px;">শপ দেখুন</a>
          </div>
        `;
        if (drawerFooter) drawerFooter.style.display = 'none';
      } else {
        if (drawerFooter) drawerFooter.style.display = 'block';
        drawerBody.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price">৳ ${item.price} <small style="font-size: 12px; color: var(--text-muted); font-weight: normal;">/ ${item.unit}</small></div>
              <div class="cart-stepper">
                <button class="stepper-btn" onclick="window.dpoUpdateQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
                <span class="stepper-val">${item.quantity}</span>
                <button class="stepper-btn" onclick="window.dpoUpdateQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="window.dpoRemoveItem('${item.id}')" title="মুছে ফেলুন" aria-label="Remove item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `).join('');

        if (drawerSubtotal) {
          drawerSubtotal.textContent = `৳ ${getCartTotal()}`;
        }
      }
    }
  }

  // Window bridge for inline onclicks
  window.dpoAddToCart = addToCart;
  window.dpoUpdateQty = updateQuantity;
  window.dpoRemoveItem = removeFromCart;

  // --- Cart Drawer Controls ---
  const cartButtons = document.querySelectorAll('.cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartCloseBtn = document.getElementById('cart-close-btn');

  function openCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('active');
      cartBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('active');
      cartBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  cartButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // --- Add to Cart Event Delegation ---
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-add-to-cart]');
    if (target) {
      e.preventDefault();
      const productId = target.getAttribute('data-add-to-cart');
      const qty = parseInt(target.getAttribute('data-qty') || '1', 10);
      addToCart(productId, qty);
    }
  });

  // --- WhatsApp Ordering Dynamic Message ---
  window.generateWhatsAppOrder = function (singleProductId = null) {
    let text = 'আসসালামু আলাইকুম Dairy Pure & Organic (DPO),\n\n';

    if (singleProductId && PRODUCTS[singleProductId.toString()]) {
      const p = PRODUCTS[singleProductId.toString()];
      text += `আমি নিম্নলিখিত পণ্যটি সরাসরি অর্ডার করতে চাই:\n`;
      text += `📌 ${p.name}\n`;
      text += `💰 মূল্য: ৳${p.price} (${p.unit})\n`;
    } else if (cart.length > 0) {
      text += `আমি নিম্নলিখিত পণ্যগুলো অর্ডার করতে চাই:\n\n`;
      cart.forEach((item, index) => {
        text += `${index + 1}. ${item.name}\n   পরিমাণ: ${item.quantity} | মূল্য: ৳${item.price * item.quantity}\n`;
      });
      text += `\n💵 সর্বমোট বিল: ৳${getCartTotal()}\n`;
    } else {
      text += `আমি আপনাদের খাঁটি তরল দুধ ও মেম্বারশিপ কার্ড অর্ডার করতে চাই। অনুগ্রহ করে ডেলিভারির নিয়ম জানাবেন।\n`;
    }

    text += `\nআমার ডেলিভারি ঠিকানা ও যোগাযোগের তথ্য নিম্নে প্রদান করছি:\n`;
    text += `নাম:\nমোবাইল:\nঠিকানা:`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const whatsappCheckoutBtn = document.getElementById('cart-whatsapp-order');
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.generateWhatsAppOrder();
    });
  }

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('site-navigation');

  if (mobileToggle && mainNav) {
    let navBackdrop = document.getElementById('nav-backdrop');
    if (!navBackdrop) {
      navBackdrop = document.createElement('div');
      navBackdrop.id = 'nav-backdrop';
      navBackdrop.className = 'nav-backdrop';
      document.body.appendChild(navBackdrop);
    }

    function openNav() {
      mainNav.classList.add('is-active');
      if (navBackdrop) navBackdrop.classList.add('is-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-xmark';
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      mainNav.classList.remove('is-active');
      if (navBackdrop) navBackdrop.classList.remove('is-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mainNav.classList.contains('is-active')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close mobile nav when clicking any link inside
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
        closeNav();
      }
    });
  }

  // --- Toast Notification Helper ---
  function showToast(message) {
    let toast = document.getElementById('dpo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dpo-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ade80;"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Form Handlers ---
  const forms = document.querySelectorAll('form.dpo-contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const address = formData.get('address') || '';
      const message = formData.get('message') || '';

      const waMsg = `*Dairy Pure & Organic আবেদন/অর্ডার*\n\n👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 ঠিকানা: ${address}\n📝 নোট: ${message}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
      
      showToast('আবেদনটি সফলভাবে প্রস্তুত করা হয়েছে! হোয়াটসঅ্যাপে পাঠানো হচ্ছে...');
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1000);
      form.reset();
    });
  });

  // --- Modern Product Full Image Lightbox / Modal Engine ---
  let activeModalProductId = null;

  function ensureProductModalDOM() {
    let backdrop = document.getElementById('dpo-product-modal-backdrop');
    if (backdrop) return backdrop;

    backdrop = document.createElement('div');
    backdrop.id = 'dpo-product-modal-backdrop';
    backdrop.className = 'dpo-product-modal-backdrop';
    backdrop.innerHTML = `
      <div class="dpo-product-modal" id="dpo-product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
        <button class="dpo-modal-close-btn" id="dpo-modal-close-btn" aria-label="Close modal">
          <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="dpo-modal-layout">
          <!-- Visual Image Column -->
          <div class="dpo-modal-visual" id="dpo-modal-visual">
            <span class="dpo-modal-badge" id="modal-product-badge">ফার্ম ফ্রেশ</span>
            <button class="dpo-zoom-toggle-btn" id="dpo-zoom-toggle-btn" title="জুম ইন / আউট" aria-label="Toggle zoom">
              <i class="fa-solid fa-magnifying-glass-plus"></i> <span id="dpo-zoom-label">জুম করুন</span>
            </button>
            <div class="dpo-modal-img-container" id="dpo-modal-img-container" title="জুম করতে ক্লিক করুন">
              <img src="" alt="" id="modal-product-image" class="dpo-modal-img">
            </div>
            
            <div class="dpo-modal-nav-arrows">
              <button class="dpo-modal-nav-btn" id="modal-nav-prev" title="পূর্ববর্তী প্যাকেজ" aria-label="Previous product">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <span class="dpo-modal-counter" id="modal-product-counter">১ / ৪</span>
              <button class="dpo-modal-nav-btn" id="modal-nav-next" title="পরবর্তী প্যাকেজ" aria-label="Next product">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <!-- Details Column -->
          <div class="dpo-modal-details">
            <div class="dpo-modal-cat" id="modal-product-cat">তরল দুধ</div>
            <h2 class="dpo-modal-title" id="modal-product-title">খাঁটি কাঁচা তরল দুধ (১ লিটার)</h2>
            
            <div class="dpo-modal-rating-row">
              <div class="dpo-stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <span class="dpo-rating-score">৫.০ (১০০% পরীক্ষিত খাঁটি দুধ)</span>
            </div>
            
            <div class="dpo-modal-purity-badges">
              <span class="purity-pill"><i class="fa-solid fa-shield-halved"></i> ১০০% ভেজালমুক্ত</span>
              <span class="purity-pill"><i class="fa-solid fa-leaf"></i> সম্পূর্ণ প্রাকৃতিক</span>
              <span class="purity-pill"><i class="fa-solid fa-truck-fast"></i> ২৪/৭ হোম ডেলিভারি</span>
            </div>
            
            <p class="dpo-modal-desc" id="modal-product-desc">প্রতিদিন সকাল ও বিকালের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ। ১০০% প্রাকৃতিক ও ভেজালমুক্ত।</p>
            
            <div class="dpo-modal-special-box" id="modal-special-box">
              <i class="fa-solid fa-tag"></i>
              <span id="modal-special-text">মেম্বারশিপ স্পেশাল: ৳ ৯৫ (৫ টাকা ছাড়)</span>
            </div>
            
            <div class="dpo-modal-pricing">
              <div class="dpo-price-main">
                <span class="dpo-price-current" id="modal-product-price">৳ 100</span>
                <span class="dpo-price-old" id="modal-product-oldprice"></span>
                <span class="dpo-price-unit" id="modal-product-unit">/ ১ লিটার বোতল</span>
              </div>
              <span class="dpo-stock-badge in-stock"><i class="fa-solid fa-circle-check"></i> প্রস্তুত আছে</span>
            </div>
            
            <div class="dpo-modal-purchase-row">
              <div class="dpo-modal-qty">
                <button class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">-</button>
                <input type="number" id="modal-qty-input" value="1" min="1" max="99" readonly>
                <button class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
              </div>
              
              <button class="btn btn-primary dpo-modal-add-cart-btn" id="modal-add-to-cart-btn">
                <i class="fa-solid fa-cart-shopping"></i> কার্টে যোগ করুন
              </button>
            </div>
            
            <div class="dpo-modal-wa-row">
              <a href="#" class="btn btn-whatsapp dpo-modal-wa-btn" id="modal-whatsapp-btn" target="_blank">
                <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন
              </a>
            </div>
            
            <div class="dpo-modal-footer-note">
              <i class="fa-solid fa-location-dot"></i> মিরপুর ১২ ও সমগ্র ঢাকায় সরাসরি নিজস্ব খামার থেকে হোম ডেলিভারি!
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    bindProductModalEvents(backdrop);
    return backdrop;
  }

  function bindProductModalEvents(backdrop) {
    const closeBtn = backdrop.querySelector('#dpo-modal-close-btn');
    const zoomBtn = backdrop.querySelector('#dpo-zoom-toggle-btn');
    const imgContainer = backdrop.querySelector('#dpo-modal-img-container');
    const prevBtn = backdrop.querySelector('#modal-nav-prev');
    const nextBtn = backdrop.querySelector('#modal-nav-next');
    const qtyMinus = backdrop.querySelector('#modal-qty-minus');
    const qtyPlus = backdrop.querySelector('#modal-qty-plus');
    const qtyInput = backdrop.querySelector('#modal-qty-input');
    const addCartBtn = backdrop.querySelector('#modal-add-to-cart-btn');

    closeBtn.addEventListener('click', closeProductModal);
    
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        closeProductModal();
      }
    });

    function toggleZoom() {
      const isZoomed = imgContainer.classList.toggle('zoomed');
      const zoomLabel = backdrop.querySelector('#dpo-zoom-label');
      const zoomIcon = zoomBtn.querySelector('i');
      if (isZoomed) {
        zoomLabel.textContent = 'রিসেট করুন';
        zoomIcon.className = 'fa-solid fa-magnifying-glass-minus';
      } else {
        zoomLabel.textContent = 'জুম করুন';
        zoomIcon.className = 'fa-solid fa-magnifying-glass-plus';
      }
    }

    zoomBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleZoom();
    });

    imgContainer.addEventListener('click', toggleZoom);

    prevBtn.addEventListener('click', function () {
      navigateModalProducts(-1);
    });

    nextBtn.addEventListener('click', function () {
      navigateModalProducts(1);
    });

    qtyMinus.addEventListener('click', function () {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', function () {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val < 99) qtyInput.value = val + 1;
    });

    addCartBtn.addEventListener('click', function () {
      if (activeModalProductId) {
        const qty = parseInt(qtyInput.value, 10) || 1;
        addToCart(activeModalProductId, qty);
        closeProductModal();
      }
    });
  }

  function getProductKeys() {
    return Object.keys(PRODUCTS);
  }

  function openProductModal(productId) {
    const prod = PRODUCTS[productId ? productId.toString() : ''];
    if (!prod) return;

    activeModalProductId = prod.id.toString();
    const backdrop = ensureProductModalDOM();

    // Populate Visuals
    const visualCol = backdrop.querySelector('#dpo-modal-visual');
    const imgElem = backdrop.querySelector('#modal-product-image');
    const badgeElem = backdrop.querySelector('#modal-product-badge');
    const counterElem = backdrop.querySelector('#modal-product-counter');
    const imgContainer = backdrop.querySelector('#dpo-modal-img-container');
    const zoomLabel = backdrop.querySelector('#dpo-zoom-label');
    const zoomIcon = backdrop.querySelector('#dpo-zoom-toggle-btn i');

    const isGold = prod.category === 'লাইফটাইম মেম্বারশিপ' || prod.name.includes('মেম্বারশিপ');
    if (isGold) {
      visualCol.classList.add('gold-bg');
    } else {
      visualCol.classList.remove('gold-bg');
    }

    imgElem.src = prod.image || 'assets/images/milk-1l.jpg';
    imgElem.alt = prod.name;
    badgeElem.textContent = prod.featured ? 'স্পেশাল প্যাকেজ' : (prod.category || 'ফার্ম ফ্রেশ');
    
    // Reset Zoom
    imgContainer.classList.remove('zoomed');
    if (zoomLabel) zoomLabel.textContent = 'জুম করুন';
    if (zoomIcon) zoomIcon.className = 'fa-solid fa-magnifying-glass-plus';

    // Calculate product index for counter
    const keys = getProductKeys();
    const curIndex = keys.indexOf(activeModalProductId);
    if (counterElem && curIndex !== -1) {
      const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
      const curBn = (curIndex + 1).toString().split('').map(d => bnDigits[d] || d).join('');
      const totBn = keys.length.toString().split('').map(d => bnDigits[d] || d).join('');
      counterElem.textContent = `${curBn} / ${totBn}`;
    }

    // Populate Details
    backdrop.querySelector('#modal-product-cat').textContent = prod.category || 'অফিসিয়াল প্যাকেজ';
    backdrop.querySelector('#modal-product-title').textContent = prod.name;
    backdrop.querySelector('#modal-product-desc').textContent = prod.description || '১০০% প্রাকৃতিক, খাঁটি ও ফ্রেশ কোয়ালিটি নিশ্চয়তা।';
    backdrop.querySelector('#modal-product-price').textContent = `৳ ${prod.price}`;
    backdrop.querySelector('#modal-product-unit').textContent = `/ ${prod.unit || '১ পিস'}`;

    const oldPriceElem = backdrop.querySelector('#modal-product-oldprice');
    if (prod.oldPrice) {
      oldPriceElem.textContent = `৳ ${prod.oldPrice}`;
      oldPriceElem.style.display = 'inline';
    } else {
      oldPriceElem.style.display = 'none';
    }

    const specialBox = backdrop.querySelector('#modal-special-box');
    const specialText = backdrop.querySelector('#modal-special-text');
    if (prod.memberPrice && prod.memberPrice < prod.price) {
      specialText.textContent = `মেম্বারশিপ স্পেশাল: ৳ ${prod.memberPrice} (${prod.price - prod.memberPrice} টাকা ছাড়)`;
      specialBox.style.display = 'flex';
    } else if (isGold) {
      specialText.textContent = 'আজীবন প্রতিটি লিটারে ৫ টাকা নিশ্চিত ছাড়!';
      specialBox.style.display = 'flex';
    } else {
      specialBox.style.display = 'none';
    }

    // Reset Quantity
    const qtyInput = backdrop.querySelector('#modal-qty-input');
    if (qtyInput) qtyInput.value = 1;

    // WhatsApp Order Link
    const waBtn = backdrop.querySelector('#modal-whatsapp-btn');
    const waText = encodeURIComponent(`আসসালামু আলাইকুম Dairy Pure & Organic,\nআমি "${prod.name}" (৳${prod.price} / ${prod.unit || '১ পিস'}) অর্ডার করতে চাই।`);
    waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

    // Open Modal
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    const backdrop = document.getElementById('dpo-product-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      const cartDrawer = document.getElementById('cart-drawer');
      const isCartOpen = cartDrawer && cartDrawer.classList.contains('active');
      if (!isCartOpen) {
        document.body.style.overflow = '';
      }
    }
  }

  function navigateModalProducts(direction) {
    const keys = getProductKeys();
    if (keys.length <= 1) return;
    let index = keys.indexOf(activeModalProductId);
    if (index === -1) index = 0;
    let nextIndex = index + direction;
    if (nextIndex < 0) nextIndex = keys.length - 1;
    if (nextIndex >= keys.length) nextIndex = 0;
    openProductModal(keys[nextIndex]);
  }

  // Global Click listener for Opening Product Image Modal
  document.addEventListener('click', function (e) {
    // If clicked on quickview button
    const quickviewTrigger = e.target.closest('[data-quickview]');
    if (quickviewTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const pId = quickviewTrigger.getAttribute('data-quickview');
      openProductModal(pId);
      return;
    }

    // If clicked on image wrap (avoid triggering if clicked on add-to-cart or whatsapp button)
    const imgWrap = e.target.closest('.product-image-wrap');
    if (imgWrap) {
      const pId = imgWrap.getAttribute('data-product-id');
      if (pId) {
        e.preventDefault();
        openProductModal(pId);
        return;
      }
      // Fallback: check product-card
      const card = imgWrap.closest('.product-card');
      if (card) {
        const addBtn = card.querySelector('[data-add-to-cart]');
        if (addBtn) {
          const fallbackId = addBtn.getAttribute('data-add-to-cart');
          if (fallbackId) {
            e.preventDefault();
            openProductModal(fallbackId);
          }
        }
      }
    }
  });

  // Global Keyboard Shortcuts for Product Modal
  document.addEventListener('keydown', function (e) {
    const backdrop = document.getElementById('dpo-product-modal-backdrop');
    if (backdrop && backdrop.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeProductModal();
      } else if (e.key === 'ArrowLeft') {
        navigateModalProducts(-1);
      } else if (e.key === 'ArrowRight') {
        navigateModalProducts(1);
      }
    }
  });

  // Expose global methods
  window.dpoOpenProductModal = openProductModal;
  window.dpoCloseProductModal = closeProductModal;

  // --- Dark & Light Mode Theme Toggle Engine ---
  function initThemeToggle() {
    const savedTheme = localStorage.getItem('dpo_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    applyTheme(isDark);

    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#theme-toggle-btn, .theme-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        const currentlyDark = document.body.classList.contains('dark-mode');
        const nextTheme = !currentlyDark;
        applyTheme(nextTheme);
        localStorage.setItem('dpo_theme', nextTheme ? 'dark' : 'light');
        showToast(nextTheme ? '🌙 ডার্ক মোড চালু করা হয়েছে' : '☀️ লাইট মোড চালু করা হয়েছে');
      }
    });
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const toggleBtns = document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun" style="color: #facc15;"></i>' 
        : '<i class="fa-solid fa-moon" style="color: #0277bd;"></i>';
      btn.setAttribute('title', isDark ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন');
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  // Initialize
  initThemeToggle();
  loadCart();
  loadProductsFromAPI();
});

