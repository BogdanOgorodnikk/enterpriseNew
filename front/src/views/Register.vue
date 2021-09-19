<template>
    <div class="register">
        <div class="container">
            <div class="opinion"></div>
            <div class="register__box">
                <form class="register__box--form" @submit.prevent="SignUp">
                    <h3 class="register__box--headline">Реєстрація</h3>
                    <input type="text" class="register__box--input input" placeholder="Логін"
                        v-model="login"
                        :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.minLength)}"
                    >
                    <small 
                        class="helper-text__invalid-auth"
                        v-if="$v.login.$dirty && !$v.login.required"
                    >Поле логін не повинно бути пустим!</small>
                    <small class="helper-text__invalid-auth"
                        v-else-if="$v.login.$dirty && !$v.login.minLength"
                    >Мінімальна довжина логіна {{$v.login.$params.minLength.min}} штук! Зараз він: {{login.length}}</small>
                    <input type="password" class="register__box--input input" placeholder="Пароль"
                        v-model="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                    >
                    <small 
                        class="helper-text__invalid-auth"
                        v-if="$v.password.$dirty && !$v.password.required"
                    >Поле пароль не повинно бути пустим!</small>
                    <small class="helper-text__invalid-auth"
                        v-else-if="$v.password.$dirty && !$v.password.minLength"
                    >Мінімальна довжина пароля {{$v.password.$params.minLength.min}} штук! Зараз він: {{password.length}}</small>
                    <input type="password" class="register__box--input input" placeholder="Підтвердіть пароль"
                        v-model="confirmPassword"
                        :class="{invalid: !$v.confirmPassword.sameAsPassword}"
                    >
                    <small class="helper-text__invalid-auth"
                        v-if="!$v.confirmPassword.sameAsPassword">
                    Паролі не співпали!
                    </small>
                    <input type="submit" value="Зареєструватись" class="register__box--button button">
                </form>
            </div>
            <h3 class="register__signin">Ви вже маєте аккаунт? <router-link to="/login">Ввійти</router-link></h3>
        </div>
    </div>
</template>

<script>
import {required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
    name: "Register",
    data: () => ({
        login: '',
        password: '',
        confirmPassword: ''
    }),
    validations: {
        login: {required, minLength: minLength(3)},
        password: {required, minLength: minLength(6)},
        confirmPassword: {sameAsPassword: sameAs('password')}
    },
    methods: {
        async SignUp() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                login: this.login,
                password: this.password,
            }
            try {
                await this.$store.dispatch('register',formData)
                this.$router.push('/login')
            } catch (e) {
                alert("Відбулася помилка")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        position: absolute;
        top: 57px;
        left: 0;
        background: rgba(0,0,0,0.6);
        width: 100%;
        height: 92%;
    }
    .register__box {
        max-width: 500px;
        width: 100%;
        height: 304px;
        z-index: 1;
        background: #fff;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        margin: 100px auto 0px;
    }
    .register__box--headline {
        text-align: center;
        font-size: 26px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .register__box--form {
        padding: 5px;
    }
    .register__box--input {
        display: block;
        margin: 10px auto;
        width: 400px;
    }
    .register__box--button {
        display: block;
        background: #00a814;
        border: none;
        margin: 6px auto;
        width: 300px;
    }
    .register__signin {
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        z-index: 1;
        position: relative;
        margin-top: -30px;
    }
@media screen and (max-width: 440px) {
    .register__box--input {
        width: 100%;
    }
    .register__box--button {
        width: 100%;
    }
}
@media screen and (max-width: 242px) {
    .register__signin {
        margin-top: -42px;
    }
}
</style>