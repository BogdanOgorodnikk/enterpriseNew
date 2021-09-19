<template>
  <div class="create-money">
    <div class="container">
      <div>
        <button class="create-money__button button" @click.prevent="showPrepareOrder">Створити попереднє замовлення</button>
        <transition name="form-fade">
          <form class="create-money__form" v-if="showForm" @submit.prevent="createMoneyPay">
            <input type="text" class="create-money__form--input input" placeholder="Форма" v-model="note"
                   :class="{invalid: ($v.note.$dirty && !$v.note.required)}"
            >
            <select class="create-order__form--select" v-model="note">
              <option v-for="note_name in note_names" :key="note_name.id" :value="note_name.name">{{note_name.name}}</option>
            </select>
            <input type="text" class="create-money__form--input input" placeholder="Назва продукта" v-model="productName"
                   :class="{invalid: ($v.productName.$dirty && !$v.productName.required)}"
            >
            <select class="create-order__form--select" v-model="productName">
              <option v-for="product_name in product_names" :key="product_name.id" :value="product_name.name">{{product_name.name}}</option>
            </select>
            <input type="text" class="create-money__form--input input" placeholder="Кількість" v-model="count"
                   :class="{invalid: ($v.count.$dirty && !$v.count.required)}"
            >
            <select class="create-order__form--select" v-model="count">
              <option v-for="mas_number in mas_numbers" :key="mas_number.id" :value="mas_number.number">{{mas_number.number}}</option>
            </select>

            <input v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5" type="text" class="create-money__form--input input" placeholder="Ціна продажу" v-model="priceCash">

            <input type="submit" class="create-money__form--button button" value="Створити">
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from "axios";

export default {
  name: "createMoney",
  data: () => ({
    note: '',
    productName: '',
    count: '',
    priceCash: '',
    client_id: '',
    note_names: [],
    product_names: [],
    mas_numbers: [],
    showForm: false
  }),
  validations: {
    note: {required},
    productName: {required},
    count: {required},
  },

  mounted() {
    this.getordersInfo()
  },

  methods: {
    async createMoneyPay() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        client_id: this.$route.params.id,
        note: this.note,
        productName: this.productName,
        count: this.count,
        price_cash: this.priceCash
      }

      try  {
        await this.$store.dispatch('createPrepareOrder', formData)

        this.note = ''
        this.productName = ''
        this.count = ''
        this.priceCash = ''
      } catch (e) {
        alert('Відбулася помилка' + e)
      }
    },

    async getordersInfo() {
      try {
        const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/ordersinfo/${this.$route.params.id}`,{
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        this.note_names = result.data.note
        this.product_names = result.data.product_name
        this.mas_numbers = result.data.mas_number
      } catch(e) {
        alert('Відбулася помилка')
      }
    },

    showPrepareOrder() {
      this.showForm = !this.showForm
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.newuser.user
    }
  }
}
</script>

<style lang="scss" scoped>
.create-money {
  margin-top: 15px;
  margin-bottom: 15px;
}
.create-money__button {
  display: block;
  border: none;
  background: #00a814;
  margin-top: 15px;
  margin-bottom: 5px;
}
.create-money__form--input {
  margin-left: 5px;
  margin-top: 5px;
  padding-right: 20px;
  &:first-child {
    margin-left: 0px;
  }
  &:nth-child(9) {
    margin-left: 0px;
  }
}
.create-money__form--button {
  background: #00a814;
  border: none;
  display: block;
  margin-top: 10px;
}
.form-fade-enter-active {
  transition: all .3s ease;
  transform: translateY(-1px);
}
.form-fade-leave-active {
  transition: all .3s ease;
}
.form-fade-enter, .form-fade-leave-to {
  transform: translateY(5px);
  opacity: 0;
}

.create-order__form--select {
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
@media screen and (max-width: 500px)  {
  .create-money__form--input {
    margin-left: 0px;
    width: 100%;
  }
}
</style>