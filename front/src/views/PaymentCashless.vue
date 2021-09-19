<template>
    <div class="payment-cashless">
        <CashlessTable />
    </div>
</template>

<script>
import CashlessTable from '../components/money/CashlessTable'

export default {
    name: "PaymentCashless",
    components: {
        CashlessTable
    }
}
</script>