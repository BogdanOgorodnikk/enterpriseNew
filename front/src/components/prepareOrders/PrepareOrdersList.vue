<template>
  <Loader v-if="loader" />
  <div v-else class="orders">
    <div class="container">
      <h3 class="sort-headline">Параметри сортування</h3>
      <form class="sort-form">
        <input class="sort-form-input input" type="text" placeholder="Прізвище" v-model="sortName">
        <input class="sort-form-input input" type="text" placeholder="Форма" v-model="sortNote">
        <input class="sort-form-input input" type="text" placeholder="Назва продукта" v-model="sortProduct">
        <input class="sort-form-input input" type="text" placeholder="Область" v-model="sortRegion">
      </form>

      <div class="order-table__box-head"
             :class="{fixed: fix}"
        >
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            №
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            № Замовлення
          </div>
          <div class="order-table__item-head">
            Ім'я клієнта
          </div>
          <div class="order-table__item-head">
            Форма
          </div>
        <div class="order-table__item-head">
          Коментар
        </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            Фірма
          </div>
          <div class="order-table__item-head">
            Дата
          </div>
        <div class="order-table__item-head">
          Просрочка
        </div>
          <div class="order-table__item-head" v-if="user.role_id == 1">
            Дата створення
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            Номер машини
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            Назва товару
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            Кількість
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 ||user.role_id == 5">
            Ціна продажу
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            Оптова
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 ">
            Доставка (самовивіз)
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2">
            Доставка безготівка
          </div>
          <div class="order-table__item-head">
            Область
          </div>
          <div class="order-table__item-head" v-if="user.role_id !== 5">
            Створив
          </div>
          <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 5">
            Редагувати замовлення
          </div>
        <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2">
          Оформити замовлення
        </div>
          <div class="order-table__item-head" v-if="user.role_id == 1">
            Видалити
          </div>
        </div>

      <div class="order-table__box-body" v-for="(order, index) in filteredProducts" :key="order.id"
           :class="{'not-cash': !order.car_number, 'agree-cash': order.region}"
      >
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            <span class="order-table__box-body--responsive">№: </span>{{index + 1}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            <span class="order-table__box-body--responsive">Номер замовлення: </span>{{order.order_number}}
          </div>
          <div class="order-table__item-body">
            <router-link :to="{name: 'Clients', params: {id: order.clientId}}"><span class="order-table__box-body--responsive">Ім'я клієнта: </span>{{order.clientName}}</router-link>
          </div>
          <div class="order-table__item-body">
            <span class="order-table__box-body--responsive">Форма: </span>{{order.note}}
          </div>
          <div class="order-table__item-body" @click="showModalComments(order.id, order.order_number)">
            <span class="order-table__box-body--responsive">Коментар: </span>
            <span v-if="order.comment" class="comment-is">Є коментар</span>
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            <span class="order-table__box-body--responsive">Назва фірми: </span>{{order.firm}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            <span class="order-table__box-body--responsive">Дата: </span>{{order.data}}
          </div>
          <div class="order-table__item-body">
            <span class="order-table__box-body--responsive">Просрочка: </span>{{order.delays}}
            <span v-if="order.delays">день</span>
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1">
            <span class="order-table__box-body--responsive">Дата створення: </span>{{order.data_create}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            <span class="order-table__box-body--responsive">Номер машини: </span>{{order.car_number}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            <span class="order-table__box-body--responsive">Назва продукта: </span>{{order.product_name}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
            <span class="order-table__box-body--responsive">Кількість: </span>{{order.count}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
            <span class="order-table__box-body--responsive">Ціна продажу: </span>{{order.price_cash}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
            <span class="order-table__box-body--responsive">Оптова ціна: </span>{{order.opt_price}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2">
            <span class="order-table__box-body--responsive">Доставка(самовивіз): </span>{{order.delivery_cash}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2">
            <span class="order-table__box-body--responsive">Доставка по безготівкі: </span>{{order.delivery_cashless}}
          </div>
          <div class="order-table__item-body">
            <span class="order-table__box-body--responsive">Область: </span>{{order.region}}
          </div>
          <div class="order-table__item-body" v-if="user.role_id !== 5">
            <span class="order-table__box-body--responsive">Створив: </span>{{order.login}}
          </div>
          <div class="order-table__item-body edit" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 5">
            <span v-if="!order.car_number" @click="showModalEditPrepareOrders(index+1, order.clientName, order.id, order.note, order.product_name, order.count, order.price_cash)">
              Редагувати замовлення
            </span>
          </div>
          <div class="order-table__item-body edit" v-if="user.role_id == 1 || user.role_id == 2">
              <span v-if="!order.car_number" @click="showModalPrepareOrders(index+1, order.clientName, order.id, order.note, order.product_name, order.count, order.client_id, order.price_cash)">
                Оформити замовлення
              </span>
          </div>
          <div class="order-table__item-body delete" v-if="user.role_id == 1">
            <span v-if="!order.car_number" @click.prevent="deletePrepareOrder(order.id)">Видалити</span>
          </div>
        </div>
    </div>
    <ModalCardPrepareOrder v-if="showModal"
                     :showModal = "showModal"
                     @CancelEdit="ChangeModal"
                           :id = "id"
                           :orderIndex = "orderIndex"
                           :clientName="clientName"
                           :note = "note"
                           :product_name = "product_name"
                           :count = "count"
                           :client_id = "client_id"
                           :price_cash="priceCash"
    />

    <ModalEditPrepareOrder  v-if="showEditOrderModal"
                            :showEditOrderModal = "showEditOrderModal"
                            @CancelEdit="ChangeEditModal"
                            :id = "id"
                            :orderIndex = "orderIndex"
                            :clientName="clientName"
                            :note = "note"
                            :product_name = "product_name"
                            :count = "count"
                            :price_cash="priceCash"
    />

    <ModalPrepareOrderComments v-if="showComments"
                   :showComments="showComments"
                   :id="id"
                   :orderNumber="order_number"
                   @CloseCommentsModal="ChangeCloseCommentsModal" />
  </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from "axios";
import ModalCardPrepareOrder from "../modals/ModalCardPrepareOrder"
import ModalEditPrepareOrder from "../modals/ModalEditPrepareOrder"
import ModalPrepareOrderComments from "../modals/ModalPrepareOrderComments"

export default {
  name: "PrepareOrdersList",
  data: () => ({
    id: '',
    note: '',
    product_name: '',
    count: '',
    client_id: '',
    orderIndex: '',
    clientName: '',
        sortName: '',
        sortNote: '',
        sortProduct: '',
    sortCount: '',
    sortRegion: '',
    order_number: '',
    priceCash: '',
    prepareOrders: [],
    showComments: false,
    fix: false,
    showModal: false,
    showEditOrderModal: false,
    loader: true
  }),
  mounted() {
    window.document.onscroll = () => {
      if(window.pageYOffset > 355) {
        this.fix = true
      } else {
        this.fix = false
      }
    },
        this.getPrepareOrders();
  },
  methods: {
    showModalComments(id, orderNumber) {
      this.showComments = !this.showComments
      this.id = id
      this.order_number = orderNumber
    },

    ChangeCloseCommentsModal(data) {
      this.showComments = data
      this.getPrepareOrders()
    },

    async getPrepareOrders() {
      try {
        const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/prepareorders`,{
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        this.prepareOrders = result.data.order.reverse().map((item) => ({
          id: item.id,
          order_number: item.order_number,
          clientId: item.clientId,
          client_id: item.client_id,
          clientName: item.clientName,
          comment: item.comment,
          count: item.count,
          price_cash: item.price_cash,
          note: item.note,
          firm: item.firm,
          data: item.data,
          delays: this.delayDaysdelayDays(item.data_create, item.region),
          data_create: item.data_create,
          car_number: item.car_number,
          product_name: item.product_name,
          opt_price: item.opt_price,
          delivery_cash: item.delivery_cash,
          delivery_cashless: item.delivery_cashless,
          creater: item.creater,
          region: item.region,
          login: item.login,
        }));

        this.prepareOrders.sort(function(a, b) {

          return b.delays - a.delays;
        });

        this.loader = false
      } catch(e) {
        alert('Відбулася помилка')
      }
    },
    async deletePrepareOrder(id) {
      try  {
        const agree = prompt("Введіть пароль для видалення?")
        if(agree === "1111") {
          await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/prepareorder/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          this.getPrepareOrders()
        }
      } catch (e) {
        alert('Відбулася помилка')
      }
    },

    delayDaysdelayDays(createdDate, region) {
      const today = new Date();
      const createdOn = new Date(createdDate);
      const msInDay = 24 * 60 * 60 * 1000;

      createdOn.setHours(0,0,0,0);
      today.setHours(0,0,0,0)

      if(region) {
        return ''
      }

      return ((+today - +createdOn)/msInDay) + 1
    },

    showModalPrepareOrders(orderIndex, clientName, id, note, product_name, count, client_id, priceCash) {
      this.showModal = !this.showModal
      this.id = id
      this.note = note
      this.product_name = product_name
      this.count = count
      this.client_id = client_id
      this.orderIndex = orderIndex
      this.clientName = clientName
      this.priceCash = priceCash
    },

    showModalEditPrepareOrders(orderIndex, clientName, id, note, product_name, count, priceCash) {
      this.showEditOrderModal = !this.showEditOrderModal
      this.id = id
      this.note = note
      this.product_name = product_name
      this.count = count
      this.orderIndex = orderIndex
      this.clientName = clientName
      this.priceCash = priceCash
    },

    ChangeModal(data) {
      this.showModal = data
      this.getPrepareOrders()
    },
    ChangeEditModal(data) {
      this.showEditOrderModal = data
      this.getPrepareOrders()
    }
  },
  computed: {
    filteredProducts() {
      return this.prepareOrders.filter((product) => {
        return product.clientName.toLowerCase().indexOf(this.sortName.toLowerCase()) > -1
        && product.note.toLowerCase().indexOf(this.sortNote.toLowerCase()) > -1
        && product.product_name.toLowerCase().indexOf(this.sortProduct.toLowerCase()) > -1
        && product.region.toLowerCase().indexOf(this.sortRegion.toLowerCase()) > -1
      })
    },

    user() {
      return this.$store.state.auth.newuser.user
    },
  },
  components: {
    Loader,
    ModalCardPrepareOrder,
    ModalEditPrepareOrder,
    ModalPrepareOrderComments
  }
}
</script>

<style lang="scss" scoped>
.sort-headline {
  color: #000;
  font-size: 16px;
  font-weight: 700;
  margin-top: 15px;
}
.sort-form {
  margin-top: 15px;
  margin-bottom: 30px;
}
.sort-form-input {
  margin-right: 10px;
  margin-top: 5px;
  &:last-child {
    margin-right: 0px;
  }
}

.orders {
  margin-top: 30px;
  margin-bottom: 30px;
}

.order-table__box-head {
  display: flex;
  background: #ccc;
}
.order-table__item-head {
  border: 1px solid #000;
  font-size: 15px;
  color: #000;
  font-weight: 700;
  overflow: hidden;
  width: 400px;
  text-align: center;
  padding: 5px 0px;
}
.order-table__box-body {
  display: flex;
  &:hover {
    background: rgba(0,0,0,0.4);
  }
}
.order-table__item-body {
  border: 1px solid #000;
  font-size: 15px;
  font-weight: 400;
  overflow: hidden;
  width: 400px;
  padding: 5px 0px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 92.2%;
}
.order-table__box-body--responsive {
  font-weight: 700;
  color: #000;
  display: none;
}

.comment-is {
  text-align: center;
  color: #2c75e2;
}

@media screen and (max-width: 1430px) {
  .fixed {
    width: 98.6%;
  }
}
@media screen and (max-width: 960px) {
  .order-table__box-head {
    display: none;
  }
  .order-table__box-body {
    display: block;
    margin-bottom: 15px;
  }
  .order-table__item-body {
    width: 100%;
  }
  .order-table__box-body--responsive {
    display: inline-block;
  }
}
</style>