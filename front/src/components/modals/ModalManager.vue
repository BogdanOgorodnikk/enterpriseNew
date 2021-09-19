<template>
    <div class="modal-manager">
        <div class="opinion" @click.self="RemoveModal"></div>
            <div class="modal-manager__box">
                <h2 class="modal-manager__headline">Закріплення менеджерів</h2>
                <form class="modal-manager__form" @submit.prevent="updateTownManagers">
                    <h3 class="modal-manager__form--text">Основний менеджер </h3>
                    <select class="modal-manager__form--select" v-model="manager_id">
                        <option class="modal-manager__form--option" v-for="usersList in usersLists" :key="usersList.id" :value="usersList.id" :selected="manager_id === usersList.id">{{usersList.login}}</option>
                    </select>
                    <h3 class="modal-manager__form--text">Запасний менеджер №1</h3>
                    <select class="modal-manager__form--select" v-model="safemanager_id">
                        <option class="modal-manager__form--option" v-for="usersList in usersLists" :key="usersList.id" :value="usersList.id" :selected="safemanager_id === usersList.id">{{usersList.login}}</option>
                    </select>
                    <h3 class="modal-manager__form--text">Запасний менеджер №2</h3>
                    <select class="modal-manager__form--select" v-model="securitymanager_id">
                        <option class="modal-manager__form--option" v-for="usersList in usersLists" :key="usersList.id" :value="usersList.id" :selected="securitymanager_id === usersList.id">{{usersList.login}}</option>
                    </select>
                    <h3 class="modal-manager__form--text">Запасний менеджер №3</h3>
                    <select class="modal-manager__form--select" v-model="second_security_manager_id">
                        <option class="modal-manager__form--option" v-for="usersList in usersLists" :key="usersList.id" :value="usersList.id" :selected="second_security_manager_id === usersList.id">{{usersList.login}}</option>
                    </select>
                    <h3 class="modal-manager__form--text">Запасний менеджер №4</h3>
                    <select class="modal-manager__form--select" v-model="third_security_manager_id">
                        <option class="modal-manager__form--option" v-for="usersList in usersLists" :key="usersList.id" :value="usersList.id" :selected="third_security_manager_id === usersList.id">{{usersList.login}}</option>
                    </select>
                    <div class="modal-manager__form--block">
                        <input type="submit" value="Закріпити" class="modal-manager__form--button button">
                        <button @click.prevent="RemoveModal" class="modal-manager__form--button button">Відмінити</button>
                    </div>
                </form>
            </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "ModalManager",
    props: ['showModalManager', 'id'],
    data: () => ({
        usersLists: [],
        towns: [],
        manager_id: '',
        safemanager_id: '',
        securitymanager_id: '',
        second_security_manager_id: '',
        third_security_manager_id: '',
    }),
    mounted() {
        this.getAllUsers()
        this.getTownManagers()
    },
    methods: {
        async getAllUsers() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allusers`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                const dataResult = result.data
                dataResult.forEach(element => {
                    if(element.role_id == 5) {
                        this.usersLists.push(element)
                    }
                });
            } catch (e) {
                alert("Відбулася помилка")
            }
        },
        async getTownManagers() {
            try {
                const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/town/${this.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.manager_id = result.data[0].manager_id
                this.safemanager_id = result.data[0].safemanager_id
                this.securitymanager_id = result.data[0].securitymanager_id
                this.second_security_manager_id = result.data[0].second_security_manager_id
                this.third_security_manager_id = result.data[0].third_security_manager_id
            } catch (e) {
                alert("Відбулася помилка")
            }
        },
        async updateTownManagers() {
            const formData = {
                id: this.id, 
                manager_id: this.manager_id, 
                safemanager_id: this.safemanager_id, 
                securitymanager_id: this.securitymanager_id,
                second_security_manager_id: this.second_security_manager_id,
                third_security_manager_id: this.third_security_manager_id,
            }
            try  {
                await this.$store.dispatch('updateTownManagers', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showModalManager = !this.showModalManager
            this.$emit('Cancel', this.showModalManager)
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        background: rgba(0,0,0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .modal-manager__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 430px;
        position: fixed;
        left: 34%;
        top: 10%;
        border-radius: 8px;
    }
    .modal-manager__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-manager__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-manager__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    .modal-manager__form--select {
        font-size: 16px;
        background: none;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 5px;
        margin-bottom: 5px;
    }
    .modal-manager__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-manager__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
@media screen and (max-width: 1000px) {
    .modal-manager__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-manager__box {
        left: 0%;
    }
}
@media screen and (max-width: 250px) {
    .modal-manager__box {
        height: 360px;
    }
    .modal-manager__form--block {
        display: block;
    }
    .modal-manager__form--button {
        margin: 10px 0px;
    }
}
</style>