const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'prepare_order_comments',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING
        },
        creater_id: {
            type: Sequelize.INTEGER
        },
        order_id: {
            type: Sequelize.INTEGER
        },
        data_create: {
            type: Sequelize.DATE
        },
    },
    {
        timestamps: false
    }
)