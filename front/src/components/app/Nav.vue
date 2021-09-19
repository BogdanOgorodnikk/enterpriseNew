<template>
    <nav class="nav">
        <div class="container">
            <button class="btn-nav" @click.prevent="showMenu">
                <span class="btn-nav__line"></span>
                <span class="btn-nav__line"></span>
                <span class="btn-nav__line"></span>
            </button>
            <ul class="nav__list" v-if="menu">
                <router-link class="nav__item"
                    v-for="link in links"
                    :key="link.url"
                    tag="li"
                    active-class="active"
                    :to="link.url"
                    :exact="link.exact"
                >
                    <a @click="closeMenu" v-if="link.IsAdmin && user.role_id == 1 || link.IsLogist && user.role_id == 2 || link.IsAccountantCash && user.role_id == 3 || link.IsAccountantCashless && user.role_id == 4 || link.IsManager && user.role_id == 5" class="nav__link">{{link.title}}</a>
                    <a @click="closeMenu" v-else-if="!link.IsAdmin" class="nav__link">{{link.title}}</a>
                </router-link>
                <li class="nav__item nav__link" @mouseenter="showDrop" @mouseleave="closeDrop" v-if="user.role_id == 1 || user.role_id == 2">
                    Створити
                    <ul class="nav__drop-list" v-if="drop" @click="closeMenu"
                        :class="{'nav__drop-list--logist': user.role_id == 2}"
                    >
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/region" class="nav__drop-link">Область</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/area" class="nav__drop-link">Район</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1 || user.role_id == 2">
                            <router-link to="/create/town" class="nav__drop-link">Місто</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/product" class="nav__drop-link">Продукт</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/firm" class="nav__drop-link">Фірму</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/opt" class="nav__drop-link">Оптову ціну</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                            <router-link to="/create/mas" class="nav__drop-link">Кількість тон</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                          <router-link to="/create/pith" class="nav__drop-link">Залишки</router-link>
                        </li>
                        <li class="nav__drop-item" v-if="user.role_id == 1">
                          <router-link to="/create/note" class="nav__drop-link">Форми</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: () => ({
        links: [
            {title: 'Міста', url: '/', exact: true},
          {title: 'Всі продажі', url: '/allselers', IsAdmin: true, IsLogist: true, IsAccountantCash: true, IsAccountantCashless: true, IsManager: true},
          {title: 'Замовлення', url: '/prepareorders', IsAdmin: true, IsLogist: true, IsAccountantCash: true, IsAccountantCashless: true, IsManager: true},
            {title: 'Всі залишки', url: '/allpith', IsAdmin: true, IsAccountantCash: true},
            {title: 'Оплата менеджерів', url: '/managermoney', IsAdmin: true, IsAccountantCash: true},
            {title: 'Оплата форма 1', url: '/paymentcash', IsAdmin: true, IsAccountantCash: true, IsManager: true},
            {title: 'Оплата безготівкою', url: '/paymentcashless', IsAdmin: true, IsAccountantCash: true, IsAccountantCashless: true, IsManager: true},
            {title: 'Борги клієнтів', url: '/clientsdebt', IsAdmin: true, IsManager: true, IsAccountantCashless: true},
            {title: 'Всі користувачі', url: '/allusers', IsAdmin: true},
            {title: 'Особисті витрати', url: '/myexpenses'},
            {title: 'Витрати персонала', url: '/allpersonalexpenses', IsAdmin: true}
        ],
        windowWidth: window.innerWidth,
        drop: false,
        menu: true,
    }),
    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 930) {
                this.phoneSize = true
                this.menu = false
            } else {
                this.phoneSize = false
                this.menu = true
            }
        }
    },
    methods: {
        closeMenu() {
            if(this.windowWidth <= 900) {
                this.menu = false
                this.drop = false
            }
        },
        showMenu() {
            this.menu = !this.menu
        },
        showDrop() {
            this.drop = true
        },
        closeDrop() {
            this.drop = false
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
    .nav {
        background: #ffa726;
        overflow: hidden;
    }
    .nav__list {
        list-style: none;
        display: flex;
        justify-content: center;
    }
    .nav__item {
        &:hover {
            background: rgba(0,0,0,0.5);
            color: #fff;
        }
    }
    .nav__link {
        display: block;
        padding: 15px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
        font-weight: 400;
    }
    .active {
        background: rgba(0,0,0, 0.4);
    }
    .nav__drop-list {
        list-style: none;
        position: absolute;
        top: 108px;
        left: 89.40%;
    }
    .nav__drop-list--logist {
        list-style: none;
        position: absolute;
        top: 108px;
        left: 62.2%;
    }
    .nav__drop-link {
        display: block;
        text-decoration: none;
        background: #ffa726;
        color: #000;
        padding: 5px;
        z-index: 1;
        &:hover {
            color: #fff;
        }
    }
    .btn-nav {
        display: none;
        border: 0;
        background: none;
        padding: 0.7rem;
        cursor: pointer;
        border-radius: 0.2rem;
        margin-top: 5px;
        margin-bottom: 5px;
        &:hover {
           background: #dadada; 
        }
    }
    .btn-nav__line {
        display: block;
        width: 20px;
        height: 2px;
        border-radius: 1px;
        background: #000;
        margin-bottom: 3px;
        &:last-child {
           margin-bottom: 0; 
        }
    }
@media screen and (max-width: 1100px) {
    .btn-nav {
        display: block;
    }
    .nav__list {
        display: block;
    }
    .nav__link {
        padding: 2px;
        &:hover {
            background: inherit;
        }
    }
    .nav__drop-list {
        position: relative;
        top: 0;
        left: 0;
        padding: 2px;
    }
}
</style>