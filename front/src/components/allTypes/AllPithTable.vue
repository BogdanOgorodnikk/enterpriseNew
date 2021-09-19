<template>
    <Loader v-if="loader" />
  <div class="pith-table" v-else>
      <div class="container">
          <div class="pith-table__box-head"
            :class="{fixed: fix}"
          >
              <div class="pith-table__item-head">
                  №
              </div>
              <div class="pith-table__item-head">
                  Ім'я клієнта
              </div>
              <div class="pith-table__item-head">
                  Дата
              </div>
              <div class="pith-table__item-head">
                  Назва товару
              </div>
              <div class="pith-table__item-head">
                  Кількість
              </div>
              <div class="pith-table__item-head">
                  Ціна
              </div>
              <div class="pith-table__item-head">
                  Ціна мішка
              </div>
          </div>
          <div class="pith-table__box-body" v-for="(allPith, index) in allPiths" :key="allPith.id">
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">№: </span>{{index + 1}}
              </div>
              <div class="pith-table__item-body">
                  <router-link :to="{name: 'Clients', params: {id: allPith.client_id}}"><span class="pith-table__item-body--responsive">Ім'я клієнта: </span>{{allPith.client_name}}</router-link>
              </div>
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">Дата: </span>{{allPith.data}}
              </div>
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">Назва товару: </span>{{allPith.name}}
              </div>
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">Кількість: </span>{{allPith.number}}
              </div>
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">Ціна продажу: </span>{{allPith.price_cash}}
              </div>
              <div class="pith-table__item-body">
                  <span class="pith-table__item-body--responsive">Ціна роздрібна: </span>{{allPith.price_rosdb}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "AllPithTable",
    data: () => ({
        allPiths: [],
        loader: true,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 100) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getAllPith()
    },
    methods: {
        async getAllPith() {
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/allpith`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.allPiths = result.data.piths.reverse()
            this.loader = false
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .pith-table {
        margin-top: 30px;
    }
    .pith-table__box-head {
        display: flex;
        background: #ccc;
    }
    .pith-table__item-head {
        border: 1px solid #000;
        width: 100%;
        padding: 5px;
        font-size: 16px;
        font-weight: 700;
        color: #000;
        text-align: center;
        overflow: hidden;
    }
    .pith-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .pith-table__item-body {
        border: 1px solid #000;
        width: 100%;
        padding: 5px;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        overflow: hidden;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .pith-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 640px) {
    .pith-table__box-head {
        display: none;
    }
    .pith-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .pith-table__item-body--responsive {
        display: inline-block;
    }
}
</style>