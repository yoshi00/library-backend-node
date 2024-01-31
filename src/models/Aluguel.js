const { Model, DataTypes } = require('sequelize');

class Aluguel extends Model {
    static init(sequelize){
        super.init({
            data_inicio: DataTypes.STRING,
            data_fim: DataTypes.STRING,
        },{
            sequelize,
            tableName: 'Alugueis'
        })
    }

    static associate(models) {
        this.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' });
        this.belongsTo(models.Copia, { foreignKey: 'id_copia' });
    }
}

module.exports = Aluguel
