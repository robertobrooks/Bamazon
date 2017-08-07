# Bamazon App
The purpose of this app is to interact with a user, and inquiring if they want to purchase an item, and based on the user response, 
the database will be updated, unless there are not sufficient items to fulfill the order.

Here are the steps followed to create this application (with some screenshots):

1. Created a MySQL Database called `bamazon`.

2. Created a Table inside of that database called `products`.

3. The products table has the following columns:
   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

4. Populated the bamazon database with 10 different products.

5. When the application is run it displays all of the items available for sale:
![selectall](https://user-images.githubusercontent.com/2281419/29010903-7bfc5354-7af4-11e7-8c3c-2c9a1e15bf14.png)

6. After the products are displayed, the following questions are asked to the user:
   * ID of the product they would like to buy.
   * how many units of the product they would like to buy.

7. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.
   * If not, the app displays `Sorry, out of stock!`, and then prevent the order from going through.
![outofstock](https://user-images.githubusercontent.com/2281419/29011249-1f25b172-7af7-11e7-9dba-f1224fb547ec.png)

8. If there's enough quantity of the product, it fulfills the customer's order.
