<template>
    <div class="create-order">
        <div class="container">
            <h2 class="create-order__headline">Ім'я клієнта: <span class="create-order__headline--span">{{client[0].name}}</span></h2>
            <router-link class="create-order__back" :to="{name: 'Town-clients', params: {id: town[0].id}}">Повернутися назад до міста {{town[0].name}}</router-link>
            <div v-if="user.role_id == 1 || user.role_id == 2">
                <button class="create-order__button button" @click.prevent="showOrderForm">Створити замовлення </button>
                <transition name="form-fade">
                    <form class="create-order__form" v-if="showForm" @submit.prevent="createOrder">
                        <input type="text" class="create-order__form--input input" placeholder="№ Замовлення" v-model="order_number"
                            :class="{invalid: ($v.order_number.$dirty && !$v.order_number.required)}"
                        >
                        <input type="text" class="create-order__form--input input" placeholder="Номер машини" v-model="car_number"
                            :class="{invalid: ($v.car_number.$dirty && !$v.car_number.required)}"
                        >
                        <input type="text" class="create-order__form--input input" placeholder="Форма" v-model="note">
                        <select class="create-order__form--select" v-model="note">
                          <option v-for="note_name in note_names" :key="note_name.id" :value="note_name.name">{{note_name.name}}</option>
                        </select>
                        <input type="text" class="create-order__form--input input" placeholder="Назва фірми" v-model="firm"
                            :class="{invalid: ($v.firm.$dirty && !$v.firm.required)}"
                        >
                        <select class="create-order__form--select" v-model="firm">
                            <option v-for="firm_name in firm_names" :key="firm_name.id" :value="firm_name.name">{{firm_name.name}}</option>
                        </select>
                        <input type="text" class="create-order__form--input input" placeholder="Область" v-model="region"
                            :class="{invalid: ($v.region.$dirty && !$v.region.required)}"
                        >
                        <select class="create-order__form--select" v-model="region">
                            <option v-for="region in regions" :key="region.id" :value="region.name">{{region.name}}</option>
                        </select>
                        <input type="date" class="create-order__form--input input" placeholder="Дата" v-model="data"
                            :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                        >
                        <input type="text" class="create-order__form--input input" placeholder="Назва товару" v-model="product_name"
                            :class="{invalid: ($v.product_name.$dirty && !$v.product_name.required)}"
                        >
                        <select class="create-order__form--select" v-model="product_name">
                            <option v-for="product_name in product_names" :key="product_name.id" :value="product_name.name">{{product_name.name}}</option>
                        </select>
                        <input type="text" class="create-order__form--input input" placeholder="Оптова ціна" v-model="opt_price"
                            :class="{invalid: ($v.opt_price.$dirty && !$v.opt_price.required)}"
                        >
                        <select class="create-order__form--select" v-model="opt_price">
                            <option v-for="opt_price in sortOptPrice" :key="opt_price.id" :value="opt_price.number">{{opt_price.firm_name}} {{opt_price.number}}</option>
                        </select>
                        <input type="text" class="create-order__form--input input" placeholder="Кількість" v-model="count"
                            :class="{invalid: ($v.count.$dirty && !$v.count.required)}"
                        >
                        <select class="create-order__form--select" v-model="count">
                            <option v-for="mas_number in mas_numbers" :key="mas_number.id" :value="mas_number.number">{{mas_number.number}}</option>
                        </select>
                        <input type="text" class="create-order__form--input input" placeholder="Доставка(самовивіз)" v-model="delivery_cash" v-if="delivery_cashless == 0">
                        <input type="text" class="create-order__form--input input" placeholder="Доставка по безготівці" v-model="delivery_cashless" v-if="delivery_cash == 0">
                        <input type="submit" class="create-order__form--button button" value="Створити">
                    </form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {required} from 'vuelidate/lib/validators'
import {busGetOrders} from '../../main'
import {format} from "date-fns";

export default {
    name: "CreateOrder",
    data: () => ({
        town: [],
        client: [],
        note_names: [],
        product_names: [],
        firm_names: [],
        opt_prices: [],
        mas_numbers: [],
        regions: [],
        order_number: '',
        car_number: '',
        note: '',
        firm: '',
        region: '',
        data: '',
        product_name: '',
        opt_price: '',
        count: '',
        delivery_cash: '',
        delivery_cashless: '',
        client_id: '',
        showForm: false
    }),
    validations: {
        order_number: {required},
        car_number: {required},
        firm: {required},
        region: {required},
        data: {required},
        product_name: {required},
        opt_price: {required},
        count: {required}
    },
    mounted() {
        this.getordersInfo()
    },
    methods: {
        async getordersInfo() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/ordersinfo/${this.$route.params.id}`,{
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.town = result.data.town
                this.client = result.data.client
                this.note_names = result.data.note
                this.product_names = result.data.product_name
                this.firm_names = result.data.firm_name
                this.opt_prices = result.data.opt_price
                this.mas_numbers = result.data.mas_number
                this.regions = result.data.region

                this.opt_prices.sort(function(a, b) {
                  if(a.firm_name.toLowerCase() < b.firm_name.toLowerCase()) { return -1; }
                  if(a.firm_name.toLowerCase() > b.firm_name.toLowerCase()) { return 1; }
                  return 0;
                });
            } catch(e) {
                alert('Відбулася помилка')
            }
        },

        async createOrder() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                client_id: this.client[0].id,
                order_number: this.order_number,
              note: this.note,
                car_number: this.car_number,
                firm: this.firm,
                region: this.region,
                data: formatDate,
                product_name: this.product_name,
                opt_price: this.opt_price,
                count: this.count,
                delivery_cash: this.delivery_cash,
                delivery_cashless: this.delivery_cashless
            }
            if(formData.delivery_cash >= 0 && formData.delivery_cash != "") {
                formData.delivery_cashless = 0
            } else if (formData.delivery_cashless >= 0) {
                formData.delivery_cash = 0
            }
            try  {
                await this.$store.dispatch('createOrder', formData)
                this.order_number = ''
                this.car_number = ''
                this.note = ''
                this.firm = ''
                this.region = ''
                this.product_name = ''
                this.opt_price = ''
                this.count = ''
                this.delivery_cash = ''
                this.delivery_cashless = ''
                busGetOrders.$emit('getNewOrders')
                busGetOrders.$emit('getSumMas')
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        showOrderForm() {
            this.showForm = !this.showForm
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },

        sortOptPrice() {
          return this.opt_prices.filter((item) => {
            if(item.firm_name === this.firm) {
              return item
            } else if(!this.firm) {
              return item;
            }
          })
        }
    },
}
</script>

<style lang="scss" scoped>
    .create-order {
        margin-top: 30px;
    }
    .create-order__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .create-order__back {
        display: block;
        margin-top: 5px;
        margin-bottom: 15px;
        color: #000;
    }
    .create-order__headline--span {
        font-weight: 400;
    }
    .create-order__button {
        display: block;
        border: none;
        background: #00a814;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .create-order__form--input {
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
    .create-order__form--button {
        background: #00a814;
        border: none;
        display: block;
        margin-top: 10px;
    }
    .create-order__form--select {
        margin-left: -21px;
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
@media screen and (max-width: 1110px) {
    .create-order__form--input {
        &:nth-child(6) {
            margin-left: 0px;
        }
        &:nth-child(9) {
            margin-left: 5px;
        }
        &:nth-child(13) {
            margin-left: 0px;
        }
    }
}
@media screen and (max-width: 916px) {
    .create-order__form--input {
        &:nth-child(5) {
            margin-left: 0px;
        }
        &:nth-child(6) {
            margin-left: 5px;
        }
        &:nth-child(11) {
            margin-left: 0px;
        }
        &:nth-child(13) {
            margin-left: 5px;
        }
    }
}
@media screen and (max-width: 881px) {
    .create-order__form--input {
        &:nth-child(9) {
            margin-left: 0px;
        }
        &:nth-child(13) {
            margin-left: 0px;
        }
        &:nth-child(11) {
            margin-left: 5px;
        }
        &:nth-child(13) {
            margin-left: 5px;
        }
        &:nth-child(14) {
            margin-left: 0px;
        }
    }
}
@media screen and (max-width: 650px) {
    .create-order__form--input {
        &:nth-child(3) {
            margin-left: 0px;
        }
        &:nth-child(5) {
            margin-left: 5px;
        }
        &:nth-child(6) {
            margin-left: 0px;
        }
        &:nth-child(13) {
            margin-left: 0px;
        }
        &:nth-child(14) {
            margin-left: 5px;
        }
    }
}
@media screen and (max-width: 500px) {
    .create-order__form--input {
        margin-left: 0px;
        width: 100%;
        &:nth-child(5) {
            margin-left: 0px;
        }
        &:nth-child(11) {
            margin-left: 0px;
        }
        &:nth-child(14) {
            margin-left: 0px;
        }
    }
}
</style>