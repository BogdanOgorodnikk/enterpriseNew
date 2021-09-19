<template>
    <Loader v-if="loader" />
    <div class="personal-list" v-else>
        <div class="container">
            <div class="personal-list__box" v-for="personal in personals" :key="personal.id">
                Витрати працівника: 
                <router-link :to="{name: 'personal-expenses', params: {id: personal.id}}" class="personal-list__box--link">{{personal.login}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "AllPersonalList",
    data: () => ({
        personals: [],
        loader: true
    }),
    mounted() {
        this.getPersonals()
    },
    methods: {
        async getPersonals() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allpersonalexpenses`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.personals = result.data
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .personal-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .personal-list__box {
        display: flex;
        font-size: 16px;
        font-weight: 700;
        border: 1px solid #000;
        padding: 5px;
        width: 100%;
    }
    .personal-list__box--link {
        font-weight: 400;
        margin-left: 5px;
    }
</style>