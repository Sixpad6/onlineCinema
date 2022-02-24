'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.users, {
        as:"userTransaction",
        foreignKey:{
          name : "idUser"
        }
      })
      transaction.belongsTo(models.film, {
        as:"filmTransaction",
        foreignKey:{
          name : "idFilm"
        }
      })
    }
  }
  transaction.init({
    idUser: DataTypes.INTEGER,
    idFilm: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING,
    transferProof: DataTypes.STRING,
    orderDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};