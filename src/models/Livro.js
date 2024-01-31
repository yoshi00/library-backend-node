const { Model, DataTypes } = require('sequelize');

class Livro extends Model {
    static init(sequelize){
        super.init({
            titulo: DataTypes.STRING,
            autor: DataTypes.STRING,
            isbn: DataTypes.STRING,
            codigo_copia: DataTypes.STRING
        },{
            sequelize,
            tableName: 'Livros'
        })
    }

    static associate(models) {
        this.hasMany(models.Copia, { foreignKey: 'id_livro' });
    }
}

module.exports = Livro
