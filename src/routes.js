const express = require('express');
const PessoaController = require('./controllers/PessoaControllers');
const LivroController = require('./controllers/LivroControllers');
const CopiaController = require('./controllers/CopiaControllers');
const AluguelController = require('./controllers/AluguelControllers');
const routes = express.Router();

routes.get('/users', PessoaController.index);
routes.post('/users', PessoaController.store);
routes.put('/users/:id', PessoaController.update);
routes.delete('/users/:id', PessoaController.delete);

routes.get('/books', LivroController.index);
routes.post('/books', LivroController.store);
routes.put('/books/:id', LivroController.update);
routes.delete('/books/:id', LivroController.delete);

routes.get('/copies', CopiaController.index);
routes.post('/copies/:id_livro', CopiaController.store);
routes.put('/copies/:id', CopiaController.update);
routes.delete('/copies/:id', CopiaController.delete);

routes.get('/rentals', AluguelController.index);
routes.post('/rentals', AluguelController.store);
routes.put('/rentals/:id', AluguelController.update);
routes.delete('/rentals/:id', AluguelController.delete);

module.exports = routes;