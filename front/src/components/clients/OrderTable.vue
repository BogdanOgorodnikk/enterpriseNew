<template>
    <Loader v-if="loader" />
    <div class="order-table" v-else>
        <div class="container">
            <router-link v-if="user.role_id == 1 || user.role_id == 5" class="order-table__pith-link" :to="{name: 'Client-pith', params: {id: this.$route.params.id}}">Перейти до залишків клієнта</router-link>
            <button class="card-client button" @click.prevent="showCard">Карточка клієнта</button>

            <h3 class="sort-headline">Параметри сортування</h3>
            <form class="sort-form">
                <input class="sort-form-input input" type="date" placeholder="Початкова дата" v-model="startData">
                <input class="sort-form-input input" type="date" placeholder="Кінцева дата" v-model="endData">
              <input class="sort-form-input input" type="text" placeholder="Назва товара/Дія" v-model="sortProduct">
              <div class="sort-form-block">
                <input class="sort-form-input input" type="text" placeholder="За формою" v-model="sortNotes">
                <select class="sort-select__form" v-model="sortNotes">
                  <option v-for="note_name in notes_name" :key="note_name.id" :value="note_name.name">{{note_name.name}}</option>
                </select>
              </div>
            </form>

            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                Загальний борг: <span class="order-table__general-info--span">{{Math.round(sumDebt || 0)}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                Сума залишків: <span class="order-table__general-info--span">{{Math.round(sumPith[0].sumPith)}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                Сума проданого товару: <span class="order-table__general-info--span">{{Math.round(sumDebt - sumPith[0].sumPith)}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                Сума проданих тон: <span class="order-table__general-info--span">{{(sumMas[0].sumMas || 0).toFixed(3)}}</span>
            </div>
            <div class="order-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    №
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    № Замовлення
                </div>
                <div class="order-table__item-head">
                  Форма
                </div>
              <div class="order-table__item-head">
                Коментар
              </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Фірма
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Дата
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дата створення
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Номер машини
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Назва товару
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Кількість
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Оптова
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Ціна продажу
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 4">
                    Ціна пр бзг
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Сума продажу
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Доставка (самовивіз)
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 4 || user.role_id == 5">
                    Доставка безготівка
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 5">
                    Загальна сума
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Оплата форма 1
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Оплата безготівка
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта бзг
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта тн бзг
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта Ф1
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта тн Ф1
                </div>
                <div class="order-table__item-head">
                    Область
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Створив
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4">
                    <span v-if="user.role_id == 1">Редагувати</span>
                    <span v-if="user.role_id == 3 || user.role_id == 4">Внести ціну</span>
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="order-table__box-body" v-for="(order, index) in filteredProducts" :key="order.id" :class="{'not-cash': order.price_cash == 0 && order.price_cashless == 0, 'not-nal': order.price_cashless > 0 && order.price_cash == 0, 'not-cashless': order.price_cash > 0 && order.price_cashless == 0, 'agree-cash': order.price_cash > 0 && order.price_cashless > 0, check: order.product_name == 'Перевірка', default: order.firm == ''}">
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Номер замовлення: </span>{{order.order_number}}
                </div>
                <div class="order-table__item-body">
                  <span class="order-table__box-body--responsive">Форма: </span>{{order.note}}
                </div>
              <div class="order-table__item-body" @click="showModalComments(order.id, order.order_number)">
                <span class="order-table__box-body--responsive">Коментар: </span>
                <span v-if="order.comment" class="comment-is">Є коментар</span>
              </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Назва фірми: </span>{{order.firm}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Дата: </span>{{order.data}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дата створення: </span>{{order.data_create}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Номер машини: </span>{{order.car_number}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Назва продукта: </span>{{order.product_name}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Кількість: </span>{{order.count}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Оптова ціна: </span>{{order.opt_price}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Ціна продажу: </span>{{order.price_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Ціна продажу безготівкою: </span>{{order.price_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Сума продажу: </span>{{Math.round(order.sumseller)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Доставка(самовивіз): </span>{{order.delivery_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Доставка по безготівкі: </span>{{order.delivery_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Загальна сума: </span>{{Math.round(order.general_sum)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Оплата форма 1: </span>{{order.pay_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Оплата безготівка: </span>{{order.pay_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта по безготівкі: </span>{{Math.round(order.delta_cashless)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта тонни безготівки: </span>{{Math.round(order.delta_mas_cashless)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта по формі 1: </span>{{Math.round(order.delta_cash)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта тонни форми 1: </span>{{Math.round(order.delta_mas_cash)}}
                </div>
                <div class="order-table__item-body">
                    <span class="order-table__box-body--responsive">Область: </span>{{order.region}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Створив: </span>{{order.login}}
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 1">
                   <span v-if="order.firm != ''" @click.prevent="showModalEdit(order.id, order.order_number, order.note, order.car_number, order.firm, order.region, order.data, order.product_name, order.count, order.delivery_cash, order.delivery_cashless, order.price_cash, order.opt_price, order.price_cashless, order.client_id)">Редагувати</span>
                   <span v-else @click.prevent="showModalPayMoney(order.id, order.data, order.product_name, order.pay_cash, order.pay_cashless)">Редагувати</span>
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 3">
                   <span v-if="order.price_cash == 0 && order.firm != ''" @click.prevent="showModalPayCash(order.id)">Внести ціну</span>
                   <span v-else-if="order.firm == ''"></span>
                   <span v-else>Ціна внесена</span>
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 4">
                   <span v-if="order.price_cashless == 0 && order.firm != ''" @click.prevent="showModalPayCashless(order.id)">Внести ціну</span>
                   <span v-else-if="order.firm == ''"></span>
                   <span v-else>Ціна внесена</span>
                </div>
                <div class="order-table__item-body delete" v-if="user.role_id == 1" @click.prevent="deleteOrders(order.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditOrder v-if="showEdit"
            :showEdit = "showEdit"
            :id = "id"
            :order_number = "order_number" :note = "note"
            :car_number = "car_number"
            :firm = "firm"
            :region = "region"
            :data = "data"
            :product_name = "product_name"
            :count = "count"
            :delivery_cash = "delivery_cash"
            :delivery_cashless = "delivery_cashless"
            :price_cash = "price_cash"
            :opt_price = "opt_price"
            :price_cashless = "price_cashless"
            :client_id = "client_id"
            @CancelEdit="ChangeModalEdit"
        />
        <ModalEditCash v-if="showPayCash"
            :showPayCash = "showPayCash"
            :id = "id"
            @CancelEditCash="ChangeModalPayCash"
        />
        <ModalEditCashless v-if="showPayCashless"
            :showPayCashless = "showPayCashless"
            :id = "id"
            @CancelEditCashless="ChangeModalPayCashless"
        />
        <ModalEditPayMoney v-if="showPayMoney"
            :showPayMoney = "showPayMoney"
            :id = "id"
            :data = "data"
            :product_name = "product_name"
            :pay_cash = "pay_cash"
            :pay_cashless = "pay_cashless"
            @CancelEditPayMoney="ChangeModalPayMoney"
        />
        <ModalComments v-if="showComments"
                       :showComments="showComments"
                       :id="id"
                       :orderNumber="order_number"
                       @CloseCommentsModal="ChangeCloseCommentsModal" />

      <ModalCardClient v-if="showModalCard"
                       :showModalCard = "showModalCard"
                       @CancelCard="ChangeModalClientCard"
                       :name = "clientName"
                       :phone = "clientPhone"
                       :reserveName = "clientReserveName"
                       :reservePhone = "clientReservePhone"
                       :shopName = "clientShopName"
                       :shopStreet = "clientShopStreet"
      />
    </div>
</template>

<script>
import ModalEditOrder from '../modals/ModalEditOrder'
import ModalEditCash from '../modals/ModalEditCash'
import ModalEditCashless from '../modals/ModalEditCashless'
import ModalEditPayMoney from '../modals/ModalEditPayMoney'
import ModalComments from '../modals/ModalComments'
import ModalCardClient from '../modals/ModalCardClient'
import Loader from '../app/Loader'
import axios from 'axios'
import {busGetOrders} from '../../main'

export default {
    name: "OrderTable",
    data: () => ({
        id: '',
        order_number: '',
      note: '',
        car_number: '',
        firm: '',
        region: '',
        data: '',
        product_name: '',
        count: '',
        delivery_cash: '',
        delivery_cashless: '',
        price_cash: '',
        opt_price: '',
        price_cashless: '',
        client_id: '',
        startData: '',
        endData: '',
        sortProduct: '',
        sortNotes: '',
        clientName: '',
        clientPhone: '',
        clientReserveName: '',
        clientReservePhone: '',
        clientShopName: '',
        clientShopStreet: '',
        orders: [],
        client: [],
        town: [],
        sumMas: [],
        sumPith: [],
        notes_name: [],
        showEdit: false,
        showPayCash: false,
        showPayCashless: false,
        showPayMoney: false,
        showComments: false,
        showModalCard: false,
        fix: false,
        loader: true
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 355) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getOrders()
        this.getSumInfo()
        this.getNotesNames()
        this.getClientsInfo()
        busGetOrders.$on('getNewOrders', this.getOrders)
        busGetOrders.$on('getSumMas', this.getSumInfo)
        busGetOrders.$on('getNewPayment', this.getOrders)
        busGetOrders.$on('getNewStats', this.getSumInfo)
        busGetOrders.$on('getNewCheck', this.getOrders)
    },
    methods: {
        async getClientsInfo() {
          try {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/clientinfo/${this.$route.params.id}`,{
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })

            this.clientName = result.data.client[0].name;
            this.clientPhone = result.data.client[0].phone;
            this.clientReserveName = result.data.client[0].reserve_name;
            this.clientReservePhone = result.data.client[0].reserve_phone;
            this.clientShopName = result.data.client[0].shop_name;
            this.clientShopStreet = result.data.client[0].shop_street;

          } catch(e) {
            alert('Відбулася помилка')
          }
        },

        async getNotesNames() {
          try {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allnote`,{
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.notes_name = result.data


          } catch(e) {
            alert('Відбулася помилка')
          }
        },

        async getOrders() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/orders/${this.$route.params.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.orders = result.data.order.reverse()
                this.client = result.data.client
                this.town = result.data.town
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async getSumInfo() {
            try {
                if(this.$store.state.auth.newuser.user.role_id == 1 || this.$store.state.auth.newuser.user.role_id == 3 || this.$store.state.auth.newuser.user.role_id == 5) {
                    const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/suminfo/${this.$route.params.id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.sumMas = result.data.sumMas
                    this.sumPith = result.data.sumPith
                } else {
                    return false
                }
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async deleteOrders(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/orders/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getOrders()
                    this.getSumInfo()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showModalEdit(id, order_number, note, car_number, firm, region, data, product_name, count, delivery_cash, delivery_cashless, price_cash, opt_price, price_cashless, client_id) {
            this.showEdit = !this.showEdit
            this.id = id
            this.order_number = order_number,
                this.note = note,
            this.car_number = car_number,
            this.firm = firm,
            this.region = region,
            this.data = data,
            this.product_name = product_name,
            this.count = count,
            this.delivery_cash = delivery_cash,
            this.delivery_cashless = delivery_cashless,
            this.price_cash = price_cash,
            this.opt_price = opt_price,
            this.price_cashless = price_cashless,
            this.client_id = client_id
        },
        showModalPayCash(id) {
            this.showPayCash = !this.showPayCash
            this.id = id
        },
        showModalPayCashless(id) {
            this.showPayCashless = !this.showPayCashless
            this.id = id
        },
        showModalPayMoney(id, data, product_name, pay_cash, pay_cashless) {
            this.showPayMoney = !this.showPayMoney
            this.id = id
            this.data = data
            this.product_name = product_name
            this.pay_cash = pay_cash
            this.pay_cashless = pay_cashless
        },
        showModalComments(id, orderNumber) {
          this.showComments = !this.showComments
          this.id = id
          this.order_number = orderNumber
        },
        showCard() {
          this.showModalCard = !this.showModalCard
        },
        ChangeModalEdit(data) {
            this.showEdit = data
            this.getOrders()
            this.getSumInfo()
        },
        ChangeModalPayCash(data) {
            this.showPayCash = data
            this.getOrders()
        },
        ChangeModalPayCashless(data) {
            this.showPayCashless = data
            this.getOrders()
        },
        ChangeModalPayMoney(data) {
            this.showPayMoney = data
            this.getOrders()
            this.getSumInfo()
        },
      ChangeCloseCommentsModal(data) {
          this.showComments = data
          this.getOrders()
      },
      ChangeModalClientCard(data) {
          this.showModalCard = data;
      }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredProducts() {
            return this.orders.filter((product) => {
                if(this.startData != '' && this.endData != '') {
                    return product.data >= this.startData
                    && product.data <= this.endData
                    && product.product_name.toLowerCase().indexOf(this.sortProduct.toLowerCase()) > -1
                    && product.note.toLowerCase().indexOf(this.sortNotes.toLowerCase()) > -1

                } else if(this.endData != '') {
                    return product.data <= this.endData
                    && product.product_name.toLowerCase().indexOf(this.sortProduct.toLowerCase()) > -1
                    && product.note.toLowerCase().indexOf(this.sortNotes.toLowerCase()) > -1
                } else {
                    return product.data >= this.startData
                    && product.product_name.toLowerCase().indexOf(this.sortProduct.toLowerCase()) > -1
                    && product.note.toLowerCase().indexOf(this.sortNotes.toLowerCase()) > -1
                }
            })
        },
        sumDebt() {
            return this.filteredProducts.reduce((acc, item) => {

                if(item.product_name === 'Перевірка') {
                    acc += 0;
                } else {
                    acc += item.general_sum - item.pay_cash - item.pay_cashless;
                }
                return acc
            }, 0);
        },
    },
    components: {
        ModalEditOrder,
        ModalEditCash,
        ModalEditCashless,
        ModalEditPayMoney,
        ModalComments,
        ModalCardClient,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .sort-headline {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
    }
    .sort-form {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .sort-form-input {
        margin-right: 10px;
        margin-top: 5px;
        &:last-child {
            margin-right: 0px;
        }
    }

    .order-table {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .order-table__pith-link {
        display: block;
        padding: 5px;
        background: #1dabb8;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        max-width: 230px;
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 15px;
        &:hover {
            color: #000;
        }
    }
    .order-table__general-info {
        border: 1px solid #000;
        padding: 2px;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        &:first-child {
            margin-top: 15px;
        }
    }
    .order-table__general-info--span {
        font-weight: 700;
    }
    .order-table__box-head {
        display: flex;
        background: #ccc;
    }
    .order-table__item-head {
        border: 1px solid #000;
        font-size: 15px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 400px;
        text-align: center;
        padding: 5px 0px;
    }
    .order-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .order-table__item-body {
        border: 1px solid #000;
        font-size: 15px;
        font-weight: 400;
        overflow: hidden;
        width: 400px;
        padding: 5px 0px;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .order-table__box-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }

    .sort-form-block {
      display: inline-block;
      position: relative;
    }

    .sort-select__form {
      border: 1px solid #000;
      border-radius: 4px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-bottom: 0px;
      border-top: 0px;
      border-right: 0px;
      color: #000;
      font-size: 16px;
      width: 20px;
      font-weight: 400;
      height: 28px;
      position: absolute;
      top: 6px;
      right: 11px;
    }

    .comment-is {
      text-align: center;
      color: #2c75e2;
    }

    .card-client {
      background: #1dabb8;
      border: 0;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 960px) {
    .order-table__box-head {
        display: none;
    }
    .order-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .order-table__item-body {
        width: 100%;
    }
    .order-table__box-body--responsive {
        display: inline-block;
    }
}
</style>