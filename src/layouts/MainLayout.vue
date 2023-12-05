<template>
  <q-layout view="lHh Lpr lFf" class="">
    <q-header elevated class="bg-secondary-1">
      <q-toolbar class="h5 text-font">
        <span class="q-pa-md">Olá</span>
        <q-space/>
        <q-btn label="Sair" flat @click="deslogar"/>
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
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const deslogar = () => {
  Cookies.remove('token')
  router.push({ name: 'OpcoesLoginPage' })
}
</script>
