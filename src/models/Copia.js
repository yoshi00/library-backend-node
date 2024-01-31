const { Model, DataTypes } = require('sequelize');

class Copia extends Model {
    static init(sequelize){
        super.init({
            codigo: DataTypes.STRING,
            status: DataTypes.STRING,
        },{
            sequelize,
            tableName: 'Copias'
        })
    }

    static associate(models) {
        this.belongsTo(models.Livro, { foreignKey: 'id_livro' });
        this.hasOne(models.Aluguel, { foreignKey: 'id_copia' });
    }
}

module.exports = Copia
