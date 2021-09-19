<template>
    <div class="modal-create">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-create__box">
            <h2 class="modal-create__headline">Внесення ціни продукта</h2>
            <form class="modal-create__form" @submit.prevent="changePriceCash">
                <p class="modal-create__form--text">Введіть ціну на продукт в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Ціна" v-model="price_cashless"
                    :class="{invalid: ($v.price_cashless.$dirty && !$v.price_cashless.required)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.price_cashless.$dirty && !$v.price_cashless.required"
                >Поле ціни не повинно бути пустим!</small>
                <div class="modal-create__form--block">
                    <input type="submit" class="modal-create__form--button button" value="Внести">
                    <button @click.prevent="RemoveModal" class="modal-create__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditProductCreate",
    props: ['showPayCashless', 'id'],
    data: () => ({
        price_cashless: ''
    }),
    validations: {
        price_cashless: {required}
    },
    methods: {
        async changePriceCash() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                price_cashless: this.price_cashless, 
            }
            try  {
                await this.$store.dispatch('updateOrderPriceCashless', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showPayCashless = !this.showPayCashless
            this.$emit('CancelEditCashless', this.showPayCashless)
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
    .modal-create__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 190px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .modal-create__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-create__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-create__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    .modal-create__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-create__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-create__form--input {
        width: 98%;
        margin-top: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-create__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-create__box {
        left: 0%;
    }
}
@media screen and (max-width: 229px) {
    .modal-create__box {
        height: 220px;
    }
}
</style>