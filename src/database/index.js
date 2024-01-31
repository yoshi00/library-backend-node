const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Pessoa = require('../models/Pessoa');
const Livro = require('../models/Livro');
const Copia = require('../models/Copia');
const Aluguel = require('../models/Aluguel');

const connection = new Sequelize(dbConfig);

Pessoa.init(connection);
Livro.init(connection);
Copia.init(connection);
Aluguel.init(connection);

Pessoa.associate(connection.models);
Livro.associate(connection.models);
Copia.associate(connection.models);
Aluguel.associate(connection.models);

module.exports = connection;