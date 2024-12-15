const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const History = sequelize.define('History', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vote_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transaction_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    block_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'history',
    timestamps: false,
});

module.exports = History;
