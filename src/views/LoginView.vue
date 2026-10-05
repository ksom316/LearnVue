<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';

const email = ref('')
const password = ref('')

async function checkSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
        console.log(error)
        return
    }

    console.log(data.session)
}

async function login() {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
        })

    if (error){
        console.log(error)
        return
    }

    console.log(data)

}

async function logout() {
    const { data, error } = await supabase.auth.signOut()

    if(error) {
        console.log(error)
        return
    }

    console.log("Logged out")


}

async function checkUser() {
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log(error)
        return
    }

    console.log(data.user)
}

</script>

<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Login</h1>
            <p class="auth-subtitle">Sign in to your expense tracker</p>

            <form @submit.prevent="login" class="auth-form">
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
                    placeholder="Your password"
                />

                <button type="submit">
                    Login
                </button>
            </form>

            <p class="auth-link">
                Don't have an account?
                <RouterLink to="/signup">Create one</RouterLink>
            </p>
        </div>
    </div>
</template>
<style scoped>
</style>