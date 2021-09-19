<template>
    <Loader v-if="loader" />
    <div class="personal-expenses-list" v-else>
        <div class="container">
            <h2 class="personal-expenses-list__headline">Витрати працівника: <span class="personal-expenses-list__headline--span">{{personInfo[0].login}}</span></h2>
            <CheckExpense 
                @checkCreate="updateExpenses"
            />
            <form class="personal-expenses-list__sort">
                <input type="date" class="personal-expenses-list__sort--input input" placeholder="Початкова дата" v-model="filterStartData">
                <input type="date" class="personal-expenses-list__sort--input input" placeholder="Кінцева дата" v-model="filterEndData">
            </form>
            <div class="personal-expenses-list__sum-info">Сума витрат: <span class="personal-expenses-list__sum-info--span">{{sumMoney}}</span></div>
            <div class="personal-expenses-list__box-head"
                :class="{fixed: fix}"
            >
                <div class="personal-expenses-list__item-head">
                    №
                </div>
                <div class="personal-expenses-list__item-head">
                    Дата
                </div>
                <div class="personal-expenses-list__item-head">
                    Дата створення
                </div>
                <div class="personal-expenses-list__item-head">
                    Назва витрати
                </div>
                <div class="personal-expenses-list__item-head">
                    Сума
                </div>
                <div class="personal-expenses-list__item-head">
                    Редагувати
                </div>
                <div class="personal-expenses-list__item-head">
                    Видалити
                </div>
            </div>
            <div class="personal-expenses-list__box-body" v-for="(expense, index) in filteredAllExpenses" :key="expense.id" :class="{'check': expense.name == 'Перевірка'}">
                <div class="personal-expenses-list__item-body">
                    <span class="personal-expenses-list__item-body--repsonive">№:</span> {{index + 1}}
                </div>
                <div class="personal-expenses-list__item-body">
                    <span class="personal-expenses-list__item-body--repsonive">Дата:</span> {{expense.data}}
                </div>
                <div class="personal-expenses-list__item-body">
                    <span class="personal-expenses-list__item-body--repsonive">Дата створення:</span> {{expense.data_create}}
                </div>
                <div class="personal-expenses-list__item-body">
                    <span class="personal-expenses-list__item-body--repsonive">Назва витрат:</span> {{expense.name}}
                </div>
                <div class="personal-expenses-list__item-body">
                    <span class="personal-expenses-list__item-body--repsonive">Сума:</span> {{expense.number}}
                </div>
                <div class="personal-expenses-list__item-body edit" @click.prevent="showModalEdit(expense.id, expense.name, expense.number, expense.data)">
                    Редагувати
                </div>
                <div class="personal-expenses-list__item-body delete" @click.prevent="deleteExpenses(expense.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEdit v-if="showModal" 
            :showModal = "showModal"
            :id = "id"
            :name = "name"
            :number = "number"
            :data = "data"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEdit from '../modals/ModalEditEpxenses'
import CheckExpense from './CheckExpense'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "PersonalExpensesList",
    data: () => ({
        id: '',
        name: '',
        number: '',
        data: '',
        filterStartData: '',
        filterEndData: '',
        expenses: [],
        personInfo: [],
        loader: true,
        showModal: false,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 275) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getExpenses()
    },
    methods: {

        async getExpenses() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/personalexpenses/${this.$route.params.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.expenses = result.data.personalExpenses.reverse()
                this.personInfo = result.data.personalInfo
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async deleteExpenses(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/personalexpense/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getExpenses()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showModalEdit(id, name, number, data) {
            this.showModal = !this.showModal
            this.id = id
            this.name = name
            this.number = number
            this.data = data
        },
        ChangeModalEdit(data) {
            this.showModal = data
            this.getExpenses()
        },
        updateExpenses() {
            this.getExpenses()
        }
    },
    computed: {
        filteredAllExpenses() {
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
            return this.filteredAllExpenses.reduce((acc, item) => {
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
        ModalEdit,
        CheckExpense,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .personal-expenses-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .personal-expenses-list__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;
    }
    .personal-expenses-list__headline--span {
        font-weight: 400;
    }
    .personal-expenses-list__sum-info {
        border: 1px solid #000;
        font-size: 16px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 100%;
        padding: 5px;
    }
    .personal-expenses-list__sum-info--span {
        font-weight: 400;
    }
    .personal-expenses-list__sort {
        margin-bottom: 30px;
    }
    .personal-expenses-list__sort--input {
        &:first-child {
            margin-right: 15px;
        }
    }
    .personal-expenses-list__box-head {
        display: flex;
        background: #ccc;
    }
    .personal-expenses-list__item-head {
        border: 1px solid #000;
        font-size: 16px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 100%;
        text-align: center;
        padding: 5px 0px;
    }
    .personal-expenses-list__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .personal-expenses-list__item-body {
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
        width: 100%;
        padding: 5px 0px;
        text-align: center;
    }
    .personal-expenses-list__item-body--repsonive {
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
    @media screen and (max-width: 650px) {
        .personal-expenses-list__box-head {
            display: none;
        }
        .personal-expenses-list__box-body {
            display: block;
            margin-bottom: 15px;
        }
        .personal-expenses-list__item-body {
            text-align: left;
        }
        .personal-expenses-list__item-body--repsonive {
            display: inline-block;
        }
        .personal-expenses-list__sort--input {
            display: block;
            width: 100%;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0px;
            }
        }
    }
</style>