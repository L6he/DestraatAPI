<script setup lang="ts">

import { ref, watch } from "vue";
import { usersServices } from "@/services/usersServices";
import type { User } from "../../types/User";

const props = defineProps<{
    userId: string
}>();

const user = ref<User | null>(null);
const loading = ref(false);
const error = ref("");

async function loadUser(id:string) {
    user.value = null;
    loading.value = true;
    error.value = "";

    try {
        user.value = await usersServices.getByID(id);
    } catch (err) {
        error.value = "Cannot load user details.";
    } finally {
        loading.value = false;
    }
}

watch(() => props.userId, loadUser, {immediate:true});
</script>

<template>
    <section>
        <h2>This user</h2>
        <p v-if="loading">Loading user...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="user">
            <h3>{{ user.UserName }}</h3>
            <p>Id in app: {{ user.id }}</p>
            <p>Email: {{ user.EmailAddress }}</p>
            <p>Status: {{ user.UserStatus }}</p>
            <p>Credential: {{ user.CredentialID }}</p>
            <p>Signup Date: {{ user.SignupDate }}</p>
            <p>Comment List: {{ user.CommentListID }}</p>
        </div>
    </section>
</template>
