'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchased extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchased.init({
    idUser: DataTypes.INTEGER,
    idTransction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'purchased',
  });
  return purchased;
};