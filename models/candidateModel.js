const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = sequelize.define('Candidate', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile_picture: {
        type: DataTypes.STRING,
    },
    visi: {
        type: DataTypes.TEXT,
    },
    misi: {
        type: DataTypes.TEXT,
    },
    nomor_urut: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vote_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'candidates',
    timestamps: false,
});

module.exports = Candidate;
