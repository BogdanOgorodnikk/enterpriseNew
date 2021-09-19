<template>
    <Loader v-if="loader" />
    <div class="clients-list" v-else>
        <div class="container">
            <div class="clients-list__head">
                <h3 class="clients-list__head--headline">
                    Місто: <span class="clients-list__headline--span">{{townName[0].name}}</span>
                </h3>
                <button class="clients-list__head--button button" @click.prevent="showAdd" v-if="user.role_id == 1 || user.role_id == 2">Добавити клієнта</button>
            </div>
            <div class="clients-list__box-head"
                :class="{fixed: fix}"
            >
                <div class="clients-list__item-head">
                    Ім'я клієнта
                </div>
                <div class="clients-list__item-head" v-if="user.role_id == 1 || user.role_id == 3">
                    Борг клієнта
                </div>
                <div class="clients-list__item-head" v-if="user.role_id == 1 || user.role_id == 3">
                    Сума залишків клієнта
                </div>
                <div class="clients-list__item-head" v-if="user.role_id == 1 || user.role_id == 3">
                    Сума проданого товару
                </div>
                <div class="clients-list__item-head">
                    Карточка клієнта
                </div>
                <div class="clients-list__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 5">
                    Редагувати
                </div>
                <div class="clients-list__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="clients-list__box-body" v-for="client in clients" :key="client.id">
                <router-link class="clients-list__item-body" :to="{name: 'Clients', params: {id: client.id}}">
                    <span class="clients-list__item-body--responsive">Ім'я клієнта: </span>{{client.name}}
                </router-link>
                <div class="clients-list__item-body" v-if="user.role_id == 1 || user.role_id == 3">
                    <span class="clients-list__item-body--responsive">Борг клієнта: </span>{{Math.round(client.sumDebt)}}
                </div>
                <div class="clients-list__item-body" v-if="user.role_id == 1 || user.role_id == 3">
                    <span class="clients-list__item-body--responsive">Сума залишків клієнта: </span>{{Math.round(client.sumPith) || 0}}
                </div>
                <div class="clients-list__item-body" v-if="user.role_id == 1 || user.role_id == 3">
                    <span class="clients-list__item-body--responsive">Сума проданого товару: </span>{{Math.round(client.sumSeller)}}
                </div>
                <div class="clients-list__item-body card" @click.prevent="showCard(client.name, client.phone, client.reserve_name, client.reserve_phone, client.shop_name, client.shop_street)">
                    Карточка клієнта
                </div>
                <div class="clients-list__item-body edit" @click.prevent="showEdit(client.id, client.name, client.phone, client.reserve_name, client.reserve_phone, client.shop_name, client.shop_street)" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 5">
                    Редагувати
                </div>
                <div class="clients-list__item-body delete" @click.prevent="deleteTown(client.id)" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditClient v-if="showModalEdit"
            :showModalEdit = "showModalEdit"
            @CancelEdit="ChangeModalEdit"
            :id = "id"
            :name = "name"
            :phone = "phone"
            :reserveName = "reserveName"
            :reservePhone = "reservePhone"
            :shopName = "shopName"
            :shopStreet = "shopStreet"
         />
        <ModalAddClient v-if="showModalAdd" 
            :showModalAdd = "showModalAdd"
            :townId = "townId"
            @CancelAdd="ChangeModalAdd"
        />
        <ModalCardClient v-if="showModalCard" 
            :showModalCard = "showModalCard"
            @CancelCard="ChangeModalCard"
            :name = "name"
            :phone = "phone"
            :reserveName = "reserveName"
            :reservePhone = "reservePhone"
            :shopName = "shopName"
            :shopStreet = "shopStreet"
        />
    </div>
</template>

<script>
import ModalEditClient from '../modals/ModalEditClient'
import ModalAddClient from '../modals/ModalAddClient'
import ModalCardClient from '../modals/ModalCardClient'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "ClientsList",
    data: () => ({
        clients: [],
        orderSums: [],
        pithSums: [],
        id: '',
        name: '',
        phone: '',
        reserveName: '',
        reservePhone: '',
        shopName: '',
        shopStreet: '',
        townId: '',
        townName: '',
        showModalEdit: false,
        showModalAdd: false,
        showModalCard: false,
        fix: false,
        loader: true
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 115) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getClients()
    },
    methods: {
        async getClients() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/client/${this.$route.params.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.clients = result.data.client
                this.clients.sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                });
                this.townName = result.data.townManagers
                this.orderSums = result.data.orderSum
                this.pithSums = result.data.pithSum
                if(this.$store.state.auth.newuser.user.role_id == 1 || this.$store.state.auth.newuser.user.role_id == 3) {
                    this.clients.forEach(element => {
                        this.orderSums.forEach(item => {
                            if(element.id == item.id) {
                                element.sumDebt = item.sumDebt
                            }
                        });
                        this.pithSums.forEach(item => {
                            if(element.id == item.id) {
                                element.sumPith = item.sumPith
                            }
                        });
                        element.sumSeller = element.sumDebt - element.sumPith || 0
                    });    
                }
                this.loader = false
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showEdit(id, name, phone, reserveName, reservePhone, shopName, shopStreet) {
            this.showModalEdit = !this.showModalEdit 
            this.id = id
            this.name = name
            this.phone = phone
            this.reserveName = reserveName
            this.reservePhone = reservePhone
            this.shopName = shopName
            this.shopStreet = shopStreet
        },
        showAdd() {
           this.showModalAdd = !this.showModalAdd
           this.townId = this.$route.params.id
        },
        showCard(name, phone, reserveName, reservePhone, shopName, shopStreet) {
            this.showModalCard = !this.showModalCard 
            this.name = name
            this.phone = phone
            this.reserveName = reserveName
            this.reservePhone = reservePhone
            this.shopName = shopName
            this.shopStreet = shopStreet
        },
        ChangeModalEdit(data) {
            this.showModalEdit = data
            this.getClients()
        },
        ChangeModalAdd(data) {
            this.showModalAdd = data
            this.getClients()
        },
        ChangeModalCard(data) {
            this.showModalCard = data
        },
        async deleteTown(id) {
            try  {
                const agree = prompt("Введіть пароль для видалення?")
                if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/client/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getClients()
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
        ModalEditClient,
        ModalAddClient,
        ModalCardClient,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .clients-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .clients-list__head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .clients-list__head--headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .clients-list__headline--span {
        font-weight: 400;
    }
    .clients-list__head--button {
        background: #00a814;
        border: none;
    }
    .clients-list__box-head {
        display: flex;
    }
    .clients-list__item-head {
        border: 1px solid #000;
        width: 100%;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        overflow: hidden;
        background: #ccc;
    }
    .clients-list__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.5);
        }
    }
    .clients-list__item-body {
        border: 1px solid #000;
        width: 100%;
        padding: 5px;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .clients-list__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 500px) {
    .clients-list__head {
        display: block;
    }
    .clients-list__head--button {
        margin-top: 10px;
    }
    .clients-list__box-head {
        display: none;
    }
    .clients-list__box-body {
        display: block;
        margin-top: 15px;
    }
    .clients-list__item-body {
        display: block;
    }
    .clients-list__item-body--responsive {
        display: inline-block;
    }
}
</style>