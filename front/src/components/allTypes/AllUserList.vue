<template>
    <Loader v-if="loader" />
    <div class="user-list" v-else-if="user.role_id == 1">
        <div class="container">
            <div class="user-list__box-head">
                <div class="user-list__item-head">
                    Логін користувача
                </div>
                <div class="user-list__item-head">
                    Заблокувати користувача
                </div>
                <div class="user-list__item-head">
                    Роль адміністратора
                </div>
                <div class="user-list__item-head">
                    Роль логіста
                </div>
                <div class="user-list__item-head">
                    Роль бухгалтера
                </div>
                <div class="user-list__item-head">
                    Роль бухгалтера безготівки
                </div>
                <div class="user-list__item-head">
                    Роль менеджера
                </div>
                <div class="user-list__item-head">
                    Редагувати
                </div>
            </div>
            <div class="user-list__box-body" v-for="usersList in usersLists" :key="usersList.id">
                <div class="user-list__item-body">
                    <span class="user-list__item-body--responsive">Логін користувача: </span>{{usersList.login}}
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.ban}">
                    <span class="user-list__item-body--responsive">Заблокувати користувача: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.ban" @click.prevent="updateUserStats(usersList.id, usersList.role_id, !usersList.ban)">
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.role_id == 1}">
                    <span class="user-list__item-body--responsive">Роль адміністратора: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.role_id == 1" @click.prevent="updateUserStats(usersList.id, 1, usersList.ban)">
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.role_id == 2}">
                    <span class="user-list__item-body--responsive">Роль логіста: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.role_id == 2" @click.prevent="updateUserStats(usersList.id, 2, usersList.ban)">
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.role_id == 3}">
                    <span class="user-list__item-body--responsive">Роль бухгалтера: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.role_id == 3" @click.prevent="updateUserStats(usersList.id, 3, usersList.ban)">
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.role_id == 4}">
                    <span class="user-list__item-body--responsive">Роль бухгалтера безготівки: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.role_id == 4" @click.prevent="updateUserStats(usersList.id, 4, usersList.ban)">
                </div>
                <div class="user-list__item-body" :class="{agree: usersList.role_id == 5}">
                    <span class="user-list__item-body--responsive">Роль менеджера: </span><input type="checkbox" class="user-list__item-body--check" :checked="usersList.role_id == 5" @click.prevent="updateUserStats(usersList.id, 5, usersList.ban)">
                </div>
                <div class="user-list__item-body edit" @click.prevent="showEdit(usersList.id, usersList.login, usersList.password)">
                    Редагувати
                </div>
            </div>
        </div>
        <ModalEditUser v-if="modalEdit"
            :modalEdit = "modalEdit"
            :id = "id"
            :login = "login"
            :password = "password"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditUser from '../modals/ModalEditUser'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "AllUserList",
        data: () => ({
        usersLists: [],
        id: '',
        login: '',
        ban: '',
        role_id: '',
        modalEdit: false,
        loader: true
    }),
    mounted() {
        this.getAllUsers()
    },
    methods: {
        async getAllUsers() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allusers`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.usersLists = result.data
                this.loader = false
            } catch (e) {
                alert("Відбулася помилка")
            }
        },
        async updateUserStats(id, role_id, ban) {
            const formData = {
                id: id, 
                role_id: role_id, 
                ban: ban
            }
            try  {
                await this.$store.dispatch('updateUser', formData)
                this.getAllUsers()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showEdit(id, login, password) {
           this.modalEdit = !this.modalEdit 
           this.id = id
           this.login = login
           this.password = password
        },
        ChangeModalEdit(data) {
            this.modalEdit = data
            this.getAllUsers()
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        ModalEditUser,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .user-list {
        margin: 30px 0px;
    }
    .user-list__box-head {
        display: flex;
        background: #ccc;
    }
    .user-list__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        padding: 5px;
        overflow: hidden;
    }
    .user-list__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .user-list__item-body {
        border: 1px solid #000;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        padding: 5px;
        overflow: hidden;
    }
    .user-list__item-body--check {
        display: block;
        margin: 3px auto;
    }
    .user-list__item-body--responsive {
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
    .user-list__box-head {
        display: none;
    }
    .user-list__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .user-list__item-body--responsive {
        display: inline-block;
    }
    .user-list__item-body--check {
        margin: 0px 0px 0px 2px;
        display: inline-block;
    }
}
</style>