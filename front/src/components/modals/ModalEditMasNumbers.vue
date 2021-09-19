<template>
    <div class="modal-create">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-create__box">
            <h2 class="modal-create__headline">Редагування кількості тон</h2>
            <form class="modal-create__form" @submit.prevent="changeMasNumber">
                <p class="modal-create__form--text">Введіть нову кількість тон в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Кількість тон" v-model="number"
                    :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.number.$dirty && !$v.number.required"
                >Поле кількості тон не повинно бути пустим!</small>
                <div class="modal-create__form--block">
                    <input type="submit" class="modal-create__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-create__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditMasNumbers",
    props: ['showModalEdit', 'id', 'number'],
    validations: {
        number: {required}
    },
    methods: {
        async changeMasNumber() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                number: this.number, 
            }
            try  {
                await this.$store.dispatch('updateMasNumber', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showModalEdit = !this.showModalEdit
            this.$emit('CancelEdit', this.showModalEdit)
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
@media screen and (max-width: 240px) {
    .modal-create__box {
        height: 210px;
    }
}
</style>