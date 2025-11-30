import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters.'
      });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered. Please login instead.'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name || null, 'user']
    );

    // Get created user (without password)
    const [newUsers] = await pool.execute(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUsers[0].id, email: newUsers[0].email },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_this_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: newUsers[0],
        token
      },
      message: 'User registered successfully.'
    });
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      });
    }

    // Find user
    const [users] = await pool.execute(
      'SELECT id, email, password, name, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_this_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login successful.'
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// Get current user (requires authentication)
export const getMe = async (req, res, next) => {
  try {
    // User is attached by authenticate middleware
    const [users] = await pool.execute(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Get me error:', error);
    next(error);
  }
};

// Logout (client-side token removal, but we can track it if needed)
export const logout = async (req, res) => {
  // Since we're using JWT, logout is handled client-side by removing the token
  // But we can add token blacklisting here if needed in the future
  res.json({
    success: true,
    message: 'Logout successful.'
  });
};


