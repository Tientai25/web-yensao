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
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    query += ` ORDER BY id DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.rowCount
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
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
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

    const result = await pool.query(
      `INSERT INTO products (name, category, price, original_price, image, rating, reviews, description, benefits, in_stock, article)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
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

    res.status(201).json({
      success: true,
      data: result.rows[0]
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
      const oldProduct = await pool.query('SELECT image FROM products WHERE id = $1', [id]);
      if (oldProduct.rows[0]?.image && oldProduct.rows[0].image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../../', oldProduct.rows[0].image);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
    }

    const result = await pool.query(
      `UPDATE products 
       SET name = $1, category = $2, price = $3, original_price = $4, image = $5, 
           rating = $6, reviews = $7, description = $8, benefits = $9, 
           in_stock = $10, article = $11, updated_at = NOW()
       WHERE id = $12
       RETURNING *`,
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

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
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

