<template>
  <q-layout view="lHh Lpr lFf" class="">
    <q-header elevated class="bg-secondary-1">
      <q-toolbar class="h5 text-font">
        <span class="q-pa-md">Olá, Usuário</span>
      </q-toolbar>
    </q-header>

    <LeftDrawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LeftDrawer from 'src/components/LeftDrawer.vue'
</script>
