<template>
    <div class="modal-town">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-town__box">
            <h2 class="modal-town__headline">Редагування користувача</h2>
            <form class="modal-town__form" @submit.prevent="changeUserInfo">
                <p class="modal-town__form--text">Введіть новий логін користувача в поле нижче</p>
                <input type="text" class="modal-town__form--input input" placeholder="Логін" v-model="login"
                    :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.login.$dirty && !$v.login.required"
                >Поле логін не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.login.$dirty && !$v.login.minLength"
                >Мінімальна довжина логіна {{$v.login.$params.minLength.min}} штук! Зараз він: {{login.length}}</small>
                <p class="modal-town__form--text">Введіть новий пароль користувача в поле нижче</p>
                <input type="text" class="modal-town__form--input input" placeholder="Пароль" v-model="password"
                    :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                >Поле пароль не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                >Мінімальна довжина пароля {{$v.password.$params.minLength.min}} штук! Зараз він: {{password.length}}</small>
                <div class="modal-town__form--block">
                    <input type="submit" class="modal-town__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-town__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditUser",
    props: ['modalEdit', 'id', 'login', 'password'],
    validations: {
        login: {required, minLength: minLength(3)},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async changeUserInfo() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                login: this.login, 
                password: this.password
            }
            try  {
                await this.$store.dispatch('updateUserLoginandPass', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
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
    .modal-town__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 265px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .modal-town__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-town__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-town__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
    }
    .modal-town__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-town__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-town__form--input {
        width: 98%;
        margin-top: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-town__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-town__box {
        left: 0%;
    }
}
@media screen and (max-width: 362px) {
    .modal-town__box {
        height: 290px;
    }
}
@media screen and (max-width: 245px) {
    .modal-town__box {
        height: 310px;
    }
}
</style>