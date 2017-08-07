'use strict'

var mysql = require('mysql');
var fs = require('fs');
const importer = require('node-mysql-importer');
var sprintf=require("sprintf-js").sprintf;
var Table = require('cli-table');
var inquirer = require('inquirer');


//** Use importer to read data from SQL file */
// importer.config({
//     'host': 'localhost',
//     'user': 'root',
//     'port':'8889',
//     'password': 'root',
//     'database': 'bamazon'
// });
 
// importer.importSQL('bamazon.sql').then( () => {
//     console.log('all statements have been executed')
// }).catch( err => {
//     console.log(`error: ${err}`)
// })

var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:'8889',
    user:'root',
    password: 'root',
    database: 'bamazon'
});


connection.connect(function(err){
    if (err) {
        throw err;
    }
    
// Delete
    deleteData();
// Create
    createData();
// Read
    selectData();
});

function deleteData() {
    connection.query("DELETE FROM products", function (err, data){
        if (err) {
            throw err;
        }
    });
};

function createData() {
connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('NES', 'Video Games', 99.99, 10),('Super Nintendo', 'Video Games', 149.99, 20),('Sega Genesis', 'Video Games', 149.98, 50),('Nintendo 64', 'Video Games', 199.99, 300),('Game Cube', 'Video Games', 249.99, 350),('Goose Island - 312', 'Beer', 9.99, 1000),('Goose Island - Summer Time', 'Beer', 11.99, 500),('Goose Island - Matilda', 'Beer', 12.99, 300),('Half Acre - Daisy Cutter', 'Beer', 13.99, 750),('Half Acre - Pony', 'Beer', 8.99, 400);", function (err, data){
        if (err) {
            throw err;
        }
    });
 }

function selectData() {

     var table = [];
     table = new Table({
        head: ['ID','Product Name', 'Department', 'Price', 'Stock']
    , colWidths: [10, 20, 20, 10, 10]
    });

    connection.query("select * from products", function (err, data){
        if (err) {
            throw err;
        }
        for (var i = 0; i < data.length; i++) {
            table.push([data[i].item_id, data[i].product_name, data[i].department_name, data[i].price.toFixed(2), data[i].stock_quantity])
        }
        console.log(table.toString());
        updateData();
    });
}

//Update the data based on the user input
function updateData() {

inquirer
  .prompt([
    {
      type: "input",
      message: "What is the ID of the product that you'd like to buy?",
      name: "product"
    },
    {
      type: "input",
      message: "How many products would you like to buy?",
      name: "quantity"
    },
  ]).then(function(inquirerResponse) {

    var productID = inquirerResponse.product;
    var quantityBuy = inquirerResponse.quantity;

    var queryFetch = "SELECT stock_quantity from products WHERE ?;"
    connection.query(queryFetch, [
        {
            item_id: productID
        }
    ], function (err, data){
        if (err) {
            throw err;
        }
         if (data[0].stock_quantity < quantityBuy) {
             console.log("Sorry, out of stock!");
             updateData();
         } else {
        
        var queryUpdate = "UPDATE products SET ? WHERE ?;"
        connection.query(queryUpdate, [
        {
            stock_quantity: data[0].stock_quantity-quantityBuy
        },
        {
            item_id: productID
        }
        ], function (err, data){
            if (err) {
                throw err;
            }
             selectData();
        })

         }
    });

});

};