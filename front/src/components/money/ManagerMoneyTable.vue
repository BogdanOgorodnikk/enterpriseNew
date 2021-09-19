<template>
    <Loader v-if="loader" />
    <div class="manager-table" v-else>
        <div class="container">
            <h2 class="manager-table__headline">Ім'я менеджера: <span class="manager-table__headline--span">{{manager[0].login}}</span></h2>
            <h3 class="manager-table__sort">Параметри сортування</h3>
            <form class="manager-table__sort-form">
                <input class="manager-table__sort-form--input input" type="date" placeholder="Початкова дата" v-model="startData">
                <input class="manager-table__sort-form--input input" type="date" placeholder="Кінцева дата" v-model="endData">
                <input class="manager-table__sort-form--input input" type="text" placeholder="Ім'я клієнта" v-model="filtrName">
            </form>

            <button class="create-check__button button" v-if="user.role_id == 1" @click.prevent="showCheckForm">Створити перевірку</button>
            <transition name="form-fade">
                <form class="create-check__form" v-if="showForm" @submit.prevent="createCheck">
                    <input type="date" class="create-check__form--input input" placeholder="Дата" v-model="data"
                        :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                    >
                    <input type="text" class="create-check__form--input input" placeholder="Сума форми 1" v-model="checkMoney"
                        :class="{invalid: ($v.checkMoney.$dirty && !$v.checkMoney.required)}"
                    >
                    <input type="submit" class="create-check__form--button button" value="Створити">
                </form>
            </transition>

            <div class="manager-table__sum">
                Сума: <span class="manager-table__sum--span">{{sumMoney.toFixed(1)}}</span>
            </div>
            <div class="manager-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="manager-table__item-head">
                    Дата
                </div>
                <div class="manager-table__item-head" v-if="user.role_id == 1">
                    Дата створення оплати
                </div>
                <div class="manager-table__item-head">
                  Коментар
                </div>
                <div class="manager-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="manager-table__item-head">
                    Операція
                </div>
                <div class="manager-table__item-head">
                    Сума форми 1
                </div>
                <div class="manager-table__item-head" v-if="user.role_id == 1">
                    Редагувати
                </div>
            </div>

            <div class="manager-table__box-body" v-for="managerMoney in filteredManagerMoney" :key="managerMoney.id"
                :class="{'check': managerMoney.product_name === 'Перевірка'}"
            >
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Дата: </span>{{managerMoney.data}}
                </div>
                <div class="manager-table__item-body" v-if="user.role_id == 1">
                    <span class="manager-table__item-body--responsive">Дата створення: </span>{{dateFormatForCreateItem(managerMoney.data_create)}}
                </div>
                <div class="manager-table__item-body" @click="showModalComments(managerMoney.id)">
                  <span class="manager-table__item-body--responsive">Коментар: </span>
                  <span v-if="managerMoney.comment" class="comment-is">Є коментар</span>
                </div>
                <div class="manager-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: managerMoney.client_id}}"><span class="manager-table__item-body--responsive">Ім'я клієнта: </span>{{managerMoney.name}}</router-link>
                </div>
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Операція: </span>{{managerMoney.product_name}}
                </div>
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Сума форми 1: </span>{{managerMoney.pay_cash}}
                </div>
                <div class="manager-table__item-body edit" v-if="user.role_id == 1" @click.prevent="showModalEdit(managerMoney.id, managerMoney.pay_cash)">
                    Редагувати
                </div>
            </div>
        </div>
        <ModalEditMoneyManager v-if="moneyEdit" 
            :moneyEdit = "moneyEdit"
            :id = "id"
            :pay_cash = "pay_cash"
            @CancelEdit="ChangeModalEdit"
        />

      <ModalComments v-if="showComments"
                     :showComments="showComments"
                     :id="id"
                     orderNumber=""
                     @CloseCommentsModal="ChangeCloseCommentsModal" />
    </div>
</template>

<script>
import ModalEditMoneyManager from '../modals/ModalEditMoneyManager'
import ModalComments from '../modals/ModalComments'
import Loader from '../app/Loader'
import axios from 'axios'
import {required} from 'vuelidate/lib/validators'
import {format} from "date-fns";

export default {
    name: "ManagerMoneyTable",
    data: () => ({
        managerMoneys: [],
        manager: [],
        id: '',
        pay_cash: '',
        startData: '',
        endData: '',
        filtrName: '',
        data: '',
        checkMoney: '',
        moneyEdit: false,
        loader: true,
        fix: false,
        showForm: false,
        showComments: false,
    }),
    validations: {
        data: {required},
        checkMoney: {required}
    },
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 255) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getManagerMoneys()
    },
    methods: {
      showModalComments(id) {
        this.showComments = !this.showComments
        this.id = id
      },

      ChangeCloseCommentsModal(data) {
        this.showComments = data
        this.getManagerMoneys()
      },

      dateFormatForCreateItem(date) {
        const hour = format(new Date(date), 'HH')

        const formatDate = format(new Date(date), `yyyy-MM-dd ${+hour + 3}:mm`)

        return formatDate;
      },
        async getManagerMoneys() {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/managermoney/${this.$route.params.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.managerMoneys = result.data.managerMoney.reverse()
            this.manager = result.data.manager
            this.loader = false
        },
        async createCheck() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                id: this.$route.params.id,
                data: formatDate,
                pay_cash: this.checkMoney,
            }
            try  {
                await this.$store.dispatch('createMoneyCheckManager', formData)
                this.checkMoney = ''
                this.getManagerMoneys()
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        showCheckForm() {
            this.showForm = !this.showForm
        },
        showModalEdit(id, pay_cash) {
           this.moneyEdit = !this.moneyEdit
           this.id = id
           this.pay_cash = pay_cash
        },
        ChangeModalEdit(data) {
            this.moneyEdit = data
            this.getManagerMoneys()
        },       
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredManagerMoney() {
            return this.managerMoneys.filter((money) => {
                if(this.startData != '' && this.endData != '') {
                    return money.data >= this.startData
                    && money.data <= this.endData
                    && money.name.toLowerCase().indexOf(this.filtrName.toLowerCase()) > -1
                } else if(this.endData != '') {
                    return money.data <= this.endData
                    && money.name.toLowerCase().indexOf(this.filtrName.toLowerCase()) > -1 
                } else {
                    return money.data >= this.startData
                    && money.name.toLowerCase().indexOf(this.filtrName.toLowerCase()) > -1 
                }
            })
        },
        sumMoney() {
            return this.filteredManagerMoney.reduce((acc, item) => {
                if(item.product_name === 'Перевірка') {
                    acc += 0;
                } else {
                    acc += item.pay_cash;
                }
                return acc
            }, 0);
        },
    },
    components: {
        ModalEditMoneyManager,
        ModalComments,
        Loader,
    }
}
</script>

<style lang="scss" scoped>
    .manager-table {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .manager-table__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .manager-table__headline--span {
        font-weight: 400;
    }
    .manager-table__sort {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
    }
    .manager-table__sort-form {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .manager-table__sort-form--input {
        margin-right: 10px;
        margin-top: 5px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .comment-is {
      text-align: center;
      color: #2c75e2;
    }
    .manager-table__sum {
        border: 1px solid #000;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
        margin-top: 15px;
    }
    .manager-table__sum--span {
        font-weight: 700;
    }
    .manager-table__box-head {
        display: flex;
        background: #ccc;
    }
    .manager-table__item-head {
        width: 100%;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        color: #000;
        padding: 5px;
        overflow: hidden;
    }
    .manager-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .manager-table__item-body {
        width: 100%;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        padding: 5px;
        overflow: hidden;
    }
    .manager-table__item--check {
        display: block;
        margin: 3px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .manager-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 600px) {
    .manager-table__box-head {
        display: none;
    }
    .manager-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .manager-table__item-body--responsive {
        display: inline-block;
    }
    .manager-table__sort-form--input {
        width: 100%;
    }
}

    .create-check {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .create-check__button {
        display: block;
        border: none;
        background: #00a814;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .create-check__form--input {
        margin-left: 5px;
        margin-top: 5px;
        padding-right: 20px;
        &:first-child {
            margin-left: 0px;
        }
        &:nth-child(9) {
            margin-left: 0px;
        }
    }
    .create-check__form--button {
        background: #00a814;
        border: none;
        display: block;
        margin-top: 10px;
    }
    .form-fade-enter-active {
        transition: all .3s ease;
        transform: translateY(-1px);
    }
    .form-fade-leave-active {
        transition: all .3s ease;
    }
    .form-fade-enter, .form-fade-leave-to {
        transform: translateY(5px);
        opacity: 0;
    }
@media screen and (max-width: 500px)  {
    .create-check__form--input {
        margin-left: 0px;
        width: 100%;
    }
}
</style>