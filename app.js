//install node exec, rest client, express, nodemon

import express from 'express';
//import * as fs from 'node:fs/promises';
import * as fs from 'node:fs';
import { engine } from 'express-handlebars';

//dirname
import path from 'path';
import { fileURLToPath } from 'url';

const { createHmac } = await import('node:crypto');

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});


app.use('/static', express.static(__dirname + '/public'));

/*
app.get("/primeira-rota", (req, res) => {
    return res.json({
        message: 'Acessou a primeira rota',
    });
});
*/


let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
})

app.post("/products", (req, res) => {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    productFile();

    return res.json(product);
})

app.get("/products", (req, res) => {
    return res.json(products)
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    productFile();

    return res.json({ message: "Produto alterado com sucesso"  });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return res.json({ message: "Produto excluído com sucesso" });
});

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err){
            console.log(err);
        } else {
            console.log("Produto inserido");
        }
    });
}

app.listen(4002, () => console.log('O app está rodando na porta 4002'));