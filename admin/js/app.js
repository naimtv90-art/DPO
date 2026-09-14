/**
 * Dairy Pure & Organic (DPO) - AngularJS Admin CMS App
 */

var app = angular.module('dpoAdminApp', []);

// File model directive for file input binding
app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
          if (scope.onFileSelect) {
            scope.onFileSelect(element[0].files[0]);
          }
        });
      });
    }
  };
}]);

app.controller('ProductController', ['$scope', '$http', function ($scope, $http) {
  // State variables
  $scope.products = [];
  $scope.loading = false;
  $scope.searchQuery = '';
  $scope.selectedCategory = 'all';
  $scope.categories = ['তরল দুধ', 'ফ্যামিলি প্যাক', 'লাইফটাইম মেম্বারশিপ', 'ঘী ও মাখন', 'মিষ্টি ও ছানা', 'অন্যান্য'];
  
  // Stats
  $scope.stats = {
    total: 0,
    inStock: 0,
    outOfStock: 0,
    categoriesCount: 0
  };

  // Modals state
  $scope.showModal = false;
  $scope.isEditing = false;
  $scope.showDeleteModal = false;
  $scope.productToDelete = null;

  // Form Model
  $scope.currentProduct = {};
  $scope.imagePreview = '';
  $scope.uploadFile = null;

  // Toast notifications
  $scope.toasts = [];

  $scope.showToast = function (message, type) {
    var toast = {
      id: Date.now(),
      message: message,
      type: type || 'success'
    };
    $scope.toasts.push(toast);
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.toasts = $scope.toasts.filter(function (t) { return t.id !== toast.id; });
      });
    }, 4000);
  };

  $scope.DEFAULT_PRODUCTS = [
    {
      id: "119",
      name: "খাঁটি কাঁচা তরল দুধ (১ লিটার)",
      price: 100,
      oldPrice: null,
      memberPrice: 95,
      unit: "১ লিটার বোতল",
      image: "assets/images/milk-1l.jpg",
      category: "তরল দুধ",
      description: "ফার্মের তাজা, প্রিমিয়াম কোয়ালিটি কাঁচা দুধ। কোনো ভেজাল বা কৃত্রিম উপাদান ছাড়া সরাসরি গ্রাহকের কাছে পৌঁছানো হয়।",
      inStock: true,
      featured: true
    },
    {
      id: "122",
      name: "খাঁটি কাঁচা তরল দুধ – RAW Milk (৫০০ মি.লি. প্যাকেট)",
      price: 50,
      oldPrice: null,
      memberPrice: 48,
      unit: "৫০০ মি.লি. প্যাকেট",
      image: "assets/images/milk-500ml.jpg",
      category: "তরল দুধ",
      description: "পূর্ণ ননীযুক্ত গাভীর খাঁটি কাঁচা তরল দুধ। ১০০% প্রাকৃতিক ও বিশুদ্ধ পাউচ প্যাকেট। ডিপ ফ্রিজে (৮° সেলসিয়াসের নিচে) সংরক্ষণযোগ্য।",
      inStock: true,
      featured: true
    },
    {
      id: "120",
      name: "খাঁটি কাঁচা তরল দুধ (৫ লিটার ফ্যামিলি প্যাক)",
      price: 475,
      oldPrice: 500,
      memberPrice: 450,
      unit: "৫ লিটার জার",
      image: "assets/images/milk-5l.jpg",
      category: "ফ্যামিলি প্যাক",
      description: "পরিবারের জন্য সাশ্রয়ী ৫ লিটার প্যাক। বিশেষ ছাড়সহ তাজা খামারের দুধ।",
      inStock: true,
      featured: true
    },
    {
      id: "121",
      name: "DPO গোল্ড মেম্বারশিপ কার্ড (লাইফটাইম)",
      price: 50,
      oldPrice: null,
      memberPrice: 50,
      unit: "এককালীন ফি",
      image: "assets/images/gold-card.jpg",
      category: "লাইফটাইম মেম্বারশিপ",
      description: "প্রতি লিটার দুধে ৫ টাকা আজীবন ছাড়, ফ্রি ফিজিক্যাল মেম্বারশিপ কার্ড এবং প্রায়োরিটি হোম ডেলিভারি সুবিধা।",
      inStock: true,
      featured: true
    }
  ];

  // Helper for safe image path
  $scope.getImageUrl = function (imagePath) {
    if (!imagePath) return '/assets/images/milk-1l.jpg';
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return '/' + imagePath;
  };

  // 1. Fetch Products
  $scope.loadProducts = function () {
    $scope.loading = true;
    $http.get('/api/products')
      .then(function (response) {
        if (response.data && response.data.success && response.data.data && response.data.data.length > 0) {
          $scope.products = response.data.data;
        } else {
          var saved = localStorage.getItem('dpo_admin_products');
          $scope.products = saved ? JSON.parse(saved) : $scope.DEFAULT_PRODUCTS;
        }
        $scope.calculateStats();
      })
      .catch(function (error) {
        console.warn('API unavailable, loading local products:', error);
        var saved = localStorage.getItem('dpo_admin_products');
        $scope.products = saved ? JSON.parse(saved) : $scope.DEFAULT_PRODUCTS;
        $scope.calculateStats();
      })
      .finally(function () {
        $scope.loading = false;
      });
  };

  // 2. Calculate Dashboard Stats
  $scope.calculateStats = function () {
    var total = $scope.products.length;
    var inStock = 0;
    var cats = {};

    $scope.products.forEach(function (p) {
      if (p.inStock) inStock++;
      if (p.category) cats[p.category] = true;
    });

    $scope.stats.total = total;
    $scope.stats.inStock = inStock;
    $scope.stats.outOfStock = total - inStock;
    $scope.stats.categoriesCount = Object.keys(cats).length;
  };

  // 3. Open Add Modal
  $scope.openAddModal = function () {
    $scope.isEditing = false;
    $scope.uploadFile = null;
    $scope.imagePreview = '';
    $scope.currentProduct = {
      name: '',
      price: null,
      oldPrice: null,
      memberPrice: null,
      unit: '১ লিটার বোতল',
      category: 'তরল দুধ',
      description: '',
      inStock: true,
      featured: false,
      imageUrl: ''
    };
    $scope.showModal = true;
  };

  // 4. Open Edit Modal
  $scope.openEditModal = function (product) {
    $scope.isEditing = true;
    $scope.uploadFile = null;
    $scope.imagePreview = product.image ? ('/' + product.image).replace('//', '/') : '';
    $scope.currentProduct = angular.copy(product);
    $scope.showModal = true;
  };

  // 5. Close Modal
  $scope.closeModal = function () {
    $scope.showModal = false;
    $scope.currentProduct = {};
    $scope.uploadFile = null;
    $scope.imagePreview = '';
  };

  // 6. Handle File Preview
  $scope.onFileSelect = function (file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imagePreview = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 7. Save Product (Create or Update)
  $scope.saveProduct = function () {
    if (!$scope.currentProduct.name || !$scope.currentProduct.price) {
      $scope.showToast('নাম এবং মূল্য প্রদান করা আবশ্যক!', 'error');
      return;
    }

    // Auto-calculate member price if empty
    if (!$scope.currentProduct.memberPrice) {
      $scope.currentProduct.memberPrice = $scope.currentProduct.price;
    }

    var formData = new FormData();
    formData.append('name', $scope.currentProduct.name);
    formData.append('price', $scope.currentProduct.price);
    if ($scope.currentProduct.oldPrice) {
      formData.append('oldPrice', $scope.currentProduct.oldPrice);
    }
    formData.append('memberPrice', $scope.currentProduct.memberPrice);
    formData.append('unit', $scope.currentProduct.unit || '১ পিস');
    formData.append('category', $scope.currentProduct.category || 'সাধারণ');
    formData.append('description', $scope.currentProduct.description || '');
    formData.append('inStock', $scope.currentProduct.inStock ? 'true' : 'false');
    formData.append('featured', $scope.currentProduct.featured ? 'true' : 'false');
    if ($scope.currentProduct.imageUrl) {
      formData.append('imageUrl', $scope.currentProduct.imageUrl);
    }

    if ($scope.uploadFile) {
      formData.append('imageFile', $scope.uploadFile);
    }

    var requestUrl = $scope.isEditing 
      ? '/api/products/' + $scope.currentProduct.id 
      : '/api/products';
    
    var requestMethod = $scope.isEditing ? 'PUT' : 'POST';

    $http({
      method: requestMethod,
      url: requestUrl,
      data: formData,
      headers: { 'Content-Type': undefined },
      transformRequest: angular.identity
    })
    .then(function (response) {
      if (response.data && response.data.success) {
        $scope.showToast($scope.isEditing ? 'প্রোডাক্ট সফলভাবে আপডেট হয়েছে!' : 'নতুন প্রোডাক্ট সফলভাবে যোগ হয়েছে!');
        $scope.closeModal();
        $scope.loadProducts();
      } else {
        $scope.showToast(response.data.message || 'একটি ত্রুটি ঘটেছে', 'error');
      }
    })
    .catch(function (error) {
      console.error('Save error:', error);
      $scope.showToast('সার্ভার এরর! প্রোডাক্ট সেভ করা যায়নি।', 'error');
    });
  };

  // 8. Delete Product Confirmation
  $scope.confirmDelete = function (product) {
    $scope.productToDelete = product;
    $scope.showDeleteModal = true;
  };

  $scope.cancelDelete = function () {
    $scope.showDeleteModal = false;
    $scope.productToDelete = null;
  };

  $scope.deleteProduct = function () {
    if (!$scope.productToDelete) return;

    $http.delete('/api/products/' + $scope.productToDelete.id)
      .then(function (response) {
        if (response.data && response.data.success) {
          $scope.showToast('প্রোডাক্ট ডিলিট করা হয়েছে!');
          $scope.cancelDelete();
          $scope.loadProducts();
        }
      })
      .catch(function (error) {
        console.error('Delete error:', error);
        $scope.showToast('প্রোডাক্ট ডিলিট করতে সমস্যা হয়েছে', 'error');
      });
  };

  // 9. Quick Toggle Stock Status
  $scope.toggleStock = function (product) {
    var newStatus = !product.inStock;
    $http.put('/api/products/' + product.id, { inStock: newStatus })
      .then(function () {
        product.inStock = newStatus;
        $scope.calculateStats();
        $scope.showToast(newStatus ? 'স্টক ইন করা হয়েছে' : 'স্টক আউট করা হয়েছে');
      })
      .catch(function () {
        $scope.showToast('স্ট্যাটাস আপডেট করা যায়নি', 'error');
      });
  };

  // 10. Dark / Light Mode Toggle in Admin
  $scope.isDarkMode = localStorage.getItem('dpo_theme') === 'dark';

  $scope.initTheme = function () {
    var savedTheme = localStorage.getItem('dpo_theme');
    var isDark = savedTheme === 'dark';
    $scope.setTheme(isDark);
  };

  $scope.setTheme = function (isDark) {
    $scope.isDarkMode = isDark;
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    var toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun" style="color: #facc15;"></i>' 
        : '<i class="fa-solid fa-moon" style="color: #0277bd;"></i>';
    }
  };

  $scope.toggleTheme = function () {
    var next = !$scope.isDarkMode;
    $scope.setTheme(next);
    localStorage.setItem('dpo_theme', next ? 'dark' : 'light');
    $scope.showToast(next ? '🌙 ডার্ক মোড চালু করা হয়েছে' : '☀️ লাইট মোড চালু করা হয়েছে');
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest('#theme-toggle-btn')) {
      e.preventDefault();
      $scope.$apply(function () {
        $scope.toggleTheme();
      });
    }
  });

  // Initial Load
  $scope.initTheme();
  $scope.loadProducts();
}]);
