import pool from '../config/database.js';

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    const [rows] = await pool.execute(
      `SELECT * FROM coupons 
       WHERE code = ? 
       AND active = true 
       AND (expires_at IS NULL OR expires_at > NOW())
       AND (usage_limit IS NULL OR usage_count < usage_limit)`,
      [code.toUpperCase()]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        valid: false,
        message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn'
      });
    }

    const coupon = rows[0];
    res.json({
      success: true,
      valid: true,
      data: {
        code: coupon.code,
        type: coupon.type, // 'percent' or 'fixed' or 'shipping'
        value: coupon.value,
        message: 'Mã giảm giá hợp lệ'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCoupons = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT code, type, value, description FROM coupons WHERE active = true'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

