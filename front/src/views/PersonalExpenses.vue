<template>
    <div class="personal-expenses">
        <PersonalExpensesList />
    </div>
</template>

<script>
import PersonalExpensesList from '../components/expenses/PersonalExpensesList'

export default {
    name: "PersonalExpenses",
    components: {
        PersonalExpensesList
    }
}
</script>