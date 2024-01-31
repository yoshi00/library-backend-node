const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            data_nascimento: DataTypes.STRING,
            endereco: DataTypes.STRING
        },{
            sequelize,
            tableName: 'Pessoas'
        })
    }
    static associate(models) {
        this.hasMany(models.Aluguel, { foreignKey: 'id_pessoa' });
    }
}

module.exports = Pessoa
