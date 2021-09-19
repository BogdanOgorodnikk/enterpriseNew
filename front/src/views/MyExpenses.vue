<template>
    <div class="my-expenses">
        <ExpensesCreate />
        <MyExpenseTable />
    </div>
</template>

<script>
import ExpensesCreate from '../components/expenses/ExpensesCreate'
import MyExpenseTable from '../components/expenses/MyExpenseTable'

export default {
    name: "MyExpenses",
    components: {
        ExpensesCreate,
        MyExpenseTable
    }
}
</script>