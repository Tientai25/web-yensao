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

    // Generate order number
    const orderNumber = 'ORD-' + Date.now();
    
    const [result] = await pool.execute(
      `INSERT INTO orders (order_number, name, email, phone, address, items, totals, payment_method, coupon, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
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

    // Lấy đơn hàng vừa tạo
    const [newOrder] = await pool.execute('SELECT * FROM orders WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      data: newOrder[0],
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
    const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
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

// Lấy danh sách đơn hàng
export const getOrders = async (req, res, next) => {
  try {
    const { email, status, page = 1, limit = 20 } = req.query;
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (email) {
      query += ' AND email = ?';
      params.push(email);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
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

    const [result] = await pool.execute(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Lấy đơn hàng đã cập nhật
    const [updatedOrder] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedOrder[0],
      message: 'Order status updated'
    });
  } catch (error) {
    next(error);
  }
};

