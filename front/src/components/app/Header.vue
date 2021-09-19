<template>
    <header class="header">
        <div class="container">
            <div class="header__box">
                <router-link class="header__link" to="/"><img class="header__logo" src="../../assets/images/logo.png" alt=""></router-link>
                <div class="header__enter">
                    <h3 class="header__enter--info">
                        {{user.login}} 
                        <span v-if="user.role_id == 1">[admin]</span>
                        <span v-if="user.role_id == 2">[logistician]</span>
                        <span v-if="user.role_id == 3 || user.role_id ==  4">[accountant]</span>
                        <span v-if="user.role_id == 5">[manager]</span>
                    </h3>
                    <h3 class="header__enter--info" @click.prevent="LogOut">
                        Вийти
                    </h3>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    methods: {
        async LogOut() {
            await this.$store.dispatch('logout')
            this.$router.push('/login')
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background: #2d67c5;
        overflow: hidden;
    }
    .header__box {
        display: flex;
        justify-content: space-between;
        margin: 10px 0px;
    }
    .header__logo {
        display: block;
        width: 120px;
    }
    .header__enter--info {
        color: #fff;
        display: block;
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        text-align: right;
        &:last-child {
            cursor: pointer;
        }
    }
@media screen and (max-width: 300px) {
    .header__box {
        display: block;
    }
    .header__logo {
        margin-left: auto;
        margin-right: auto;
    }
    .header__enter {
        margin-top: 10px;
    }
    .header__enter--info {
        text-align: left;
    }
}
</style>