<template>
    <div class="manager-money">
        <ManagerMoneyTable />
    </div>
</template>

<script>
import ManagerMoneyTable from '../components/money/ManagerMoneyTable'

export default {
    name: "ManagerMoney",
    components: {
        ManagerMoneyTable
    }
}
</script>