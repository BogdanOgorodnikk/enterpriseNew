<template>
  <div class="modal-order">
    <div class="opinion" @click.self="RemoveModal"></div>
    <div class="modal-order__box">
      <h2 class="modal-order__headline">Оформлення замовлення №{{orderIndex}} <br /> клієнта {{clientName}}</h2>
      <form class="modal-order__form" @submit.prevent="createOrder">
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Номер замовлення</label>
          <input type="text" class="modal-order__form--input input" placeholder="Номер замовлення" v-model="order_number"
                 :class="{invalid: ($v.order_number.$dirty && !$v.order_number.required)}"
          >
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Форма</label>
          <input type="text" class="modal-order__form--input input" placeholder="Форма" v-model="note">
          <select class="modal-order__form--select-input" v-model="note">
            <option v-for="note_name in note_names" :key="note_name.id" :value="note_name.name">{{note_name.name}}</option>
          </select>
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Номер машини</label>
          <input type="text" class="modal-order__form--input input" placeholder="Номер машини" v-model="car_number"
                 :class="{invalid: ($v.car_number.$dirty && !$v.car_number.required)}"
          >
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Назва фірми</label>
          <input type="text" class="modal-order__form--input input" placeholder="Назва фірми" v-model="firm"
                 :class="{invalid: ($v.firm.$dirty && !$v.firm.required)}"
          >
          <select class="modal-order__form--select-input" v-model="firm">
            <option v-for="firm_name in firm_names" :key="firm_name.id" :value="firm_name.name">{{firm_name.name}}</option>
          </select>
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Область</label>
          <input type="text" class="modal-order__form--input input" placeholder="Область" v-model="region"
                 :class="{invalid: ($v.region.$dirty && !$v.region.required)}"
          >
          <select class="modal-order__form--select-input" v-model="region">
            <option v-for="region in regions" :key="region.id" :value="region.name">{{region.name}}</option>
          </select>
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Дата</label>
          <input type="date" class="modal-order__form--input input" placeholder="Дата" v-model="data"
                 :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
          >
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Назва товару</label>
          <input type="text" class="modal-order__form--input input" placeholder="Назва товару" v-model="product_name"
                 :class="{invalid: ($v.product_name.$dirty && !$v.product_name.required)}"
          >
          <select class="modal-order__form--select-input" v-model="product_name">
            <option v-for="product_name in product_names" :key="product_name.id" :value="product_name.name">{{product_name.name}}</option>
          </select>
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Кількість</label>
          <input type="text" class="modal-order__form--input input" placeholder="Кількість" v-model="count"
                 :class="{invalid: ($v.count.$dirty && !$v.count.required)}"
          >
          <select class="modal-order__form--select-input" v-model="count">
            <option v-for="mas_number in mas_numbers" :key="mas_number.id" :value="mas_number.number">{{mas_number.number}}</option>
          </select>
        </div>
        <div class="modal-order__form--info-block" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
          <label class="modal-order__form--text">Ціна продажу</label>
          <input type="text" class="modal-order__form--input input" placeholder="Кількість" v-model="price_cash">
        </div>
        <div class="modal-order__form--info-block" v-if="delivery_cashless == 0">
          <label class="modal-order__form--text">Доставка(самовивіз)</label>
          <input type="text" class="modal-order__form--input input" placeholder="Доставка" v-model="delivery_cash"
          >
        </div>
        <div class="modal-order__form--info-block" v-if="delivery_cash == 0">
          <label class="modal-order__form--text">Доставка безготівка</label>
          <input type="text" class="modal-order__form--input input" placeholder="Доставка безготівка" v-model="delivery_cashless"
          >
        </div>
        <div class="modal-order__form--info-block">
          <label class="modal-order__form--text">Оптова ціна</label>
          <input type="text" class="modal-order__form--input input" placeholder="Оптова ціна" v-model="opt_price"
                 :class="{invalid: ($v.opt_price.$dirty && !$v.opt_price.required)}"
          >
          <select class="modal-order__form--select-input" v-model="opt_price">
            <option v-for="opt_price in sortOptPrice" :key="opt_price.id" :value="opt_price.number">{{opt_price.firm_name}} {{opt_price.number}}</option>
          </select>
        </div>
        <div class="modal-order__form--block">
          <input type="submit" class="modal-order__form--button button" value="Оформити">
          <button @click.prevent="RemoveModal" class="modal-order__form--button button">Відмінити</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from "axios";
import {format} from "date-fns";

export default {
  name: "ModalEditOrder",
  props: ['showModal', 'orderIndex', 'clientName', 'id', 'note', 'product_name', 'count', 'client_id', 'price_cash'],
  data: () => ({
    order_number: '',
    car_number: '',
    firm: '',
    region: '',
    data: '',
    opt_price: '',
    delivery_cash: '',
    delivery_cashless: '',
    note_names: [],
    product_names: [],
    firm_names: [],
    opt_prices: [],
    mas_numbers: [],
    regions: [],
  }),
  validations: {
    order_number: {required},
    car_number: {required},
    firm: {required},
    region: {required},
    data: {required},
    product_name: {required},
    count: {required},
    opt_price: {required},
  },

  computed: {
    sortOptPrice() {
      return this.opt_prices.filter((item) => {
        if(item.firm_name === this.firm) {
          return item
        } else if(!this.firm) {
          return item;
        }
      })
    },
    user() {
      return this.$store.state.auth.newuser.user
    }
  },

  mounted() {
    this.getordersInfo()
  },

  methods: {
    async getordersInfo() {
      try {
        const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/ordersinfo/64`,{
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        this.note_names = result.data.note
        this.product_names = result.data.product_name
        this.firm_names = result.data.firm_name
        this.opt_prices = result.data.opt_price
        this.mas_numbers = result.data.mas_number
        this.regions = result.data.region

        this.opt_prices.sort(function(a, b) {
          if(a.firm_name.toLowerCase() < b.firm_name.toLowerCase()) { return -1; }
          if(a.firm_name.toLowerCase() > b.firm_name.toLowerCase()) { return 1; }
          return 0;
        });
      } catch(e) {
        alert('Відбулася помилка')
      }
    },

    async createOrder() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formatDate = format(new Date(this.data), 'yyyy-MM-dd')

      const formData = {
        id: this.id,
        order_number: this.order_number,
        note: this.note,
        car_number: this.car_number,
        firm: this.firm,
        region: this.region,
        data: formatDate,
        product_name: this.product_name,
        count: this.count,
        delivery_cash: this.delivery_cash,
        delivery_cashless: this.delivery_cashless,
        opt_price: this.opt_price,
        client_id: this.client_id,
        price_cash: this.price_cash
      }
      try  {
        await this.$store.dispatch('createUpdatePrepareOrder', formData)
        this.RemoveModal()
      } catch (e) {
        alert('Відбулася помилка')
      }
    },
    RemoveModal() {
      this.showModal = !this.showModal
      this.$emit('CancelEdit', this.showModal)
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
.modal-order__box {
  background: #fff;
  max-width: 500px;
  width: 100%;
  position: fixed;
  left: 34%;
  top: 4%;
  border-radius: 8px;
}
.modal-order__headline {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}
.modal-order__form {
  margin-left: 10px;
  margin-top: 10px;
}
.modal-order__form--text {
  font-size: 16px;
  font-weight: 400;
  margin-right: 5px;
}
.modal-order__form--block {
  display: flex;
  margin-top: 26px;
}
.modal-order__form--button {
  display: block;
  margin: 0 auto;
  width: 40%;
  background: #00a814;
  border: none;
  margin-bottom: 20px;
  &:last-child {
    background: #e51f1f;
  }
}
.modal-order__form--input {
  width: 54%;
  margin-right: 10px;
}
.modal-order__form--info-block {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.modal-order__form--select {
  border: 1px solid #000;
  padding: 5px;
  border-radius: 4px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  width: 48%;
  margin-right: 10px;
}
.modal-order__form--select-input {
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
  position: absolute;
  top: 1px;
  right: 11px;
}
@media screen and (max-width: 1000px) {
  .modal-order__box {
    left: 20%;
  }
}
@media screen and (max-width: 638px) {
  .modal-order__box {
    left: 0%;
  }
}
@media screen and (max-width: 288px) {
  .modal-order__box {
    height: 640px;
  }
}
</style>