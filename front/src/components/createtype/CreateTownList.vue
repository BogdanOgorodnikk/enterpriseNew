<template>
    <Loader v-if="loader" />
    <div class="town-list" v-else>
        <div class="container">
            <h2 class="town-form__headline">Створення міста</h2>
            <form class="town-form__create" @submit.prevent="createTown">
                <input type="text" class="town-form__create--input input" placeholder="Назва області" v-model="region"
                    :class="{invalid: ($v.region.$dirty && !$v.region.required) || ($v.region.$dirty && !$v.region.minLength)}"
                >
                <select class="town-form__create--select" v-model="region">
                    <option v-for="regionName in regionNames" :key="regionName.id" :value="regionName.name">{{regionName.name}}</option>
                </select>
                <input type="text" class="town-form__create--input input" placeholder="Назва района" v-model="area"
                    :class="{invalid: ($v.area.$dirty && !$v.area.required) || ($v.area.$dirty && !$v.area.minLength)}"
                >
                <select class="town-form__create--select" v-model="area">
                    <option v-for="areaName in areaNames" :key="areaName.id" :value="areaName.name">{{areaName.name}}</option>
                </select>
                <input type="text" class="town-form__create--input input" placeholder="Назва міста" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <input type="submit" value="Створити" class="town-form__create--button button">
            </form>
            <div class="town-list__box-head">
                <div class="town-list__item-head">
                    Назва міста
                </div>
                <div class="town-list__item-head">
                    Назва області
                </div>
                <div class="town-list__item-head">
                    Назва района
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="town-list__box-body" v-for="town in towns" :key="town.id">
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Назва міста: </span>{{town.name}}
                </div>
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Назва області: </span>{{town.region}}
                </div>
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Назва района: </span>{{town.area}}
                </div>
                <div class="town-list__item-body edit" @click.prevent="showEdit(town.id, town.name, town.region, town.area)" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-body delete" @click.prevent="deleteTown(town.id)" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditTownCreate v-if="showModalEdit" 
            :showModalEdit = "showModalEdit"
            :id = "id"
            :name = "name"
            :region = "region"
            :area = "area"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditTownCreate from '../modals/ModalEditTownCreate'
import Loader from '../app/Loader'
import {required, minLength} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    name: "CreateTownList",
    data: () => ({
        towns: [],
        regionNames: [],
        areaNames: [],
        id: '',
        name: '',
        region: '',
        area: '',
        showModalEdit: false,
        loader: true
    }),
    validations: {
        name: {required, minLength: minLength(2)},
        region: {required, minLength: minLength(2)},
        area: {required, minLength: minLength(2)},
    },
    mounted() {
        this.getTowns()
        this.getTownStates()
    },
    methods: {
        async getTowns() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/town`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.towns = result.data
                this.loader = false
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        async getTownStates() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/townstate`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.regionNames = result.data.regions
                this.areaNames = result.data.areas
                this.areaNames.sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                });
                this.loader = false
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        async createTown() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                name: this.name,
                region: this.region,
                area: this.area
            }
            try  {
                await this.$store.dispatch('createTown', formData)
                this.name = ''
                this.region = ''
                this.area = ''
                this.getTowns()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showEdit(id, name, region, area) {
           this.showModalEdit = !this.showModalEdit
           this.id = id
           this.name = name
           this.region = region
           this.area = area
        },
        ChangeModalEdit(data) {
            this.showModalEdit = data
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
        }
    },
    components: {
        ModalEditTownCreate,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-form {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-form__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
        margin-top: 15px;
    }
    .town-form__create {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .town-form__create--input {
        margin-left: 10px;
        &:first-child {
            margin-left: 0px;
        }
    }
    .town-form__create--select {
        margin-left: -21px;
        border: 1px solid #000;
        border-radius: 4px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-bottom: 0px;
        border-top: 0px;
        border-right: 0px;
        color: #000;
        font-size: 16px;
        width: 20px;
        font-weight: 400;
        height: 28px;
    }
    .town-form__create--button {
        background: #00a814;
        margin-top: 10px;
        border: none;
        display: block;
    }
    .town-list {
        margin-bottom: 30px;
    }
    .town-list__box-head {
        display: flex;
        background: #ccc;
    }
    .town-list__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
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
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
        overflow: hidden;
    }
    .town-list__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 500px) {
    .town-list__box-head {
        display: none;
    }
    .town-list__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .town-list__item-body--responsive {
        display: inline-block;
    }
    .town-form__create--input {
        width: 96%;
        margin-bottom: 10px;
    }
}
</style>