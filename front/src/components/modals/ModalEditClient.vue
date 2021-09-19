<template>
    <div class="modal-client">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-client__box">
            <h2 class="modal-client__headline">Редагування імені клієнта</h2>
            <form class="modal-client__form" @submit.prevent="updateClient">
                <p class="modal-client__form--text">Введіть нове ім'я клієнта в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Ім'я клієнта" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Поле ім'я клієнта не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Мінімальна довжина імені клієнта {{$v.name.$params.minLength.min}} штук! Зараз він: {{name.length}}</small>
                <p class="modal-client__form--text">Введіть новий номер телефона клієнта в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Номер телефона" v-model="phone"
                    :class="{invalid: ($v.phone.$dirty && !$v.phone.required) || ($v.phone.$dirty && !$v.phone.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.phone.$dirty && !$v.phone.required"
                >Поле номера телефона не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.phone.$dirty && !$v.phone.minLength"
                >Мінімальна довжина номера телефона {{$v.phone.$params.minLength.min}} штук! Зараз він: {{phone.length}}</small>
                <p class="modal-client__form--text">Введіть нову адресу магазина клієнта в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Адреса магазина" v-model="shopStreet"
                    :class="{invalid: ($v.shopStreet.$dirty && !$v.shopStreet.required) || ($v.shopStreet.$dirty && !$v.shopStreet.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.shopStreet.$dirty && !$v.shopStreet.required"
                >Поле адреси магазина не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.shopStreet.$dirty && !$v.shopStreet.minLength"
                >Мінімальна довжина адреси магазина {{$v.shopStreet.$params.minLength.min}} штук! Зараз він: {{shopStreet.length}}</small>
                <p class="modal-client__form--text">Введіть нову назву магазина клієнта в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Назва магазина" v-model="shopName"
                    :class="{invalid: ($v.shopName.$dirty && !$v.shopName.required) || ($v.shopName.$dirty && !$v.shopName.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.shopName.$dirty && !$v.shopName.required"
                >Поле назви магазина не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.shopName.$dirty && !$v.shopName.minLength"
                >Мінімальна довжина назви магазина {{$v.shopName.$params.minLength.min}} штук! Зараз він: {{shopName.length}}</small>
                <p class="modal-client__form--text">Введіть нове ім'я чий телефон буде резервним в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Ім'я власника резервного телефона" v-model="reserveName"
                    :class="{invalid: ($v.reserveName.$dirty && !$v.reserveName.required) || ($v.reserveName.$dirty && !$v.reserveName.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.reserveName.$dirty && !$v.reserveName.required"
                >Поле імені власника резервного телефона не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.reserveName.$dirty && !$v.reserveName.minLength"
                >Мінімальна довжина імені {{$v.reserveName.$params.minLength.min}} штук! Зараз він: {{reserveName.length}}</small>
                <p class="modal-client__form--text">Введіть новий резервний номер телефона в полі нижче</p>
                <input type="text" class="modal-client__form--input input" placeholder="Номер телефона" v-model="reservePhone"
                    :class="{invalid: ($v.reservePhone.$dirty && !$v.reservePhone.required) || ($v.reservePhone.$dirty && !$v.reservePhone.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.reservePhone.$dirty && !$v.reservePhone.required"
                >Поле резервного телефона не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.reservePhone.$dirty && !$v.reservePhone.minLength"
                >Мінімальна довжина номера телефона {{$v.reservePhone.$params.minLength.min}} штук! Зараз він: {{reservePhone.length}}</small>
                <div class="modal-client__form--block">
                    <input type="submit" class="modal-client__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-client__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditClient",
    props: ['showModalEdit', 'id', 'name', 'phone', 'reserveName', 'reservePhone', 'shopName', 'shopStreet'],
    validations: {
        name: {required, minLength: minLength(2)},
        phone: {required, minLength: minLength(10)},
        shopStreet: {required, minLength: minLength(2)},
        shopName: {required, minLength: minLength(2)},
        reserveName: {required, minLength: minLength(2)},
        reservePhone: {required, minLength: minLength(10)},
    },
    methods: {
        async updateClient() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                name: this.name,
                phone: this.phone,
                shopStreet: this.shopStreet,
                shopName: this.shopName,
                reserveName: this.reserveName,
                reservePhone: this.reservePhone,
            }
            try  {
                await this.$store.dispatch('updateClient', formData)
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
    .modal-client__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 415px;
        position: fixed;
        left: 34%;
        top: 10%;
        border-radius: 8px;
        overflow-y: scroll;
    }
    .modal-client__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-client__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-client__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-top: 5px;
    }
    .modal-client__form--block {
        display: flex;
        margin-top: 26px;
        margin-bottom: 20px;
    }
    .modal-client__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-client__form--input {
        width: 98%;
        margin-top: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-client__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-client__box {
        left: 0%;
    }
}
@media screen and (max-width: 428px) {
    .modal-client__box {
        height: 80%;
    }
}
@media screen and (max-width: 297px) {
    .modal-client__form--block {
        display: block;
    }
    .modal-client__form--button {
        margin: 10px 0px;
    }
}
</style>