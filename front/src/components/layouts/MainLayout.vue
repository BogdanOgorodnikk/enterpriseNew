<template>
    <div v-if="authing">
        <Header />
        <Nav />
        <main>
            <router-view />
        </main>
    </div>
    <div v-else>
        <h3 class="error__headline">Ви не пройшли авторизацію, <router-link to="/login">нажміть для авторизації</router-link></h3>
    </div>
</template>

<script>
import Header from '../app/Header'
import Nav from '../app/Nav'

export default {
    name: "MainLayout",
    computed: {
        authing() {
            return this.$store.state.auth.isAuth
        },
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        Header,
        Nav
    }
}
</script>

<style lang="scss" scoped>
    .error__headline {
        margin-top: 100px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }
</style>