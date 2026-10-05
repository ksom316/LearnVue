<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';

const email = ref ('')
const password = ref ('')

async function signUp() {
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })

    if (error) {
        console.log(error)
        return
    }

    console.log(data)
}



</script>

<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Create Account</h1>
            <p class="auth-subtitle">Start tracking your expenses</p>

            <form @submit.prevent="signup" class="auth-form">
                <label>Email</label>

                <input
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                />

                <label>Password</label>

                <input
                    v-model="password"
                    type="password"
                    placeholder="Create a password"
                />

                <button type="submit">
                    Create Account
                </button>
            </form>

            <p class="auth-link">
                Already have an account?
                <RouterLink to="/login">Login</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>