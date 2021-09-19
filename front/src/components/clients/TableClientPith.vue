<template>
    <Loader v-if="loader" />
    <div class="table-pith" v-else>
        <div class="container">
            <h2 class="table-pith__headline">Залишкі клієнта: <span class="table-pith__headline--span">{{client[0].name}}</span></h2>
            <router-link class="table-pith__back" :to="{name: 'Clients', params: {id: this.$route.params.id}}">Повернутися назад до замовлень {{client[0].name}}</router-link>
            <button class="table-pith__button button" @click.prevent="showModalAdd">Створити залишки</button>
            <div class="table-pith__sum">
                Сума залишків клієнта: <span class="table-pith__sum--span">{{Math.round(sumPith[0].sumPith)}}</span>
            </div>
            <div class="table-pith__box-head">
                <div class="table-pith__item-head">
                    №
                </div>
                <div class="table-pith__item-head">
                    Дата
                </div>
                <div class="table-pith__item-head"  v-if="user.role_id == 1">
                    Дата створення
                </div>
                <div class="table-pith__item-head">
                    Назва товару
                </div>
                <div class="table-pith__item-head">
                    Кількість
                </div>
                <div class="table-pith__item-head">
                    Ціна
                </div>
                <div class="table-pith__item-head">
                    Ціна мішка
                </div>
                <div class="table-pith__item-head">
                    Розраховувати
                </div>
                <div class="table-pith__item-head"  v-if="user.role_id == 1">
                    Створив
                </div>
                <div class="table-pith__item-head"  v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="table-pith__item-head"  v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="table-pith__box-body" v-for="(pith, index) in piths" :key="pith.id">
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">Дата: </span>{{pith.data}}
                </div>
                <div class="table-pith__item-body"  v-if="user.role_id == 1">
                    <span class="table-pith__item-body--responsive">Дата створення: </span>{{dateFormatForCreateItem(pith.data_create)}}
                </div>
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">Назва залишків: </span>{{pith.name}}
                </div>
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">Кількість: </span>{{pith.number}}
                </div>
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">Ціна: </span>{{pith.price_cash}}
                </div>
                <div class="table-pith__item-body">
                    <span class="table-pith__item-body--responsive">Ціна роздрібна: </span>{{pith.price_rosdb}}
                </div>
                <div class="table-pith__item-body" :class="{agree: pith.math == 1, disagree: pith.math == 0}">
                    <span class="table-pith__item-body--responsive">Розраховувати: </span><input type="checkbox" class="table-pith__item-body--check" :checked="pith.math == 1" @click.prevent="updateMathPith(pith.id, !pith.math)">
                </div>
                <div class="table-pith__item-body" v-if="user.role_id == 1">
                    <span class="table-pith__item-body--responsive">Створив: </span>{{pith.login}}
                </div>
                <div class="table-pith__item-body edit"  v-if="user.role_id == 1" @click.prevent="showModalEdit(pith.id, pith.data, pith.name, pith.number, pith.price_cash, pith.price_rosdb)">
                    Редагувати
                </div>
                <div class="table-pith__item-body delete"  v-if="user.role_id == 1" @click.prevent="deletePith(pith.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalAddPith  v-if="modalAdd" 
            :modalAdd = "modalAdd"
            @CancelAdd="ChangeModalAdd"
        />
        <ModalEditPith v-if="modalEdit" 
            :modalEdit = "modalEdit"
            :id = "id"
            :data = "data"
            :name = "name"
            :number = "number"
            :price_cash = "price_cash"
            :price_rosdb = "price_rosdb"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalAddPith from '../modals/ModalAddPith'
import ModalEditPith from '../modals/ModalEditPith'
import Loader from '../app/Loader'
import axios from 'axios'
import {format} from "date-fns";

export default {
    name: "TableClientPith",
    data: () => ({
        piths: [],
        town: [],
        client: [],
        sumPith: [],
        id: '', 
        data: '', 
        name: '', 
        number: '',
        price_cash: '', 
        price_rosdb: '',
        math: '',
        modalAdd: false,
        modalEdit: false,
        loader: true
    }),
    mounted() {
        this.getPiths()
    },
    methods: {
      dateFormatForCreateItem(date) {
        const hour = format(new Date(date), 'HH')

        const formatDate = format(new Date(date), `yyyy-MM-dd ${+hour + 3}:mm`)

        return formatDate;
      },

        async getPiths() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/pith/${this.$route.params.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.piths = result.data.piths.reverse()
                this.client = result.data.client
                this.town = result.data.town
                this.sumPith = result.data.sumPith
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async updateMathPith(id, math) {
            try {
                const formData = {
                    id: id,
                    math: math
                }
                await this.$store.dispatch('updateMathPith', formData)
                this.getPiths()
            } catch (e) {
                alert("Відбулася помилка")
            }
        },
        async deletePith(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/pith/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getPiths()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showModalAdd() {
            this.modalAdd = !this.modalAdd
        },
        showModalEdit(id, data, name, number, price_cash, price_rosdb) {
            this.modalEdit = !this.modalEdit
            this.id = id
            this.data = data
            this.name = name
            this.number = number
            this.price_cash = price_cash
            this.price_rosdb = price_rosdb
        },
        ChangeModalAdd(data) {
            this.modalAdd = data
            this.getPiths()
        },
        ChangeModalEdit(data) {
            this.modalEdit = data
            this.getPiths()
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        ModalAddPith,
        ModalEditPith,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .table-pith {
        margin-top: 30px;
    }
    .table-pith__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .table-pith__headline--span {
        font-weight: 400;
    }
    .table-pith__back {
        color: #000;
        margin-top: 5px;
    }
    .table-pith__button {
        display: block;
        background: #00a814;
        border: none;
        margin-top: 10px;
    }
    .table-pith__sum {
        border: 1px solid #000;
        width: 100%;
        padding: 5px;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 400;
    }
    .table-pith__sum--span {
        font-weight: 700;
    }
    .table-pith__box-head {
        display: flex;
        background: #ccc;
    }
    .table-pith__item-head {
        border: 1px solid #000;
        padding: 5px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        color: #000;
        overflow: hidden;
    }
    .table-pith__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .table-pith__item-body {
        border: 1px solid #000;
        padding: 5px;
        width: 100%;
        font-size: 16px;
        overflow: hidden;
    }
    .table-pith__item-body--check {
        display: block;
        margin: 5px auto;
    }
    .table-pith__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 700px) {
    .table-pith__box-head {
        display: none;
    }
    .table-pith__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .table-pith__item-body--responsive {
        display: inline-block;
    }
    .table-pith__item-body--check {
        margin: 0px 0px 0px 5px;
        display: inline-block;
    }
}
</style>