<template>
    <Loader v-if="loader" />
    <div class="town-list" v-else>
        <div class="container">
            <h2 class="town-form__headline">Створення кількості тон</h2>
            <form class="town-form__create" @submit.prevent="createMasNumber">
                <input type="text" class="town-form__create--input input" placeholder="Кількість тон" v-model="number"
                    :class="{invalid: ($v.number.$dirty && !$v.number.required)}"
                >
                <input type="submit" value="Створити" class="town-form__create--button button">
            </form>
            <div class="town-list__box-head">
                <div class="town-list__item-head">
                    Кількість тон
                </div>
                <div class="town-list__item-head">
                    Редагувати
                </div>
                <div class="town-list__item-head">
                    Видалити
                </div>
            </div>
            <div class="town-list__box-body" v-for="masnumber in masnumbers" :key="masnumber.id">
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Кількість тон: </span>{{masnumber.number}}
                </div>
                <div class="town-list__item-body edit" @click.prevent="showEdit(masnumber.id, masnumber.number)">
                    Редагувати
                </div>
                <div class="town-list__item-body delete" @click.prevent="deleteMasNumber(masnumber.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditMasNumbers v-if="showModalEdit" 
            :showModalEdit = "showModalEdit"
            :id = "id"
            :number = "number"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditMasNumbers from '../modals/ModalEditMasNumbers'
import Loader from '../app/Loader'
import axios from 'axios'
import {required} from 'vuelidate/lib/validators'

export default {
    name: "CreateMasList",
    data: () => ({
        id: '',
        number: '',
        masnumbers: [],
        showModalEdit: false,
        loader: true
    }),
    validations: {
        number: {required}
    },
    mounted() {
        this.getMasNumbers()
    },
    methods: {
        async getMasNumbers() {
          try {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/masnumber`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.masnumbers = result.data
            this.loader = false
          } catch (e) {
              alert('Відбулася помилка')
          }
        },
        async createMasNumber() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                number: this.number
            }

            await this.$store.dispatch('createMasNumber', formData)
            this.number = ''
            this.getMasNumbers()
        },
        async deleteMasNumber(id) {
            try  {
              const agree = prompt("Введіть пароль для видалення?")
              if(agree === "1111") {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/masnumber/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getMasNumbers()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showEdit(id, number) {
           this.showModalEdit = !this.showModalEdit
           this.id = id
           this.number = number
        },
        ChangeModalEdit(data) {
            this.showModalEdit = data
            this.number = ''
            this.getMasNumbers()
        }
    },
    components: {
        ModalEditMasNumbers,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-form {
        margin: 30px
    }
    .town-form__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .town-form__create {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .town-form__create--button {
        background: #00a814;
        margin-left: 10px;
        border: none;
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
    .town-form__create--button {
        display: block;
        margin-left: 0px;
        margin-top: 10px;
    }
}
</style>