<template>
    <Loader v-if="loader" />
    <div class="expense-table" v-else>
        <div class="container">
            <form class="expenses-table__sort">
                <input type="date" class="expenses-table__sort--input input" placeholder="Початкова дата" v-model="filterStartData">
                <input type="date" class="expenses-table__sort--input input" placeholder="Кінцева дата" v-model="filterEndData">
            </form>
            <div class="expense-table__sum-info">Сума витрат: <span class="expense-table__sum-info--span">{{sumMoney}}</span></div>
            <div class="expense-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="expense-table__item-head">
                    №
                </div>
                <div class="expense-table__item-head">
                    Дата
                </div>
                <div class="expense-table__item-head">
                    Назва витрати
                </div>
                <div class="expense-table__item-head">
                    Сума
                </div>
            </div>
            <div class="expense-table__box-body" v-for="(expense, index) in filteredExpenses" :key="expense.id" :class="{'check': expense.name == 'Перевірка'}">
                <div class="expense-table__item-body">
                    <span class="expense-table__item-body--responsive">№:</span> {{index + 1}}
                </div>
                <div class="expense-table__item-body">
                    <span class="expense-table__item-body--responsive">Дата:</span> {{expense.data}}
                </div>
                <div class="expense-table__item-body">
                    <span class="expense-table__item-body--responsive">Назва витрат:</span> {{expense.name}}
                </div>
                <div class="expense-table__item-body">
                    <span class="expense-table__item-body--responsive">Сума:</span> {{expense.number}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'
import {busGetOrders} from '../../main'

export default {
    name: "MyExpenseTable",
    data: () => ({
        expenses: [],
        filterStartData: '',
        filterEndData: '',
        loader: true,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 225) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getMyExpense()
        busGetOrders.$on('getNewExpense', this.getMyExpense)
    },
    methods: {
        async getMyExpense() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/myexpenses/${this.$store.state.auth.newuser.user.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.expenses = result.data.reverse()
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        }
    },
    computed: {
        filteredExpenses() {
            return this.expenses.filter((expense) => {
                if(this.filterStartData != '' && this.filterEndData != '') {
                    return expense.data >= this.filterStartData
                    && expense.data <= this.filterEndData
                } else if(this.filterEndData != '') {
                    return expense.data <= this.filterEndData
                } else {
                    return expense.data >= this.filterStartData
                }
            })
        },
        sumMoney() {
            return this.filteredExpenses.reduce((acc, item) => {
                if(item.name === 'Перевірка') {
                    acc += 0;
                } else {
                    acc += item.number;
                }
                return acc
            
            }, 0);
        },
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .expense-table {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .expenses-table__sort {
        margin-bottom: 30px;
    }
    .expenses-table__sort--input {
        &:first-child {
            margin-right: 15px;
        }
    }
    .expense-table__sum-info {
        border: 1px solid #000;
        font-size: 16px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 100%;
        padding: 5px;
    }
    .expense-table__sum-info--span {
        font-weight: 400;
    }
    .expense-table__box-head {
        display: flex;
        background: #ccc;
    }
    .expense-table__item-head {
        border: 1px solid #000;
        font-size: 16px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 100%;
        text-align: center;
        padding: 5px 0px;
    }
    .expense-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .expense-table__item-body {
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
        width: 100%;
        padding: 5px 0px;
        text-align: center;
    }
    .expense-table__item-body--responsive {
        font-weight: 700;
        display: none;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    @media screen and (max-width: 1430px) {
        .fixed {
            width: 98.6%;
        }
    }
    @media screen and (max-width: 500px) {
        .expenses-table__sort--input {
            display: block;
            width: 100%;
            &:first-child {
                margin-bottom: 10px;
            }
        }
        .expense-table__box-head {
            display: none;
        }
        .expense-table__box-body {
            display: block;
            margin-bottom: 15px;
        }
        .expense-table__item-body {
            text-align: left;
        }
        .expense-table__item-body--responsive {
            display: inline-block;
        }
    }
</style>