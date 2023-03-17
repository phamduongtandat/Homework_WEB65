const fs = require('fs')
const http = require('http')
const url = require("url")
const { findMax, findMinWomen } = require('./productService')
const products = [
    { id: 1, name: 'T-shirt', price: 1000, type: 'men', amount: 10 },
    { id: 2, name: 'Jacket', price: 1500, type: 'men', amount: 100 },
    { id: 3, name: 'Spant', price: 10500, type: 'women', amount: 20 },
    { id: 4, name: 'Shoes', price: 2500, type: 'men', amount: 50 },
    { id: 5, name: 'Dress', price: 4500, type: 'women', amount: 90 },
]

fs.writeFile('products.json', JSON.stringify(products), () => { console.log('done') })


const serverListener = (req, res) => {

    switch (req.url) {
        case "/": {
            res.end('LESSION-1: ');
            break;
        }
        case "/api/products": {
            const prodData = fs.readFileSync("./products.json", "utf-8");
            res.end(prodData);
            break;
        }
        case "/api/products/getMaxPrice": {
            const prodData = fs.readFileSync("./products.json", "utf-8");
            const getMaxPrice = findMax(JSON.parse(prodData));
            res.end(JSON.stringify(getMaxPrice));
            break;
        }
        case "/api/products/getMinPriceWomen": {
            const prodData = fs.readFileSync("./products.json", "utf-8");
            const getMinPriceWomen = findMinWomen(JSON.parse(prodData));
            res.end(JSON.stringify(getMinPriceWomen));
            break;
        }
        default:
            break;
    }
};

const server = http.createServer(serverListener);

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});