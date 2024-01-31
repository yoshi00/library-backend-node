const Copia = require('../models/Copia');
const Livro = require('../models/Livro');
const Aluguel = require('../models/Aluguel');

module.exports = {
    async index(req, res) {
        try {
            const copias = await Copia.findAll({
                include: [
                    {
                        model: Livro,
                        attributes: ['titulo', 'autor', 'isbn'],
                    },
                    {
                        model: Aluguel,
                        attributes: ['data_inicio', 'data_fim'],
                    },
                ],
            });
            return res.json(copias);
        } catch (error) {
            console.error('Error fetching copies:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async store(req, res) {
        try {
            const { id_livro } = req.params;
            const { codigo, status } = req.body;

            const livro = await Livro.findByPk(id_livro);
            if (!livro) {
                return res.status(400).json({ error: 'Book not found' });
            }

            const copia = await Copia.create({
                codigo,
                status,
                id_livro,
            });

            return res.json(copia);
        } catch (error) {
            console.error('Error creating copy:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;

            const copia = await Copia.findByPk(id);
            if (!copia) {
                return res.status(400).json({ error: 'Copy not found' });
            }

            const { codigo, status } = req.body;
            const updatedCopia = await copia.update({
                codigo,
                status,
            });

            return res.json(updatedCopia);
        } catch (error) {
            console.error('Error updating copy:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const copia = await Copia.findByPk(id);
            if (!copia) {
                return res.status(400).json({ error: 'Copy not found' });
            }

            await copia.destroy();
            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting copy:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
