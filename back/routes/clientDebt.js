const Router = require('koa-router')
const router = new Router()
const Order = require('../models/Order')
const { sequelize } = require('../database/db')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/api/alldebts', authMiddleware, async ctx => {
    try {
        if(ctx.user.role_id != 1 && ctx.user.role_id !=5 && ctx.user.role_id !=4 || ctx.user.ban == 1) {
            return ctx.status = 400
        }
        if(ctx.user.role_id == 1) {
            const debts = await sequelize.query(
                `SELECT sum(orders.debt) as sumDebt, orders.client_id, clients.name, towns.name as townName, towns.region, towns.area  
                FROM orders 
                LEFT JOIN clients ON orders.client_id = clients.id
                JOIN towns ON clients.town_id = towns.id
                WHERE orders.product_name != "Перевірка"
                GROUP BY clients.id
                `
            )
            const pithDebts = await sequelize.query(
                `SELECT sum(piths.price_cash*(piths.number * 1.6)) as sumPith, piths.client_id FROM piths 
                LEFT JOIN clients ON piths.client_id = clients.id
                WHERE piths.math = 1
                GROUP BY clients.id
                `
            )
            return ctx.body = {
                debts: debts[0],
                pithDebts: pithDebts[0]
            }
        } else if(ctx.user.role_id == 4) {
            const debts = await sequelize.query(
                `SELECT sum(orders.debt) as sumDebt, orders.client_id, clients.name, towns.name as townName, towns.region, towns.area  
                FROM orders 
                LEFT JOIN clients ON orders.client_id = clients.id
                JOIN towns ON clients.town_id = towns.id
                GROUP BY clients.id
                `
            )
            return ctx.body = {
                debts: debts[0],
            }
        } else if(ctx.user.role_id == 5) {
            const debts = await sequelize.query(
                `SELECT sum(orders.debt) as sumDebt, orders.client_id, clients.name, towns.manager_id, towns.safemanager_id, towns.securitymanager_id, towns.second_security_manager_id, towns.third_security_manager_id, towns.name as townName, towns.region, towns.area 
                FROM orders 
                LEFT JOIN clients ON orders.client_id = clients.id
                JOIN towns ON clients.town_id = towns.id
                where  towns.manager_id = ${ctx.user.id} or towns.safemanager_id = ${ctx.user.id} or towns.securitymanager_id = ${ctx.user.id} or towns.second_security_manager_id = ${ctx.user.id} or towns.third_security_manager_id = ${ctx.user.id}
                GROUP BY clients.id
                `
            )
            const pithDebts = await sequelize.query(
                `SELECT sum(piths.price_cash*(piths.number * 1.6)) as sumPith, piths.client_id, towns.manager_id, towns.safemanager_id, towns.securitymanager_id, towns.second_security_manager_id, towns.third_security_manager_id
                FROM piths 
                LEFT JOIN clients ON piths.client_id = clients.id
                JOIN towns ON clients.town_id = towns.id
                WHERE (piths.math = 1) and (towns.manager_id = ${ctx.user.id} or towns.safemanager_id = ${ctx.user.id} or towns.securitymanager_id = ${ctx.user.id} or towns.second_security_manager_id = ${ctx.user.id} or towns.third_security_manager_id = ${ctx.user.id})
                GROUP BY clients.id
                `
            )
            return ctx.body = {
                debts: debts[0],
                pithDebts: pithDebts[0]
            }
        }
    } catch (e) {
        ctx.body = e
    }
})

module.exports = router