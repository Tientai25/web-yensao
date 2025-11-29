import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lấy tất cả sản phẩm
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)';
      const searchTerm = `%${search.toLowerCase()}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [rows] = await pool.execute(query, params);
    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: rows.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      originalPrice,
      image,
      rating,
      reviews,
      description,
      benefits,
      inStock,
      article
    } = req.body;

    // Nếu có file upload, sử dụng URL từ file upload
    let imageUrl = image;
    if (req.file) {
      imageUrl = `/uploads/products/${req.file.filename}`;
    }

    const [result] = await pool.execute(
      `INSERT INTO products (name, category, price, original_price, image, rating, reviews, description, benefits, in_stock, article)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        price,
        originalPrice,
        imageUrl,
        rating || 0,
        reviews || 0,
        description,
        JSON.stringify(benefits || []),
        inStock !== undefined ? inStock : true,
        JSON.stringify(article || null)
      ]
    );

    // Lấy sản phẩm vừa tạo
    const [newProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      data: newProduct[0]
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      originalPrice,
      image,
      rating,
      reviews,
      description,
      benefits,
      inStock,
      article
    } = req.body;

    // Nếu có file upload mới, sử dụng URL từ file upload
    let imageUrl = image;
    if (req.file) {
      imageUrl = `/uploads/products/${req.file.filename}`;
      
      // Xóa ảnh cũ nếu có
      const [oldProductRows] = await pool.execute('SELECT image FROM products WHERE id = ?', [id]);
      if (oldProductRows[0]?.image && oldProductRows[0].image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../../', oldProductRows[0].image);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
    }

    const [result] = await pool.execute(
      `UPDATE products 
       SET name = ?, category = ?, price = ?, original_price = ?, image = ?, 
           rating = ?, reviews = ?, description = ?, benefits = ?, 
           in_stock = ?, article = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        name,
        category,
        price,
        originalPrice,
        imageUrl,
        rating,
        reviews,
        description,
        JSON.stringify(benefits),
        inStock,
        JSON.stringify(article),
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Lấy sản phẩm đã cập nhật
    const [updatedProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedProduct[0]
    });
  } catch (error) {
    next(error);
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

