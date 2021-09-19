<template>
    <Loader v-if="loader" />
    <div class="town-list" v-else>
        <div class="container">
            <h2 class="town-list__sort-headline">Пошук</h2>
            <form class="town-list__sort">
                <input class="town-list__sort--input input" type="text" placeholder="Назва області" v-model="filterRegion">
                <input class="town-list__sort--input input" type="text" placeholder="Назва района" v-model="filterArea">
                <input class="town-list__sort--input input" type="text" placeholder="Назва міста" v-model="filterName">
            </form>
            <div class="town-list__box-head"
                :class="{fixed: fix}"
            >
                <div class="town-list__item-head">
                    Область
                </div>
                <div class="town-list__item-head">
                    Район
                </div>
                <div class="town-list__item-head">
                    Місто
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Наявність менеджера
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1 || user.role_id == 5">
                    Залишки клієнтів
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="town-list__box-body" v-for="town in filteredTowns" :key="town.id">
                <div class="town-list__item-body">
                    <span class="town-list__box-body--responsive">Область: </span>{{town.region}}
                </div>
                <div class="town-list__item-body">
                    <span class="town-list__box-body--responsive">Район: </span>{{town.area}}
                </div>
                <router-link class="town-list__item-body" :to="{name: 'Town-clients', params: {id: town.id}}">
                    <span class="town-list__box-body--responsive">Місто: </span>{{town.name}}
                </router-link>
                <div class="town-list__item-body" v-if="user.role_id == 1" @click.prevent="showManager(town.id)" :class="{agree: town.manager_id != 0, delete: town.manager_id == 0}">
                    <span class="town-list__box-body--responsive">Наявність менеджера: </span>
                    <span v-if="town.manager_id != 0">Так</span>
                    <span v-else>Ні</span>
                </div>
                <router-link class="town-list__item-body town-list__link" :to="{name: 'Town-pith', params: {id: town.id}}" v-if="user.role_id == 1 || user.role_id == 5">
                    Перейти до залишків
                </router-link>
                <div class="town-list__item-body edit" @click.prevent="showEdit(town.id, town.name, town.region, town.area)" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-body delete" @click.prevent="deleteTown(town.id)" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
        </div>
        <ModalManager v-if="showModalManager"
        :showModalManager = "showModalManager"
        :id = "id"
        @Cancel="ChangeModalManager" 
         />
        <ModalEditTown v-if="showModalEditTown" 
        :showModalEditTown = "showModalEditTown"
        :id = "id"
        :name = "name"
        :region = "region"
        :area = "area"
        @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalManager from '../../components/modals/ModalManager'
import ModalEditTown from '../../components/modals/ModalEditTown'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "TownList",
    data: () => ({
        towns: [],
        id: '',
        name: '',
        region: '',
        area: '',
        filterName: '',
        filterRegion: '',
        filterArea: '',
        showModalManager: false,
        showModalEditTown: false,
        fix: false,
        loader: true
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 105) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getTowns()
    },
    methods: {
        async getTowns() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/town`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.towns = result.data
                this.towns.sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                });
                this.loader = false
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showManager(id) {
            this.showModalManager = !this.showModalManager
            this.id = id
        },
        showEdit(id, name, region, area) {
           this.showModalEditTown = !this.showModalEditTown
           this.id = id
           this.name = name
           this.region = region
           this.area = area
        },
        ChangeModalManager(data) {
            this.showModalManager = data
            this.getTowns()
        },
        ChangeModalEdit(data) {
            this.showModalEditTown = data
            this.getTowns()
        },
        async deleteTown(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/town/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getTowns()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredTowns() {
            return this.towns.filter((town) => {
                return town.name.toLowerCase().indexOf(this.filterName.toLowerCase()) > -1 
                && town.region.toLowerCase().indexOf(this.filterRegion.toLowerCase()) > -1 
                && town.area.toLowerCase().indexOf(this.filterArea.toLowerCase()) > -1
            })
        }
    },
    components: {
        ModalManager,
        ModalEditTown,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-list__sort-headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
    }
    .town-list__sort {
        margin-bottom: 20px;
    }
    .town-list__sort--input {
        margin-right: 10px;
        margin-bottom: 10px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .town-list__box-head {
        display: flex;
        background: #ccc;
    }
    .town-list__item-head {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        overflow: hidden;
    }
    .town-list__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .town-list__item-body {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        overflow: hidden;
        max-height: 30px;
        cursor: pointer;
        &:nth-child(1) {
            text-align: left;
        }
        &:nth-child(2) {
            text-align: left;
        }
        &:nth-child(3) {
            text-align: left;
        }
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .town-list__box-body--responsive {
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 500px) {
    .town-list__box-head {
        display: none;
    }
    .town-list__box-body {
        display: block;
        margin-top: 20px;
    }
    .town-list__item-body {
        display: block;
        text-align: left;
    }
    .town-list__box-body--responsive {
        display: inline-block;
        font-weight: 700;
        color: #000;
        margin-right: 5px;
    }
    .town-list__sort--input {
        width: 100%;
    }
}
</style>