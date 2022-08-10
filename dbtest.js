const Sequelize = require('sequelize');
const sequelize = new Sequelize('bd_reserva', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((err) => console.log('There was an error in communicating to the database! Error:' + err));

const Postagem = sequelize.define('table', {
    //attributes
    att1: {
        //varchar(255)
        type: Sequelize.STRING
    },
    att2: {
        //text
        type: Sequelize.TEXT
    }
});