<template>
    <div class="modal-pith">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-pith__box">
            <h2 class="modal-pith__headline">Редагування залишків</h2>
            <form class="modal-pith__form" @submit.prevent="updatePith">
                <p class="modal-pith__form--text">Дата</p>
                <input type="text" class="modal-pith__form--input input" placeholder="Дата" v-model="data"
                    :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                >
                <p class="modal-pith__form--text">Назва залишків</p>
                <input type="text" class="modal-pith__form--input input" placeholder="Назва залишків" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <p class="modal-pith__form--text">Кількість залишків</p>
                <input type="text" class="modal-pith__form--input input" placeholder="Кількість залишків" v-model="number"
                    :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                >
                <p class="modal-pith__form--text">Ціна залишків</p>
                <input type="text" class="modal-pith__form--input input" placeholder="Ціна залишків" v-model="price_cash"
                    :class="{invalid: ($v.price_cash.$dirty && !$v.price_cash.required)}"
                >
                <p class="modal-pith__form--text">Ціна роздрібна</p>
                <input type="text" class="modal-pith__form--input input" placeholder="Ціна роздрібна" v-model="price_rosdb"
                    :class="{invalid: ($v.price_rosdb.$dirty && !$v.price_rosdb.required)}"
                >
                <div class="modal-pith__form--block">
                    <input type="submit" class="modal-pith__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-pith__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "ModalAddPith",
    props: ['modalEdit', 'id', 'data', 'name', 'number', 'price_cash', 'price_rosdb'],
    validations: {
        data: {required},
        name: {required},
        number: {required},
        price_cash: {required},
        price_rosdb: {required}
    },
    methods: {
        async updatePith() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                data: this.data,
                name: this.name,
                number: this.number,
                price_cash: this.price_cash,
                price_rosdb: this.price_rosdb
            }
            try  {
                await this.$store.dispatch('updatePith', formData)
                this.data = ''
                this.name = ''
                this.number = ''
                this.price_cash = ''
                this.price_rosdb = ''
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка' + e)
            }
        },
        RemoveModal() {
            this.modalEdit = !this.modalEdit
            this.$emit('CancelEdit', this.modalEdit)
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
    .modal-pith__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 420px;
        position: fixed;
        left: 34%;
        top: 14%;
        border-radius: 8px;
    }
    .modal-pith__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-pith__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-pith__form--text {
        font-size: 16px;
        font-weight: 400;
    }
    .modal-pith__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-pith__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-pith__form--input {
        width: 98%;
        margin-bottom: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-pith__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-pith__box {
        left: 0%;
    }
}
@media screen and (max-width: 190px) {
    .modal-pith__box {
        height: 445px;
    }
}
</style>