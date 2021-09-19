const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'personal_expenses', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.FLOAT
        },
        data: {
            type: Sequelize.STRING
        },
        creater: {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false
    }
)