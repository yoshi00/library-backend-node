const Aluguel = require('../models/Aluguel');
const Pessoa = require('../models/Pessoa');
const Copia = require('../models/Copia');

module.exports = {
    async index(req, res) {
        try {
            const alugueis = await Aluguel.findAll({
                include: [
                    {
                        model: Pessoa,
                        attributes: ['nome', 'cpf'],
                    },
                    {
                        model: Copia,
                        attributes: ['codigo', 'status'],
                    },
                ],
            });
            return res.json(alugueis);
        } catch (error) {
            console.error('Error fetching rentals:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async store(req, res) {
        try {
            const { id_pessoa, id_copia, data_inicio, data_fim } = req.body;

            const pessoa = await Pessoa.findByPk(id_pessoa);
            if (!pessoa) {
                return res.status(400).json({ error: 'Person not found' });
            }

            const copia = await Copia.findByPk(id_copia);
            if (!copia) {
                return res.status(400).json({ error: 'Copy not found' });
            }

            const aluguel = await Aluguel.create({
                id_pessoa,
                id_copia,
                data_inicio,
                data_fim,
            });

            return res.json(aluguel);
        } catch (error) {
            console.error('Error creating rental:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { id_pessoa, id_copia, data_inicio, data_fim } = req.body;

            const aluguel = await Aluguel.findByPk(id);
            if (!aluguel) {
                return res.status(400).json({ error: 'Rental not found' });
            }

            const pessoa = await Pessoa.findByPk(id_pessoa);
            if (!pessoa) {
                return res.status(400).json({ error: 'Person not found' });
            }

            const copia = await Copia.findByPk(id_copia);
            if (!copia) {
                return res.status(400).json({ error: 'Copy not found' });
            }

            const updatedAluguel = await aluguel.update({
                id_pessoa,
                id_copia,
                data_inicio,
                data_fim,
            });

            return res.json(updatedAluguel);
        } catch (error) {
            console.error('Error updating rental:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await Aluguel.destroy({
                where: { id },
            });

            if (deletedRows === 0) {
                return res.status(400).json({ error: 'Rental not found' });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting rental:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
