const http = require('http');


//joaob:AgHv9l76kbnIsWgH
http.createServer((req, res) => {
    res.writeHead(200, { 'Contente-Type': 'application/json' });

    if(req.url === 'produto'){
        res.end(JSON.stringify({
            message: 'Rota de produto'
        }))
    }

    if(req.url === 'usuario'){
        res.end(JSON.stringify({
            message: 'Rota de usuário'
        }))
    }

    res.end('Hello Node JS!');

}).listen(4001, () => console.log("I'm using NodeJS for the first time!"));