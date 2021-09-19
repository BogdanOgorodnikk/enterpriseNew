<template>
    <Loader v-if="loader" />
    <div class="selers-table" v-else>
        <div class="container">
            <h2 class="seler-sort__headline">Параметри сортування</h2>
            <form class="seler-sort__form">
                <div class="seler-sort__form--data">
                    <p class="seler-sorm__for--info">За датою</p>
                    <input type="date" class="seler-sort__form--input input" placeholder="Початкова дата" v-model="startData">
                    <input type="date" class="seler-sort__form--input input" placeholder="Кінцева дата" v-model="endData">
                </div>

                <input type="text" v-if="user.role_id !== 5" class="seler-sort__form--input input" placeholder="За фірмою" v-model="filterFirm">
                <select v-if="user.role_id !== 5" class="create-order__form--select" v-model="filterFirm">
                  <option v-for="firm_name in firm_names" :key="firm_name.id" :value="firm_name.name">{{firm_name.name}}</option>
                </select>

                <input type="text" class="seler-sort__form--input input" placeholder="За областю" v-model="filterRegion">
                <select class="create-order__form--select" v-model="filterRegion">
                  <option v-for="region in regions" :key="region.id" :value="region.name">{{region.name}}</option>
                </select>

              <input type="text" class="seler-sort__form--input input" placeholder="За формою" v-model="filterNote">
              <input type="text" class="seler-sort__form--input input" placeholder="За районом" v-model="filterArea" v-if="user.role_id == 1">
                <input type="text" class="seler-sort__form--input input" placeholder="За містом" v-model="filterTown" v-if="user.role_id == 1">
                <input type="text" class="seler-sort__form--input input" placeholder="За клієнтом" v-model="filterClient">
                <input type="text" class="seler-sort__form--input input" placeholder="За назвою товару" v-model="filterProductName">
                <select class="create-order__form--select" v-model="filterProductName">
                  <option v-for="product_name in product_names" :key="product_name.id" :value="product_name.name">{{product_name.name}}</option>
                </select>
                <input type="text" v-if="user.role_id !== 5" class="seler-sort__form--input input" placeholder="За номером машини" v-model="filterCarNumber">
            </form>
            <div>
                <h2 class="seler-sort__headline">Вивести інформацію за певний період</h2>
                <p class="title-date">
                    Початкова дата: <input class="title-date-input input" type="date" v-model="startBackDate">
                </p>
                <p class="title-date">
                    Кінцева дата: <input class="title-date-input input" type="date" v-model="endBackDate">
                </p>
                <button class="button create-order__button" @click="getAllSelers(startBackDate, endBackDate)">Вивести інформацію</button>
            </div>
            <div class="selers-table__general">
                Сума тон: <span class="selers-table__general--span">{{sumMas.toFixed(3)}}</span>
            </div>
            <div class="selers-table__general" v-if="user.role_id == 1">
                Сума дельта готівки: <span class="selers-table__general--span">{{sumDeltaCash.toFixed(1)}}</span>
            </div>
            <div class="selers-table__general" v-if="user.role_id == 1">
                Сума дельта безготівки: <span class="selers-table__general--span">{{sumDeltaCashless.toFixed(1)}}</span>
            </div>
            <div class="selers-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="selers-table__item-head">
                    №
                </div>
                <div class="selers-table__item-head" v-if="user.role_id !== 5">
                    № Замовлення
                </div>
                <div class="selers-table__item-head">
                  Форма
                </div>
                <div class="selers-table__item-head">
                  Коментар
                </div>
                <div class="selers-table__item-head" v-if="user.role_id !== 5">
                    Номер машини
                </div>
                <div class="selers-table__item-head" v-if="user.role_id !== 5">
                    Фірма
                </div>
                <div class="selers-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="selers-table__item-head">
                    Дата
                </div>
                <div class="selers-table__item-head">
                    Назва товару
                </div>
                <div class="selers-table__item-head" v-if="user.role_id !== 5">
                    Оптова ціна
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Ціна продажу
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 4">
                    Ціна пр бзг
                </div>
                <div class="selers-table__item-head">
                    Кількість
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Сума продажу
                </div>
                <div class="selers-table__item-head">
                    Доставка (самовивіз)
                </div>
                <div class="selers-table__item-head">
                    Доставка безготівкою
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 5">
                    Загальна сума
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта бзг
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 4">
                    Дельта тн бзг
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта Ф1
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта тн Ф1
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                  Дельта
                </div>
                <div class="selers-table__item-head">
                    Область
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Створив
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Ред
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="selers-table__box-body" v-for="(allSeler, index) in filteredAllSelers" :key="allSeler.id" :class="{'not-cash': allSeler.price_cash == 0 && allSeler.price_cashless == 0, 'not-nal': allSeler.price_cashless > 0 && allSeler.price_cash == 0, 'not-cashless': allSeler.price_cash > 0 && allSeler.price_cashless == 0, 'agree-cash': allSeler.price_cash > 0 && allSeler.price_cashless > 0, default: allSeler.firm == ''}">
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">№: </span>{{index+1}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id !== 5">
                    <span class="selers-table__item-body--responsive">Номер замовлення: </span>{{allSeler.order_number}}
                </div>
                <div class="selers-table__item-body">
                  <span class="selers-table__item-body--responsive">Форма: </span>{{allSeler.note}}
                </div>
                <div class="selers-table__item-body" @click="showModalComments(allSeler.id, allSeler.order_number)">
                  <span class="selers-table__item-body--responsive">Коментар: </span>
                  <span v-if="allSeler.comment" class="comment-is">Є коментар</span>
                </div>
                <div class="selers-table__item-body" v-if="user.role_id !== 5">
                    <span class="selers-table__item-body--responsive">Номер машини: </span>{{allSeler.car_number}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id !== 5">
                    <span class="selers-table__item-body--responsive">Фірма: </span>{{allSeler.firm}}
                </div>
                <div class="selers-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: allSeler.client_id}}"><span class="selers-table__item-body--responsive">Ім'я клієнта: </span>{{allSeler.name}}</router-link>
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Дата: </span>{{allSeler.data}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Назва товару: </span>{{allSeler.product_name}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id !== 5">
                    <span class="selers-table__item-body--responsive">Оптова ціна: </span>{{allSeler.opt_price}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="selers-table__item-body--responsive">Ціна продажу форма 1: </span>{{allSeler.price_cash}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 4">
                    <span class="selers-table__item-body--responsive">Ціна продажу безготівкою: </span>{{allSeler.price_cashless}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Кількість: </span>{{allSeler.count}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="selers-table__item-body--responsive">Сума продажу: </span>{{Math.round(allSeler.sumseller)}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Доставка (самовивіз): </span>{{allSeler.delivery_cash}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Доставка безготівкою: </span>{{allSeler.delivery_cashless}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 5">
                    <span class="selers-table__item-body--responsive">Загальна сума: </span>{{Math.round(allSeler.general_sum)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта безготівки: </span>{{Math.round(allSeler.delta_cashless)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 4">
                    <span class="selers-table__item-body--responsive">Дельта тонни безготівки: </span>{{Math.round(allSeler.delta_mas_cashless)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта форми 1: </span>{{Math.round(allSeler.delta_cash)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта тонни форми 1: </span>{{Math.round(allSeler.delta_mas_cash)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                  <span class="selers-table__item-body--responsive">Дельта: </span>{{Math.round(allSeler.delta_cash) + Math.round(allSeler.delta_cashless)}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Область: </span>{{allSeler.region}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Створив: </span>{{allSeler.login}}
                </div>
                <div class="selers-table__item-body edit" v-if="user.role_id == 1" @click.prevent="showModalEdit(allSeler.id, allSeler.order_number, allSeler.note, allSeler.car_number, allSeler.firm, allSeler.region, allSeler.data, allSeler.product_name, allSeler.count, allSeler.delivery_cash, allSeler.delivery_cashless, allSeler.price_cash, allSeler.opt_price, allSeler.price_cashless, allSeler.client_id)">
                    Ред
                </div>
                <div class="selers-table__item-body delete" v-if="user.role_id == 1" @click.prevent="deleteOrders(allSeler.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditOrder v-if="showEdit" 
            :showEdit = "showEdit"
            :id = "id"
            :order_number = "order_number"
                        :note="note"
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

      <ModalComments v-if="showComments"
                     :showComments="showComments"
                     :id="id"
                     :orderNumber="order_number"
                     @CloseCommentsModal="ChangeCloseCommentsModal" />
    </div>
</template>

<script>
import Loader from '../app/Loader'
import ModalEditOrder from '../modals/ModalEditOrder'
import ModalComments from '../modals/ModalComments'
import axios from 'axios'

export default {
    name: "AllSelersTable",
    data: () => ({
        allSelers: [],
        startData: '',
        endData: '',
        filterFirm: '',
        filterRegion: '',
        filterArea: '',
        filterTown: '',
        filterClient: '',
        filterProductName: '',
        filterNote: '',
        filterCarNumber: '',
        showEdit: false,
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
        loader: true,
        fix: false,
        showComments: false,
        startBackDate: '',
        endBackDate: '',
        firm_names: [],
        regions: [],
        product_names: [],
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 355) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getAllSelers()
        this.getAllSelersInfo()
    },
    methods: {
        async getAllSelersInfo() {
          const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allselersinfo`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          this.firm_names = result.data.allFirms.reverse()
          this.regions = result.data.allRegions.reverse()
          this.product_names = result.data.allProductNames.reverse()
        },

        async getAllSelers(start, end) {
            const date = new Date();
            const currentDay = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
            const lastMonthDay = date.getFullYear() + '-' + ('0' + (date.getMonth())).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allselers?start=${start || lastMonthDay}&end=${end || currentDay}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.allSelers = result.data.allSelers.reverse()
            this.loader = false
        },
        async deleteOrders(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/orders/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getAllSelers()
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

        showModalComments(id, orderNumber) {
          this.showComments = !this.showComments
          this.id = id
          this.order_number = orderNumber
        },

        ChangeModalEdit(data) {
            this.showEdit = data
            this.getAllSelers()
        },

      ChangeCloseCommentsModal(data) {
        this.showComments = data
        this.getAllSelers()
      }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredAllSelers() {
            return this.allSelers.filter((allSeller) => {
                if(this.startData != '' && this.endData != '' && this.$store.state.auth.newuser.user.role_id == 1) {
                    return allSeller.data >= this.startData
                    && allSeller.data <= this.endData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1
                    && allSeller.area.toLowerCase().indexOf(this.filterArea.toLowerCase()) > -1
                    && allSeller.town_name.toLowerCase().indexOf(this.filterTown.toLowerCase()) > -1
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                    && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                } else if(this.endData != '' && this.$store.state.auth.newuser.user.role_id == 1) {
                    return allSeller.data <= this.endData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.area.toLowerCase().indexOf(this.filterArea.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                        && allSeller.town_name.toLowerCase().indexOf(this.filterTown.toLowerCase()) > -1
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                }
                else if(this.$store.state.auth.newuser.user.role_id == 1) {
                    return allSeller.data >= this.startData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.area.toLowerCase().indexOf(this.filterArea.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.town_name.toLowerCase().indexOf(this.filterTown.toLowerCase()) > -1
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                }
                else if(this.startData != '' && this.endData != '' && this.$store.state.auth.newuser.user.role_id == 5) {
                    return allSeller.data >= this.startData
                    && allSeller.data <= this.endData
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                } else if(this.endData != '' && this.$store.state.auth.newuser.user.role_id == 5) {
                    return allSeller.data <= this.endData
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                } else if(this.$store.state.auth.newuser.user.role_id == 5) {
                    return allSeller.data >= this.startData
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                } else if(this.startData != '' && this.endData != '') {
                    return allSeller.data >= this.startData
                    && allSeller.data <= this.endData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                } else if(this.endData != '') {
                    return allSeller.data <= this.endData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                } else {
                    return allSeller.data >= this.startData
                    && allSeller.firm.toLowerCase().indexOf(this.filterFirm.toLowerCase()) > -1 
                    && allSeller.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                    && allSeller.name.toLowerCase().indexOf(this.filterClient.toLowerCase()) > -1
                        && allSeller.note.toLowerCase().indexOf(this.filterNote.toLowerCase()) > -1
                    && allSeller.product_name.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1 
                    && allSeller.car_number.toLowerCase().indexOf(this.filterCarNumber.toLowerCase()) > -1
                }
            })
        },
        sumMas() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.count, 0);
        },
        sumDeltaCash() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.delta_cash, 0);
        },
        sumDeltaCashless() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.delta_cashless, 0);
        }
    },
    components: {
        Loader,
        ModalEditOrder,
        ModalComments
    }
}
</script>

<style lang="scss" scoped>
    .selers-table {
        margin: 30px 0px;
    }
    .seler-sort__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .seler-sort__form {
        margin-bottom: 30px;
    }
    .seler-sort__form--data {
        margin-top: 10px;
    }
    .seler-sorm__for--info {
        margin-bottom: 5px;
    }
    .seler-sort__form--input {
        margin-right: 10px;
        margin-bottom: 10px;
        padding-right: 20px;
    }
    .seler-sort__form--button {
        display: block;
        border: none;
        background: #00a814;
    }
    .selers-table__general {
        padding: 5px;
        width: 100%;
        border: 1px solid #000;
        color: #000;
        font-size: 16px;
        font-weight: 400;
    }
    .selers-table__general--span {
        font-weight: 700;
    }
    .selers-table__box-head {
        display: flex;
        background: #ccc;
    }
    .selers-table__item-head {
        padding: 5px;
        font-size: 15px;
        font-weight: 700;
        border: 1px solid #000;
        color: #000;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }
    .selers-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.1);
        }
    }
    .selers-table__item-body {
        padding: 5px;
        font-size: 15px;
        font-weight: 400;
        border: 1px solid #000;
        width: 100%;
        overflow: hidden;
    }
    .selers-table__item-body--check {
        display: block;
        margin: 2px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .selers-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
    .title-date {
        font-size: 16px;
        font-weight: 700;
        color: #000;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .title-date-input {
        margin-left: 15px;
    }
    .create-order__button {
        display: block;
        border: none;
        background: #00a814;
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .create-order__form--select {
      margin-left: -31px;
      margin-right: 10px;
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
      height: 29px;
    }

    .comment-is {
      text-align: center;
      color: #2c75e2;
    }

@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 900px) {
    .selers-table__box-head {
        display: none;
    }
    .selers-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .selers-table__item-body--responsive {
        display: inline-block;
    }
}
@media screen and (max-width: 500px) {
    .seler-sort__form--input {
        width: 100%;
    }
    .create-order__form--select {
      margin-right: 0;
      margin-left: -31px;
      height: 28px;
    }
    .seler-sorm__for--info {
        display: none;
    }
}
</style>