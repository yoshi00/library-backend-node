const Pessoa = require('../models/Pessoa');
const Aluguel = require('../models/Aluguel');

module.exports = {
    async index(req, res) {
        try {
            const pessoas = await Pessoa.findAll({
                include: [{
                    model: Aluguel,
                    attributes: ['data_inicio', 'data_fim'],
                }],
            });
            return res.json(pessoas);
        } catch (error) {
            console.error('Error fetching people:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async store(req, res) {
        try {
            const { nome, cpf, data_nascimento, endereco } = req.body;
            const pessoa = await Pessoa.create({ 
                nome, 
                cpf, 
                data_nascimento, 
                endereco 
            });
            return res.json(pessoa);
        } catch (error) {
            console.error('Error creating person:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res) {
        try {
            const { nome, cpf, data_nascimento, endereco } = req.body;
            const { id } = req.params;
            const [updatedRows] = await Pessoa.update({ 
                nome, 
                cpf, 
                data_nascimento, 
                endereco 
            }, {
                where: { id },
            });

            if (updatedRows === 0) {
                return res.status(400).json({ error: 'Person not found' });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error('Error updating person:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await Pessoa.destroy({
                where: { id },
            });

            if (deletedRows === 0) {
                return res.status(400).json({ error: 'Person not found' });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting person:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
