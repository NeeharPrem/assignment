CREATE DATABASE IF NOT EXISTS revenue_data;
USE revenue_data;

CREATE TABLE IF NOT EXISTS customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    UNIQUE KEY (name)
);

CREATE TABLE IF NOT EXISTS orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    ordered_item VARCHAR(100) NOT NULL,
    order_amount DECIMAL(10,2) NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    UNIQUE KEY (customer_id, ordered_item, order_amount, order_date)
);

INSERT IGNORE INTO customers (name) VALUES
('Jhon Doe'),('Nikhil'),('Anil Rajeev'),('Jane Smith'),('Bob Johnson');

INSERT IGNORE INTO orders(customer_id,ordered_item,order_amount,order_date) VALUES
(2, 'Laptop', 140.00, '2024-06-01'),
(3, 'Smartphone', 160.00, '2024-06-15'),
(4, 'Headphones', 210.00, '2024-07-01'),
(5, 'Smartwatch', 130.00, '2024-07-15'),
(1, 'Tablet', 190.00, '2024-08-01'),
(2, 'Gaming Console', 170.00, '2024-08-15'),
(3, 'Monitor', 250.00, '2024-09-01'),
(4, 'Keyboard', 100.00, '2024-09-15'),
(5, 'Camera', 240.00, '2024-10-01'),
(1, 'Printer', 180.00, '2024-10-15'),
(2, 'Router', 220.00, '2024-11-01'),
(3, 'External Hard Drive', 160.00, '2024-11-15'),
(4, 'Mouse', 260.00, '2024-12-01'),
(5, 'Smart Speaker', 150.00, '2024-12-15'),
(1, 'Drone', 170.00, '2025-01-01'),
(2, 'Fitness Tracker', 210.00, '2025-01-15'),
(3, 'Graphics Card', 200.00, '2025-02-01'),
(4, 'Bluetooth Speaker', 230.00, '2025-02-15'),
(5, 'Smart TV', 240.00, '2025-03-01'),
(1, 'VR Headset', 260.00, '2025-03-15');