<template>
    <Loader v-if="loader" />
    <div class="debt-table" v-else>
        <div class="container">
            <form class="debt-table__sort-form">
                <p class="debt-table__sort-form--info">Параметри пошуку</p>
                <input type="text" class="deb-table__sort-form--input input" placeholder="Назва області" v-model="filteredRegion">
                <input type="text" class="deb-table__sort-form--input input" placeholder="Назва района" v-model="filteredArea">
                <input type="text" class="deb-table__sort-form--input input" placeholder="Назва міста" v-model="filteredTown">
                <input type="text" class="deb-table__sort-form--input input" placeholder="Ім'я клієнта" v-model="filteredName">
            </form>
            <div class="debt-table__general" v-if="user.role_id !== 4">
                Сума боргів: <span class="debt-table__general--span">{{sumDebt.toFixed(1)}}</span>
            </div>
            <div class="debt-table__general" v-if="user.role_id !== 4">
                Сума залишків клієнтів: <span class="debt-table__general--span">{{sumPithDebt.toFixed(1)}}</span>
            </div>
            <div class="debt-table__general" v-if="user.role_id !== 4">
                Сума проданого товару: <span class="debt-table__general--span">{{(sumDebt - sumPithDebt).toFixed(1)}}</span>
            </div>
            <div class="debt-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="debt-table__item-head">
                    №
                </div>
                <div class="debt-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="debt-table__item-head">
                    Борг клієнта
                </div>
                <div class="debt-table__item-head" v-if="user.role_id !== 4">
                    Сума залишків клієнта
                </div>
                <div class="debt-table__item-head" v-if="user.role_id !== 4">
                    Сума проданого товару
                </div>
            </div>
            <div class="debt-table__box-body" v-for="(debt, index) in filteredDebt" :key="debt.client_id">
                <div class="debt-table__item-body">
                    <span class="debt-table__item-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="debt-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: debt.client_id}}"><span class="debt-table__item-body--responsive">Ім'я клієнта: </span>{{debt.name}}</router-link>
                </div>
                <div class="debt-table__item-body">
                    <span class="debt-table__item-body--responsive">Борг клієнта: </span>{{Math.round(debt.sumDebt)}}
                </div>
                <div class="debt-table__item-body" v-if="user.role_id !== 4">
                    <span class="debt-table__item-body--responsive">Сума залишків клієнта: </span><span v-if="debt.sumPithDebt == Nan"></span><span v-else>{{Math.round(debt.sumPithDebt)}}</span>
                </div>
                <div class="debt-table__item-body" v-if="user.role_id !== 4">
                    <span class="debt-table__item-body--responsive">Сума проданого товару: </span>{{Math.round(debt.sumSeller)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "DebtTable",
    data: () => ({
        debts: [],
        pithDebts: [],
        filteredName: '',
        filteredTown: '',
        filteredRegion: '',
        filteredArea: '',
        loader: true,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 255) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getDebts()
    },
    methods: {
        async getDebts() {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/alldebts`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.debts = result.data.debts.reverse()
            this.pithDebts = result.data?.pithDebts?.reverse()
            this.debts.forEach(element => {
                this.pithDebts?.forEach(item => {
                    element.sumPithDebt = 0
                    if(element.client_id == item.client_id) {
                        element.sumPithDebt = item.sumPith
                    }
                });
                element.sumSeller = element.sumDebt - element.sumPithDebt || 0
            });
            this.debts.sort(function(a, b) {
                    if(a.sumDebt > b.sumDebt) { return -1; }
                    if(a.sumDebt < b.sumDebt) { return 1; }
                    return 0;
            });
            this.loader = false
        },
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredDebt() {
            return this.debts.filter((debt) => {
                if(this.filteredRegion || this.filteredArea || this.filteredTown || this.filteredName != '') {
                    return debt.region.toLowerCase().indexOf(this.filteredRegion.toLowerCase()) > -1 
                    && debt.area.toLowerCase().indexOf(this.filteredArea.toLowerCase()) > -1 
                    && debt.townName.toLowerCase().indexOf(this.filteredTown.toLowerCase()) > -1 
                    && debt.name.toLowerCase().indexOf(this.filteredName.toLowerCase()) > -1 
                } else {
                    return debt
                }
            })
        },
        sumDebt() {
            return this.filteredDebt.reduce((acc, item) => {

                if(item.product_name === 'Перевірка') {
                    acc += 0;
                } else {
                    acc += item.sumDebt;
                }
                return acc
            }, 0);
        },
        sumPithDebt() {
            return this.filteredDebt.reduce((acc, item) => acc + item.sumPithDebt, 0);
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .debt-table {
        margin: 30px 0px;
    }
    .debt-table__sort-form {
        margin-bottom: 30px;
    }
    .debt-table__sort-form--info {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .deb-table__sort-form--input {
        margin-right: 10px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .debt-table__general {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
    .debt-table__general--span {
        font-weight: 700;
    }
    .debt-table__box-head {
        display: flex;
        background: #ccc;
    }
    .debt-table__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
        text-align: center;
    }
    .debt-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .debt-table__item-body {
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .debt-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 600px) {
    .debt-table__box-head {
        display: none;
    }
    .debt-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .debt-table__item-body--responsive {
        display: inline-block;
    }
}
</style>