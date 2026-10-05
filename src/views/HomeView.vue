<script setup>
import ExpenseForm from '@/components/ExpenseForm.vue';

</script>

<template>
    <h1>Home</h1>
    <p>Welcome to Expense Tracker</p>
    <RouterLink to="/expenses">
        View Expenses
    </RouterLink>
    <ExpenseForm />
</template>

<style scoped>

</style>