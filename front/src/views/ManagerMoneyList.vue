<template>
    <Loader v-if="loader" />
    <div class="manager-list" v-else>
        <div class="container">
            <div class="manager-list__box" v-for="manager in managers" :key="manager.id">
                Оплати менеджера: <router-link class="manager-list__link" :to="{name: 'manager-moneys', params: {id: manager.id}}">{{manager.login}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/app/Loader'
import axios from 'axios'

export default {
    name: "ManagerMoneyList",
    data: () => ({
        managers: [],
        loader: true
    }),
    mounted() {
        this.getManagers()
    },
    methods: {
        async getManagers() {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/managermoney`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.managers = result.data.managers
            this.loader = false
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .manager-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .manager-list__box {
        display: block;
        border: 1px solid #000;
        padding: 5px;
        font-size: 16px;
        font-weight: 700;
    }
    .manager-list__link  {
        font-weight: 400;
    }
</style>