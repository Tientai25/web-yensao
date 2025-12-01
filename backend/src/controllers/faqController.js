import pool from '../config/database.js';

// Lấy tất cả FAQs
export const getFAQs = async (req, res, next) => {
  try {
    const { category, search, active } = req.query;
    let query = 'SELECT * FROM faqs WHERE 1=1';
    const params = [];

    // Filter by active status (default: only active)
    if (active !== undefined) {
      query += ' AND is_active = ?';
      params.push(active === 'true' || active === '1');
    } else {
      // Default: only show active FAQs for public API
      query += ' AND is_active = true';
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (LOWER(question) LIKE ? OR LOWER(answer) LIKE ?)';
      const searchTerm = `%${search.toLowerCase()}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY display_order ASC, id ASC';

    const [rows] = await pool.execute(query, params);

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    next(error);
  }
};

// Lấy một FAQ theo ID
export const getFAQById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found'
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

// Tạo FAQ mới (Admin only)
export const createFAQ = async (req, res, next) => {
  try {
    const { category, question, answer, display_order = 0, is_active = true } = req.body;

    // Validation
    if (!category || !question || !answer) {
      return res.status(400).json({
        success: false,
        error: 'Category, question, and answer are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO faqs (category, question, answer, display_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [category, question, answer, display_order, is_active]
    );

    const [newFAQ] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: newFAQ[0]
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật FAQ (Admin only)
export const updateFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, question, answer, display_order, is_active } = req.body;

    // Check if FAQ exists
    const [existing] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found'
      });
    }

    // Build update query dynamically
    const updates = [];
    const params = [];

    if (category !== undefined) {
      updates.push('category = ?');
      params.push(category);
    }
    if (question !== undefined) {
      updates.push('question = ?');
      params.push(question);
    }
    if (answer !== undefined) {
      updates.push('answer = ?');
      params.push(answer);
    }
    if (display_order !== undefined) {
      updates.push('display_order = ?');
      params.push(display_order);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    params.push(id);
    const query = `UPDATE faqs SET ${updates.join(', ')} WHERE id = ?`;

    await pool.execute(query, params);

    const [updated] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'FAQ updated successfully',
      data: updated[0]
    });
  } catch (error) {
    next(error);
  }
};

// Xóa FAQ (Admin only)
export const deleteFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if FAQ exists
    const [existing] = await pool.execute('SELECT * FROM faqs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found'
      });
    }

    await pool.execute('DELETE FROM faqs WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách categories
export const getFAQCategories = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT DISTINCT category FROM faqs WHERE is_active = true ORDER BY category ASC'
    );

    const categories = rows.map(row => row.category);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};


