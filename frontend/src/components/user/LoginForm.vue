<script setup lang="ts">
import router from "@/router";
import { authenticationsServices } from "@/services/authenticationsServices";
import { ref } from "vue";
import { useRoute } from "vue-router";

const error = ref("");
const emailAddress = ref("");
const password = ref("");
const saving = ref(false);
const route = useRoute();

const handleLogin = async () => {
    try {
        await authenticationsServices.login(emailAddress.value, password.value);
        const redirectPath = (route.query.redirect as string) || "/users";
        router.push(redirectPath);
    } catch (err) {
        if (err instanceof Error) {
            error.value = "Invalid email or password.";
            console.error(err.message);
        } else {
            console.error('An unknown error occurred: ', err);
        }
    }
}

</script>

<template>
    <section>
        <h2 class="h3 mb-3 font-weight-normal">Log in</h2>
        <form class="form-signin w-100 m-auto" @submit.prevent="handleLogin">
            <div class="form-floating">
                <label for="emailAddress">Email address <span class="text-danger">*</span></label><br>
                <input id="emailAddress" v-model="emailAddress" required/><br><br>
            </div>
            
            <label for="Password">Password <span class="text-danger">*</span></label><br>
            <input type="password" id="Password" v-model="password" required/><br><br>

            <span class="text-danger">Fields with an * (asterisk) must be filled.</span><br>
            
            <p v-if="error" class="text-danger"><br>{{ error }}</p>

            <RouterLink class="nav-link" to="/register">Create an account instead.</RouterLink>

            <button class="btn btn-lg btn-primary" type="submit" :disabled="saving">{{ saving ? "Logging in..." : "Log in" }}</button><br><br> 
            <!-- disabled kuvab nuppu ainult kui saving on false -->
        </form>
    </section>
</template>
