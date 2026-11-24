<script setup lang="ts">

import { ref } from "vue";
import LoginForm from "@/components/user/LoginForm.vue";

const selectedUserId = ref<string | null>(null);

    function selectUser(id:string) {
        selectedUserId.value = id;
    }
</script>

<template>
    <div>
        <LoginForm class="text-center"/>
    </div>
</template>
