const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const DATA_FILE = path.join(__dirname, '../data/products.json');
const UPLOAD_DIR = path.join(__dirname, '../../uploads/products');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Ensure data directory and file exist
const DATA_DIR = path.dirname(DATA_FILE);
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'prod-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  if (allowed.test(ext) || allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP, GIF, SVG) are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Helper functions for reading/writing data
function readProducts() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products.json:', err);
    return [];
  }
}

function writeProducts(products) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing products.json:', err);
    return false;
  }
}

// 1. GET ALL PRODUCTS
router.get('/', (req, res) => {
  let products = readProducts();
  const { category, search, inStock } = req.query;

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  if (inStock !== undefined) {
    const stockBool = inStock === 'true';
    products = products.filter(p => p.inStock === stockBool);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// 2. GET SINGLE PRODUCT
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id.toString() === req.params.id.toString());

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, data: product });
});

// 3. CREATE NEW PRODUCT (with optional image upload)
router.post('/', upload.single('imageFile'), (req, res) => {
  try {
    const products = readProducts();
    const { name, price, oldPrice, memberPrice, unit, category, description, inStock, featured, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Product name and price are required.' });
    }

    // Determine image path: uploaded file or provided URL or default placeholder
    let imagePath = 'assets/images/milk-1l.jpg';
    if (req.file) {
      imagePath = 'uploads/products/' + req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      imagePath = imageUrl.trim();
    }

    const newId = Date.now().toString();

    const newProduct = {
      id: newId,
      name: name.trim(),
      price: parseFloat(price) || 0,
      oldPrice: oldPrice ? parseFloat(oldPrice) : null,
      memberPrice: memberPrice ? parseFloat(memberPrice) : (parseFloat(price) || 0),
      unit: unit ? unit.trim() : '১ পিস',
      image: imagePath,
      category: category ? category.trim() : 'সাধারণ',
      description: description ? description.trim() : '',
      inStock: inStock === 'true' || inStock === true,
      featured: featured === 'true' || featured === true,
      createdAt: new Date().toISOString()
    };

    products.unshift(newProduct); // Add to top
    writeProducts(products);

    res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// 4. UPDATE PRODUCT
router.put('/:id', upload.single('imageFile'), (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id.toString() === req.params.id.toString());

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existing = products[index];
    const { name, price, oldPrice, memberPrice, unit, category, description, inStock, featured, imageUrl } = req.body;

    let imagePath = existing.image;
    if (req.file) {
      imagePath = 'uploads/products/' + req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      imagePath = imageUrl.trim();
    }

    const updatedProduct = {
      ...existing,
      name: name !== undefined ? name.trim() : existing.name,
      price: price !== undefined ? parseFloat(price) : existing.price,
      oldPrice: oldPrice !== undefined ? (oldPrice ? parseFloat(oldPrice) : null) : existing.oldPrice,
      memberPrice: memberPrice !== undefined ? parseFloat(memberPrice) : existing.memberPrice,
      unit: unit !== undefined ? unit.trim() : existing.unit,
      image: imagePath,
      category: category !== undefined ? category.trim() : existing.category,
      description: description !== undefined ? description.trim() : existing.description,
      inStock: inStock !== undefined ? (inStock === 'true' || inStock === true) : existing.inStock,
      featured: featured !== undefined ? (featured === 'true' || featured === true) : existing.featured,
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;
    writeProducts(products);

    res.json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// 5. DELETE PRODUCT
router.delete('/:id', (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id.toString() === req.params.id.toString());

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const deleted = products.splice(index, 1)[0];

    // Optionally delete uploaded image file if it's in uploads
    if (deleted.image && deleted.image.startsWith('uploads/products/')) {
      const filePath = path.join(__dirname, '../../', deleted.image);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete image file:', e);
        }
      }
    }

    writeProducts(products);

    res.json({
      success: true,
      message: 'Product deleted successfully!',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

module.exports = router;
