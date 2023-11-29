<template>
  <q-page class="">
    <div class="row">
      <!-- <q-btn class="q-pa-md q-ma-md bg-primary-1">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-primary-2">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-primary-3">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-primary-4">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-primary-5">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-primary-6">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-1">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-2">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-3">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-4">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-5">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-secondary-6">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-white">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-black-1">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-black-2">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-black-3">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-background">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-box">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-table">
        Testando cor
      </q-btn>
      <q-btn class="q-pa-md q-ma-md bg-font">
        Testando cor
      </q-btn> -->


    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onMounted } from 'vue'

onMounted( async () => {
  const response = await api.get('/usuarios');

})
</script>
