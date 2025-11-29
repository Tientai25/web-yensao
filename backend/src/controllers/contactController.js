import pool from '../config/database.js';
import { sendEmail } from '../utils/email.js';

export const sendContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Lưu vào database
    const [result] = await pool.execute(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [name, email, subject, message]
    );

    // Lấy contact vừa tạo
    const [newContact] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [result.insertId]);

    // Gửi email (optional)
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@yensaopremium.com',
        subject: `Liên hệ từ website: ${subject}`,
        html: `
          <h2>Thông tin liên hệ</h2>
          <p><strong>Tên:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tiêu đề:</strong> ${subject}</p>
          <p><strong>Nội dung:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Không fail request nếu email lỗi
    }

    res.status(201).json({
      success: true,
      data: newContact[0],
      message: 'Contact message sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

