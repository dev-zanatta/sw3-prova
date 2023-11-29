<template>
  <q-page class="flex flex-center">
    <div class="row">
        <q-btn class="q-mr-md q-pa-md" @click="logar">Logar</q-btn>
        <q-btn class="q-pa-md" @click="cadastrar">Cadastrar</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

const logar = () => {
  router.push({ name: 'LoginPage' })
}

const cadastrar = () => {
  router.push({ name: 'CadastroPage' })
}
</script>
