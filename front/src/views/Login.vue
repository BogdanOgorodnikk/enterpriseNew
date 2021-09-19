<template>
    <div class="login">
        <div class="container">
            <div class="opinion"></div>
            <div class="login__box">
                <form class="login__box--form" @submit.prevent="signIn">
                    <h3 class="login__box--headline">Авторизація</h3>
                    <input type="text" class="login__box--input input" placeholder="Логін"
                        v-model="login"
                        :class="{invalid: ($v.login.$dirty && !$v.login.required)}"
                    >
                    <small 
                    class="helper-text__invalid-auth"
                    v-if="$v.login.$dirty && !$v.login.required"
                    >Поле логін не повинно бути пустим!</small>
                    <input type="password" class="login__box--input input" placeholder="Пароль"
                        v-model="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required)}"
                    >
                    <small 
                    class="helper-text__invalid-auth"
                    v-if="$v.password.$dirty && !$v.password.required"
                    >Поле пароль не повинно бути пустим!</small>
                    <input type="submit" value="Авторизуватись" class="login__box--button button">
                </form>
            </div>
            <h3 class="login__signin">Ви ще не створили аккаунт? <router-link to="/register">Реєстрація</router-link></h3>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "Login",
    data: () => ({
        login: '',
        password: ''
    }),
    validations: {
        login: {required},
        password: {required}
    },
    methods: {
        async signIn() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                login: this.login,
                password: this.password
            }
            try {
                await this.$store.dispatch('login',formData)
                this.$router.push('/')
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
    .login__box {
        max-width: 500px;
        width: 100%;
        height: 230px;
        z-index: 1;
        background: #fff;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        margin: 100px auto 0px;
    }
    .login__box--headline {
        text-align: center;
        font-size: 26px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .login__box--form {
        padding: 5px;
    }
    .login__box--input {
        display: block;
        margin: 4px auto;
        width: 400px;
    }
    .login__box--button {
        display: block;
        background: #00a814;
        border: none;
        margin: 6px auto;
        width: 300px;
    }
    .login__signin {
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        z-index: 1;
        position: relative;
        margin-top: -30px;
    }
@media screen and (max-width: 440px) {
    .login__box--input {
        width: 100%;
    }
    .login__box--button {
        width: 100%;
    }
}
@media screen and (max-width: 320px) {
    .login__signin {
        margin-top: -42px;
    }
}
</style>