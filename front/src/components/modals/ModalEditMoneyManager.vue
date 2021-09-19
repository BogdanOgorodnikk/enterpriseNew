<template>
    <div class="modal-money">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-money__box">
            <h2 class="modal-money__headline">Редагування оплати менеджера</h2>
            <form class="modal-money__form" @submit.prevent="changeManagerMoney">
                <p class="modal-money__form--text">Введіть суму оплати менеджера в полі нижче</p>
                <input type="text" class="modal-money__form--input input" placeholder="Сума" v-model="pay_cash"
                    :class="{invalid: ($v.pay_cash.$dirty && !$v.pay_cash.required)}"
                >
                <div class="modal-money__form--block">
                    <input type="submit" class="modal-money__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-money__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditManagerMoney",
    props: ['moneyEdit', 'id', 'pay_cash'],
    validations: {
        pay_cash: {required}
    },
    methods: {
        async changeManagerMoney() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                pay_cash: this.pay_cash, 
            }
            try  {
                await this.$store.dispatch('updateManagerMoney', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.moneyEdit = !this.moneyEdit
            this.$emit('CancelEdit', this.moneyEdit)
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        background: rgba(0,0,0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .modal-money__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 190px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .modal-money__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-money__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-money__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    .modal-money__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-money__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-money__form--input {
        width: 98%;
        margin-top: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-money__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-money__box {
        left: 0%;
    }
}
@media screen and (max-width: 310px) {
    .modal-money__box {
        height: 220px;
    }
}
</style>