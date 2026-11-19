<script setup lang="ts">
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import WadsView from "./views/WadsView.vue";
// teiste vaadete impordid käivad siia ka

</script>

<template>
  <div>
    <header>
      <h1>WADAPP</h1>
      <nav>
        <!-- validate that user is logged in here, block off any routerlinks that unlogged in user shouldn't have access to -->
        <RouterLink to="/wads">Wads</RouterLink><br>
        <RouterLink to="/users">Users</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
