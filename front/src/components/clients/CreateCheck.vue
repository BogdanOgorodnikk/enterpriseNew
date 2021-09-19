<template>
    <div class="create-check">
        <div class="container">
            <div>
                <button class="create-check__button button" @click.prevent="showCheckForm">Створити перевірку</button>
                <transition name="form-fade">
                    <form class="create-check__form" v-if="showForm" @submit.prevent="createCheck">
                        <input type="date" class="create-check__form--input input" placeholder="Дата" v-model="data"
                            :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                        >
                        <input type="text" class="create-check__form--input input" placeholder="Сума форми 1" v-model="pay_cash"
                            :class="{invalid: ($v.pay_cash.$dirty && !$v.pay_cash.required)}"
                        >
                        <input type="submit" class="create-check__form--button button" value="Створити">
                    </form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {busGetOrders} from '../../main'
import {format} from "date-fns";

export default {
    name: "CreateCheck",
    data: () => ({
        data: '',
        pay_cash: '',
        client_id: '',
        showForm: false
    }),
    validations: {
        data: {required},
        pay_cash: {required}
    },
    methods: {
        async createCheck() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                client_id: this.$route.params.id,
                data: formatDate,
                pay_cash: this.pay_cash
            }
            try  {
                await this.$store.dispatch('createCheck', formData)
                this.pay_cash = ''
                busGetOrders.$emit('getNewCheck')
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        showCheckForm() {
            this.showForm = !this.showForm
        }
    }
}
</script>

<style lang="scss" scoped>
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