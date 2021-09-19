<template>
    <div class="modal-money">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-money__box">
            <h2 class="modal-money__headline">Редагування перевірених грошей менеджера</h2>
            <form class="modal-money__form" @submit.prevent="changeManagerMoney">
                <p class="modal-money__form--text">Введіть суму перевірених грошей менеджера в полі нижче</p>
                <input type="text" class="modal-money__form--input input" placeholder="Сума" v-model="checkMoney"
                    :class="{invalid: ($v.checkMoney.$dirty && !$v.checkMoney.required)}"
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
    props: ['checkEdit', 'id', 'checkMoney'],
    validations: {
        checkMoney: {required}
    },
    methods: {
        async changeManagerMoney() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                pay_cash: this.checkMoney, 
            }
            try  {
                await this.$store.dispatch('updateCheckingManagerMoney', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.checkEdit = !this.checkEdit
            this.$emit('CancelEdit', this.checkEdit)
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