import pool from '../config/database.js';

// Tạo đơn hàng mới
export const createOrder = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      items,
      totals,
      paymentMethod,
      coupon
    } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (name, email, phone, address, items, totals, payment_method, coupon, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       RETURNING *`,
      [
        name,
        email,
        phone,
        address,
        JSON.stringify(items),
        JSON.stringify(totals),
        paymentMethod,
        coupon || null,
        'pending' // pending, confirmed, shipping, delivered, cancelled
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Order created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
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

// Lấy danh sách đơn hàng
export const getOrders = async (req, res, next) => {
  try {
    const { email, status, page = 1, limit = 20 } = req.query;
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (email) {
      query += ` AND email = $${paramCount}`;
      params.push(email);
      paramCount++;
    }

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
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

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Order status updated'
    });
  } catch (error) {
    next(error);
  }
};

