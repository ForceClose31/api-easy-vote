const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vote = sequelize.define('Vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'votes',
    timestamps: false,
});

module.exports = Vote;
