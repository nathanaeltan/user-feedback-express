-- Seed Users
INSERT INTO users (name, email, password) VALUES
('John Doe', 'john.doe@example.com', 'hashed_password1'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password2'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password3');

-- Seed Products
INSERT INTO products (name, description) VALUES
('Product A', 'Description for Product A'),
('Product B', 'Description for Product B'),
('Product C', 'Description for Product C');

-- Seed Feedbacks
INSERT INTO feedbacks (feedback, product_id, user_id) VALUES
('Great product!', 1, 1),
('Good quality!', 2, 2),
('Loved it!', 3, 3);