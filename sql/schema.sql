-- Create database
CREATE DATABASE IF NOT EXISTS loyalty_app;
USE loyalty_app;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  coins INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  coin_value INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  ingredients JSON,
  category VARCHAR(36) NOT NULL,
  is_flash_sale BOOLEAN DEFAULT FALSE,
  discount_percentage INT,
  FOREIGN KEY (category) REFERENCES categories(id)
);

-- Stamp cards table
CREATE TABLE IF NOT EXISTS stamp_cards (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  card_number VARCHAR(20) NOT NULL UNIQUE,
  total_stamps INT NOT NULL,
  collected_stamps INT NOT NULL DEFAULT 0,
  owner VARCHAR(255) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  expiry_date DATE,
  reward_stages JSON,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  code VARCHAR(20) NOT NULL UNIQUE,
  expiry_date DATE,
  image_url VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('new', 'preparing', 'delivering', 'delivered', 'cancelled') NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  payment_method VARCHAR(50) NOT NULL,
  used_coins INT NOT NULL DEFAULT 0,
  earned_coins INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  customizations JSON,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

-- User gifts table
CREATE TABLE IF NOT EXISTS user_gifts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  gift_id VARCHAR(36) NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  used_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (gift_id) REFERENCES gifts(id)
);

-- Coin transactions table
CREATE TABLE IF NOT EXISTS coin_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  amount INT NOT NULL,
  type ENUM('earned', 'used') NOT NULL,
  description VARCHAR(255),
  order_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Indexes
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_stamp_cards_user_id ON stamp_cards(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_user_gifts_user_id ON user_gifts(user_id);
CREATE INDEX idx_coin_transactions_user_id ON coin_transactions(user_id);
