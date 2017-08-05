CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('NES', 'Video Games', 99.99, 10),
('Super Nintendo', 'Video Games', 149.99, 20),
('Sega Genesis', 'Video Games', 149.98, 50),
('Nintendo 64', 'Video Games', 199.99, 300),
('Game Cube', 'Video Games', 249.99, 350),
('Goose Island - 312', 'Beer', 9.99, 1000),
('Goose Island - Summer Time', 'Beer', 11.99, 500),
('Goose Island - Matilda', 'Beer', 12.99, 300),
('Half Acre - Daisy Cutter', 'Beer', 13.99, 750),
('Half Acre - Pony', 'Beer', 8.99, 400)