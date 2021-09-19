<template>
    <div class="modal-create">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-create__box">
            <h2 class="modal-create__headline">Редагування назви міста</h2>
            <form class="modal-create__form" @submit.prevent="changeTown">
                <p class="modal-create__form--text">Введіть нову назву області в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Назва області" v-model="region"
                    :class="{invalid: ($v.region.$dirty && !$v.region.required) || ($v.region.$dirty && !$v.region.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.region.$dirty && !$v.region.required"
                >Поле назви області не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.region.$dirty && !$v.region.minLength"
                >Мінімальна довжина назви області {{$v.region.$params.minLength.min}} штук! Зараз він: {{region.length}}</small>
                <p class="modal-create__form--text">Введіть нову назву района в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Назва района" v-model="area"
                    :class="{invalid: ($v.area.$dirty && !$v.area.required) || ($v.area.$dirty && !$v.area.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.area.$dirty && !$v.area.required"
                >Поле назви района не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.area.$dirty && !$v.area.minLength"
                >Мінімальна довжина назви района {{$v.area.$params.minLength.min}} штук! Зараз він: {{area.length}}</small>
                <p class="modal-create__form--text">Введіть нову назву міста в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Назва міста" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Поле назви міста не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Мінімальна довжина назви міста {{$v.name.$params.minLength.min}} штук! Зараз він: {{name.length}}</small>
                <div class="modal-create__form--block">
                    <input type="submit" class="modal-create__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-create__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditTownCreate",
    props: ['showModalEdit', 'id', 'name', 'region', 'area'],
    validations: {
        name: {required, minLength: minLength(2)},
        region: {required, minLength: minLength(2)},
        area: {required, minLength: minLength(2)},
    },
    methods: {
        async changeTown() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                name: this.name,
                region: this.region,
                area: this.area
            }
            try  {
                await this.$store.dispatch('updateTown', formData)
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
        height: 360px;
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