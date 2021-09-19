<template>
    <Loader v-if="loader" />
    <div class="cash-table" v-else>
        <div class="container">
            <h3 class="money__sort">Параметри сортування</h3>
            <form class="money__sort-form">
                <input class="money__sort-form--input input" type="date" placeholder="Початкова дата" v-model="startData">
                <input class="money__sort-form--input input" type="date" placeholder="Кінцева дата" v-model="endData">
                <input v-if="user.role_id !== 5" class="money__sort-form--input input" type="text" placeholder="Ім'я працівника" v-model="filtrCreaterName">
                <input class="money__sort-form--input input" type="text" placeholder="Ім'я клієнта" v-model="filtrClientName">
            </form>

            <div>
              <h2 class="seler-sort__headline">Вивести інформацію за певний період</h2>
              <p class="title-date">
                Початкова дата: <input class="title-date-input input" type="date" v-model="startBackDate">
              </p>
              <p class="title-date">
                Кінцева дата: <input class="title-date-input input" type="date" v-model="endBackDate">
              </p>
              <button class="button create-order__button" @click="getCashsless(startBackDate, endBackDate)">Вивести інформацію</button>
            </div>

            <div class="cash-table__sum">
                Сума: <span class="cash-table__sum--span">{{sumMoney.toFixed(1)}}</span>
            </div>
            <div class="cash-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="cash-table__item-head">
                    №
                </div>
                <div class="cash-table__item-head">
                    Дата
                </div>
                <div class="cash-table__item-head" v-if="user.role_id == 1">
                    Дата створення
                </div>
                <div class="cash-table__item-head">
                  Коментар
                </div>
                <div class="cash-table__item-head" v-if="user.role_id !== 5">
                    Ім'я працівника
                </div>
                <div class="cash-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="cash-table__item-head">
                    Дія
                </div>
                <div class="cash-table__item-head">
                    Сума
                </div>
            </div>
            <div class="cash-table__box-body" v-for="(cashsless, index) in filteredCashless" :key="cashsless.id">
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Дата: </span>{{cashsless.data}}
                </div>
                <div class="cash-table__item-body" v-if="user.role_id == 1">
                    <span class="cash-table__item-body--responsive">Дата створення: </span>{{dateFormatForCreateItem(cashsless.data_create)}}
                </div>
                <div class="cash-table__item-body" @click="showModalComments(cashsless.id)">
                  <span class="cash-table__item-body--responsive">Коментар: </span>
                  <span v-if="cashsless.comment" class="comment-is">Є коментар</span>
                </div>
                <div class="cash-table__item-body" v-if="user.role_id !== 5">
                    <span class="cash-table__item-body--responsive">Ім'я працівника: </span>{{cashsless.login}}
                </div>
                <div class="cash-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: cashsless.client_id}}"><span class="cash-table__item-body--responsive">Ім'я клієнта: </span>{{cashsless.name}}</router-link>
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Дія: </span>{{cashsless.product_name}}
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Сума: </span>{{cashsless.pay_cashless}}
                </div>
            </div>
        </div>
      <ModalComments v-if="showComments"
                     :showComments="showComments"
                     :id="id"
                     orderNumber=""
                     @CloseCommentsModal="ChangeCloseCommentsModal" />
    </div>
</template>

<script>
import Loader from '../app/Loader'
import ModalComments from '../modals/ModalComments'
import axios from 'axios'
import {format} from "date-fns";

export default {
    name: "CashTable",
    data: () => ({
        cashsless: [],
        startData: '',
        endData: '',
        filtrCreaterName: '',
        filtrClientName: '',
        startBackDate: '',
        endBackDate: '',
        id: '',
        loader: true,
        fix: false,
        showComments: false,
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 255) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getCashsless()
    },
    methods: {
      dateFormatForCreateItem(date) {
        const hour = format(new Date(date), 'HH')

        const formatDate = format(new Date(date), `yyyy-MM-dd ${+hour + 3}:mm`)

        return formatDate;
      },

        async getCashsless(start, end) {
          const date = new Date();
          const currentDay = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
          const lastMonthDay = date.getFullYear() + '-' + ('0' + (date.getMonth())).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

          const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/cashlessmoney?start=${start || lastMonthDay}&end=${end || currentDay}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.cashsless = result.data.cashlessmoneys.reverse()
            this.loader = false
        },
      showModalComments(id) {
        this.showComments = !this.showComments
        this.id = id
      },

      ChangeCloseCommentsModal(data) {
        this.showComments = data
        this.getCashsless()
      },
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredCashless() {
            return this.cashsless.filter((money) => {
                if(this.startData != '' && this.endData != '') {
                    return money.data >= this.startData
                    && money.data <= this.endData
                    && money.login.toLowerCase().indexOf(this.filtrCreaterName.toLowerCase()) > -1
                    && money.name.toLowerCase().indexOf(this.filtrClientName.toLowerCase()) > -1
                } else if(this.endData != '') {
                    return money.data <= this.endData
                    && money.login.toLowerCase().indexOf(this.filtrCreaterName.toLowerCase()) > -1
                    && money.name.toLowerCase().indexOf(this.filtrClientName.toLowerCase()) > -1
                } else {
                    return money.data >= this.startData
                    && money.login.toLowerCase().indexOf(this.filtrCreaterName.toLowerCase()) > -1
                    && money.name.toLowerCase().indexOf(this.filtrClientName.toLowerCase()) > -1
                }
            })
        },
        sumMoney() {
            return this.filteredCashless.reduce((acc, item) => acc + item.pay_cashless, 0);
        },
    },
    components: {
        Loader,
        ModalComments
    }
}
</script>

<style lang="scss" scoped>
    .cash-table {
        margin: 30px 0px;
    }
    .money__sort {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
    }
    .money__sort-form {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .money__sort-form--input {
        margin-right: 10px;
        margin-top: 5px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .cash-table__sum {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        width: 100%;
    }
    .cash-table__sum--span {
        font-weight: 700;
    }
    .comment-is {
      text-align: center;
      color: #2c75e2;
    }
    .cash-table__box-head {
        display: flex;
        background: #ccc;
    }
    .cash-table__item-head {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 700;
        color: #000;
        width: 100%;
        text-align: center;
    }
    .cash-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .cash-table__item-body {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
    }
    .cash-table__item-body--check {
        display: block;
        margin: 3px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .cash-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
    .seler-sort__headline {
      color: #000;
      font-size: 20px;
      font-weight: 700;
    }
    .title-date {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .create-order__button {
      display: block;
      border: none;
      background: #00a814;
      margin-top: 15px;
      margin-bottom: 30px;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 600px) {
    .cash-table__box-head {
        display: none;
    }
    .cash-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .cash-table__item-body--responsive {
        display: inline-block;
    }
}
</style>