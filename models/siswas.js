"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class siswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  siswas.init(
    {
      email: DataTypes.STRING,
      fullname: DataTypes.STRING,
      // age: DataTypes.INTEGER,
      birth_place: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      class_category: DataTypes.ENUM(
        "Matematika",
        "IPA",
        "IPS",
        "Bahasa",
        "Bela Diri",
        "Tari"
      ),
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      parents_name: DataTypes.STRING,
      parents_contact: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "siswas",
    }
  );
  return siswas;
};
