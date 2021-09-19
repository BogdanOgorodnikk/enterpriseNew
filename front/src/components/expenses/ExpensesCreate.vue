<template>
    <div class="expenses-create">
        <div class="container">
            <div>
                <button class="expenses-check__button button" @click.prevent="showFormExpense">Створити нову витрату</button>
                <transition name="form-fade">
                    <form class="expenses-check__form" v-if="showForm" @submit.prevent="createExpense">
                        <input type="date" class="expenses-check__form--input input" placeholder="Дата" v-model="data"
                            :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                        >
                        <input type="text" class="expenses-check__form--input input" placeholder="Назва витрати" v-model="name"
                            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                        >
                        <input type="text" class="expenses-check__form--input input" placeholder="Сума витрати" v-model="number"
                            :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                        >
                        <input type="submit" class="expenses-check__form--button button" value="Створити">
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
    name: "ExpensesCreate",
    data: () => ({
        data: '',
        name: '',
        number: '',
        showForm: false
    }),
    validations: {
        data: {required},
        name: {required},
        number: {required}
    },
    methods: {
        async createExpense() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                name: this.name,
                number: this.number,
                data: formatDate
            }
            try  {
                await this.$store.dispatch('createExpense', formData)
                this.name = ''
                this.number = ''
                this.data = ''
                busGetOrders.$emit('getNewExpense')
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        showFormExpense() {
            this.showForm = !this.showForm
        }
    }
}
</script>

<style lang="scss" scoped>
    .expenses-create {
        margin-top: 30px;
    }
    .expenses-check__button {
        display: block;
        border: none;
        background: #00a814;
        margin-bottom: 15px;
    }
    .expenses-check__form--input {
        margin-left: 5px;
        &:first-child {
            margin-left: 0px;
        }
    }
    .expenses-check__form--button {
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
    @media screen and (max-width: 618px) {
        .expenses-check__form--input {
            display: block;
            width: 100%;
            margin-left: 0px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0px;
            }
        }
    }
</style>