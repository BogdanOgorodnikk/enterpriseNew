<template>
    <div class="create-money">
        <div class="container">
            <div>
                <button class="create-money__button button" @click.prevent="showMoneyForm">Створити оплату</button>
                <transition name="form-fade">
                    <form class="create-money__form" v-if="showForm" @submit.prevent="createMoneyPay">
                        <input type="date" class="create-money__form--input input" placeholder="Дата" v-model="data"
                            :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                        >
                        <input type="text" class="create-money__form--input input" placeholder="Назва операції" v-model="product_name" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4">
                        <input type="text" class="create-money__form--input input" placeholder="Сума форми 1" v-model="pay_cash" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                        <input type="text" class="create-money__form--input input" placeholder="Сума безготівки" v-model="pay_cashless"  v-if="user.role_id == 1 || user.role_id == 4">
                        <input type="submit" class="create-money__form--button button" value="Створити">
                    </form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {format} from "date-fns"
import {busGetOrders} from '../../main'

export default {
    name: "createMoney",
    data: () => ({
        data: '',
        product_name: '',
        pay_cash: '',
        pay_cashless: '',
        client_id: '',
        showForm: false
    }),
    validations: {
        data: {required}
    },

    mounted() {
      if(this.user.role_id === 4) {
        this.product_name = 'Оплата безготівка'
      }
    },

  methods: {
        async createMoneyPay() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                client_id: this.$route.params.id,
                data: formatDate,
                product_name: this.product_name,
                pay_cash: this.pay_cash,
                pay_cashless: this.pay_cashless
            }
            if(this.$store.state.auth.newuser.user.role_id == 3) {
                formData.pay_cashless = 0
            } else if (this.$store.state.auth.newuser.user.role_id == 4) {
                formData.pay_cash = 0
            } else if (this.$store.state.auth.newuser.user.role_id == 5) {
                formData.product_name = "Оплата"
                formData.pay_cashless = 0
            }
            try  {
                await this.$store.dispatch('createMoneyPay', formData)
                if(this.user.role_id === 4) {
                  this.product_name = 'Оплата безготівка'
                } else {
                  this.product_name = ''
                }
                this.pay_cash = ''
                this.pay_cashless = ''
                busGetOrders.$emit('getNewPayment')
                busGetOrders.$emit('getNewStats')
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        showMoneyForm() {
            this.showForm = !this.showForm
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-money {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .create-money__button {
        display: block;
        border: none;
        background: #00a814;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .create-money__form--input {
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
    .create-money__form--button {
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
    .create-money__form--input {
        margin-left: 0px;
        width: 100%;
    }
}
</style>