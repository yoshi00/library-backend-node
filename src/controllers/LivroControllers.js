const Livro = require('../models/Livro');
const Copia = require('../models/Copia');

module.exports = {
    async index(req, res) {
        try {
            const livros = await Livro.findAll({
                include: [{
                    model: Copia,
                    attributes: ['codigo', 'status'],
                }],
            });
            return res.json(livros);
        } catch (error) {
            console.error('Error fetching books:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async store(req, res) {
        try {
            const { titulo, autor, isbn, codigo_copia } = req.body;
            const livro = await Livro.create({ 
                titulo, 
                autor, 
                isbn, 
                codigo_copia 
            });
            return res.json(livro);
        } catch (error) {
            console.error('Error creating book:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, autor, isbn, codigo_copia } = req.body;
            
            const [updatedRows] = await Livro.update({ 
                titulo, 
                autor, 
                isbn, 
                codigo_copia 
            }, { 
                where: { id } 
            });

            if (updatedRows === 0) {
                return res.status(400).json({ error: 'Book not found' });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error('Error updating book:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await Livro.destroy({
                where: { id }
            });

            if (deletedRows === 0) {
                return res.status(400).json({ error: 'Book not found' });
            }

            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting book:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
