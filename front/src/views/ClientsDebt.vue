<template>
    <div class="clients-debt">
        <DebtTable />
    </div>
</template>

<script>
import DebtTable from '../components/debt/DebtTable'

export default {
    name: "ClientsDebt",
    components: {
        DebtTable
    }
}
</script>