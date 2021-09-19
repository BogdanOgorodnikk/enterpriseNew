<template>
    <div class="payment-cash">
        <CashTable />
    </div>
</template>

<script>
import CashTable from '../components/money/CashTable'

export default {
    name: "PaymentCash",
    components: {
        CashTable
    }
}
</script>