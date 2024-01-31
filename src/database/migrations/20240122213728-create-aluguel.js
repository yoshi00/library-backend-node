'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Alugueis', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_fim: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pessoas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_copia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Copias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      } 
    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Alugueis');
  }
};
