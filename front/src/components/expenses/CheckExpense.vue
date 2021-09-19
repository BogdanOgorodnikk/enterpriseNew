<template>
    <div class="check-expense">
        <div>
            <button class="check-expense__button button" @click.prevent="showCheckForm">Створити перевірку</button>
            <transition name="form-fade">
                <form class="check-expense__form" v-if="showForm" @submit.prevent="createCheck">
                    <input type="date" class="check-expense__form--input input" placeholder="Дата" v-model="data"
                        :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                    >
                    <input type="text" class="check-expense__form--input input" placeholder="Сума перевірених грошей" v-model="number"
                        :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                    >
                    <input type="submit" class="check-expense__form--button button" value="Створити">
                </form>
            </transition>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {format} from "date-fns";

export default {
    name: "CheckEpxense",
        data: () => ({
        data: '',
        number: '',
        client_id: '',
        showForm: false
    }),
    validations: {
        data: {required},
        number: {required}
    },
    methods: {
        async createCheck() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                creater: this.$route.params.id, 
                data: formatDate,
                number: this.number
            }
            try  {
                await this.$store.dispatch('createCheckExpense', formData)
                this.number = ''
                this.$emit('checkCreate')
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
    .check-expense {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .check-expense__button {
        display: block;
        border: none;
        background: #00a814;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .check-expense__form--input {
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
    .check-expense__form--button {
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
    .check-expense__form--input {
        margin-left: 0px;
        width: 100%;
    }
}
</style>