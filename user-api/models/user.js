const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Adjust the path to your Sequelize setup

const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  UserStatus: {
    type: DataTypes.STRING,
    allowNull: false, // or true depending on your needs
  },
}, {
  timestamps: false, // Set to true if you want Sequelize to add createdAt and updatedAt fields
});

module.exports = User;
