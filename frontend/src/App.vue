<script setup lang="ts">
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import WadsView from "./views/WadsView.vue";
// teiste vaadete impordid käivad siia ka

</script>

<template>
  <div>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar brand text-light" href="../">Destraat</a>

        <!-- validate that user is logged in here, block off any routerlinks that unlogged in user shouldn't have access to -->

        <RouterLink class="nav-link" to="/wads">Wads</RouterLink> <!-- admin access only -->
        
        <!-- /catalog endpoint for the users to see, /wads with no edit, delete or create -->

        <RouterLink class="nav-link" to="/users">Users</RouterLink><!-- admin has access to /users routerlink -->
        
        <RouterLink class="nav-link" to="/register">Sign up</RouterLink><!-- guest only -->
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
