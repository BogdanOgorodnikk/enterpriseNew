<template>
    <Loader v-if="loader" />
    <div class="town-pith" v-else>
        <div class="container">
            <router-link class="town-pith__link" to="/">Повернутися до міст</router-link>
            <div class="town-pith__general-box" v-for="client in clients" :key="client.id">
                <div class="town-pith__headline">
                    <router-link class="town-pith__headline--link" :to="{name: 'Clients', params: {id: client.id}}">{{client.name}}</router-link>
                </div>
                <div class="town-pith__box-head">
                    <div class="town-pith__item-head">Дата</div>
                    <div class="town-pith__item-head">Назва залишків</div>
                    <div class="town-pith__item-head">Кількість</div>
                    <div class="town-pith__item-head">Ціна</div>
                    <div class="town-pith__item-head">Ціна роздрібна</div>
                </div>
                <div class="town-pith__box-body" v-for="pith in piths" :key="pith.id">
                    <div class="town-pith__item-body" v-if="client.id == pith.client_id"><span class="town-pith__item-body--responsive">Дата: </span>{{pith.data}}</div>
                    <div class="town-pith__item-body" v-if="client.id == pith.client_id"><span class="town-pith__item-body--responsive">Назва залишків: </span>{{pith.name}}</div>
                    <div class="town-pith__item-body" v-if="client.id == pith.client_id"><span class="town-pith__item-body--responsive">Кількість: </span>{{pith.number}}</div>
                    <div class="town-pith__item-body" v-if="client.id == pith.client_id"><span class="town-pith__item-body--responsive">Ціна: </span>{{pith.price_cash}}</div>
                    <div class="town-pith__item-body" v-if="client.id == pith.client_id"><span class="town-pith__item-body--responsive">Ціна роздрібна: </span>{{pith.price_rosdb}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "TownPithTable",
    data: () => ({
        piths: [],
        clients: [],
        loader: true
    }),
    mounted() {
        this.getPith()
    },
    methods: {
        async getPith() {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/townpith/${this.$route.params.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.piths = result.data.piths.reverse()
            this.clients = result.data.clients
            this.loader = false
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-pith {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-pith__link {
        color: #000;
    }
    .town-pith__general-box {
        margin-top: 30px;
    }
    .town-pith__headline {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        padding: 5px;
        background: #1dabb8;
    }
    .town-pith__headline--link {
        color: #000;
    }
    .town-pith__box-head {
        display: flex;
    }
    .town-pith__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        padding: 5px;
        background: #ccc;
        overflow: hidden;
    }
    .town-pith__box-body {
        display: flex;
    }
    .town-pith__item-body {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        padding: 5px;
        overflow: hidden;
        text-align: center;
    }
    .town-pith__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 500px) {
    .town-pith__box-head {
        display: none;
    }
    .town-pith__box-body {
        display: block;
        margin-top: 15px;
    }
    .town-pith__item-body {
        text-align: left;
    }
    .town-pith__item-body--responsive {
        display: inline-block;
    }
}
</style>