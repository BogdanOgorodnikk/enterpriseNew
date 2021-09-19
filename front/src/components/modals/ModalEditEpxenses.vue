<template>
    <div class="modal-create">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-create__box">
            <h2 class="modal-create__headline">Редагування витрати</h2>
            <form class="modal-create__form" @submit.prevent="editExpense">
                <p class="modal-create__form--text">Введіть нову назву витрати в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Назва витрати" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <p class="modal-create__form--text">Введіть нову суму в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Сума" v-model="number"
                    :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                >
                <p class="modal-create__form--text">Введіть нову дату в полі нижче</p>
                <input type="date" class="modal-create__form--input input" placeholder="Дата" v-model="data">
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
import {format} from "date-fns";

export default {
    name: "ModalEditExpenses",
    props: ['showModal', 'id', 'name', 'number', 'data'],
    validations: {
        name: {required},
        number: {required}
    },
    mounted() {
    },
    methods: {
        async editExpense() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
          const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

            const formData = {
                id: this.id, 
                name: this.name,
                number: this.number,
                data: formatDate
            }
            try  {
                await this.$store.dispatch('updateExpenses', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showModal = !this.showModal
            this.$emit('CancelEdit', this.showModal)
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
        height: 310px;
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
        margin-top: 5px;
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