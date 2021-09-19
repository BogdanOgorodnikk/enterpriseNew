<template>
    <div class="client">
        <CreateOrder />
        <CreatePrepareOrder  v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 5" />
        <CreateMoney  v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5" />
        <CreateCheck v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5" />
        <OrderTable />
    </div>
</template>

<script>
import CreateOrder from '../components/clients/CreateOrder'
import CreateMoney from '../components/clients/CreateMoney'
import CreateCheck from '../components/clients/CreateCheck'
import OrderTable from '../components/clients/OrderTable'
import CreatePrepareOrder from '../components/clients/CreatePrepareOrder'

export default {
    name: "Client",
    components: {
        CreateOrder,
        CreateMoney,
        CreateCheck,
        OrderTable,
        CreatePrepareOrder
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>